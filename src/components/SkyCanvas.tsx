"use client";

import { useEffect, useRef } from "react";

// Live sky for the homepage hero. Draws the same cloud photo as the static <Image> underneath it, but
// lets the clouds drift and part around the pointer. If WebGL is missing or the visitor prefers reduced
// motion, it never starts and the static photo is all anyone sees.

const VERT = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
uniform sampler2D u_img;
uniform vec2 u_res;
uniform vec2 u_img_size;
uniform vec2 u_lean;
uniform float u_time;
uniform vec3 u_trail[6]; // x, y (0..1, y down), strength

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) { s += a * noise(p); p = p * 2.03 + vec2(5.2, 1.3); a *= 0.5; }
  return s;
}
// Bright, unsaturated pixels are cloud; saturated teal is open sky.
float cloudiness(vec3 c) {
  float lum = dot(c, vec3(0.299, 0.587, 0.114));
  float sat = max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
  return smoothstep(0.5, 0.9, lum) * (1.0 - smoothstep(0.1, 0.4, sat));
}

void main() {
  vec2 s = vec2(gl_FragCoord.x / u_res.x, 1.0 - gl_FragCoord.y / u_res.y);
  float a = u_res.x / u_res.y;
  float A = u_img_size.x / u_img_size.y;
  // Same framing as CSS object-cover + object-bottom, zoomed 4% so movement never shows an edge.
  vec2 uv = (s - vec2(0.5, 1.0)) * vec2(min(a / A, 1.0), min(A / a, 1.0)) / 1.04 + vec2(0.5, 1.0);

  // Clouds move more than the open sky behind them. One noise field, read along two axes.
  float depth = mix(0.25, 1.0, cloudiness(texture2D(u_img, uv).rgb));
  float n = fbm(uv * 4.0 + vec2(u_time * 0.03, -u_time * 0.02));
  uv += (vec2(n, fract(n * 7.3)) - 0.5) * 0.012 * depth;
  uv -= u_lean * vec2(0.012, 0.008) * depth;

  // Where the pointer has just been, clouds part outwards and catch a little light.
  vec2 push = vec2(0.0);
  float glow = 0.0;
  for (int i = 0; i < 6; i++) {
    vec3 t = u_trail[i];
    vec2 d = (s - t.xy) * vec2(a, 1.0);
    float k = exp(-dot(d, d) * 30.0) * t.z;
    push += normalize(d + 1e-4) * k;
    glow += k;
  }
  uv += push * 0.02 * depth;

  vec3 c = texture2D(u_img, uv).rgb;
  c += cloudiness(c) * min(glow, 0.6) * 0.18;
  gl_FragColor = vec4(c, 1.0);
}`;

const TRAIL = 6;
// Soft clouds don't need full resolution; half the pixels in each direction is a quarter of the GPU work.
const RENDER_SCALE = 0.5;

export function SkyCanvas({ src }: { src: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup = () => {};
    let cancelled = false;

    // Everything heavy (shader compile, image decode, texture upload) waits until the page is idle.
    async function start() {
      if (cancelled || !canvas) return;
      const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power", failIfMajorPerformanceCaveat: true });
      if (!gl) return;
      // Without a real GPU (software rasterisers like SwiftShader or llvmpipe), every frame runs on the CPU
      // and the page stutters. Keep the static photo there instead.
      const info = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = String(info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
      if (/swiftshader|llvmpipe|software|basic render/i.test(renderer)) {
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        return;
      }

      const shader = (type: number, source: string) => {
        const s = gl.createShader(type)!;
        gl.shaderSource(s, source);
        gl.compileShader(s);
        return s;
      };
      const prog = gl.createProgram()!;
      gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG));
      gl.bindAttribLocation(prog, 0, "p");
      gl.linkProgram(prog);

      // Decode and downscale off the main thread while the driver links the program.
      let bitmap: ImageBitmap;
      try {
        const blob = await (await fetch(src)).blob();
        bitmap = await createImageBitmap(blob, { resizeWidth: 1280, resizeQuality: "medium" });
      } catch {
        return;
      }
      if (cancelled || !gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
      gl.useProgram(prog);

      // One triangle that covers the screen.
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, bitmap);

      const u = (name: string) => gl.getUniformLocation(prog, name);
      const uRes = u("u_res");
      const uLean = u("u_lean");
      const uTime = u("u_time");
      const uTrail = u("u_trail");
      gl.uniform2f(u("u_img_size"), bitmap.width, bitmap.height);
      bitmap.close();

      const trail = new Float32Array(TRAIL * 3);
      let head = 0;
      const lean = { x: 0, y: 0, tx: 0, ty: 0 };
      let last: { x: number; y: number } | null = null;
      let visible = true;
      let frame = 0;
      const t0 = performance.now();

      const resize = () => {
        canvas.width = Math.max(1, Math.round(canvas.clientWidth * RENDER_SCALE));
        canvas.height = Math.max(1, Math.round(canvas.clientHeight * RENDER_SCALE));
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uRes, canvas.width, canvas.height);
      };

      // Frame-rate guard: time the first frames, and if they're too slow to look smooth (under ~40 fps),
      // fade back to the static photo and release the GPU. Better a still sky than a stuttering one.
      let prev = 0;
      let measured = 0;
      let slow = 0;
      const giveUp = () => {
        cancelAnimationFrame(frame);
        frame = -1;
        delete canvas.dataset.live;
        setTimeout(() => cleanup(), 1200);
      };

      const draw = (ts: number) => {
        if (frame === -1) return;
        frame = 0;
        if (!visible) {
          prev = 0;
          return;
        }
        if (prev && measured < 60) {
          measured++;
          if (ts - prev > 25) slow++;
          if (measured === 60 && slow > 20) return giveUp();
        }
        prev = ts;
        lean.x += (lean.tx - lean.x) * 0.06;
        lean.y += (lean.ty - lean.y) * 0.06;
        for (let i = 0; i < TRAIL; i++) trail[i * 3 + 2] *= 0.93;
        gl.uniform2f(uLean, lean.x, lean.y);
        gl.uniform1f(uTime, (performance.now() - t0) / 1000);
        gl.uniform3fv(uTrail, trail);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        frame = requestAnimationFrame(draw);
      };
      const run = () => {
        if (!frame) frame = requestAnimationFrame(draw);
      };

      const onPointer = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        if (e.clientY > r.bottom) return;
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        lean.tx = (x - 0.5) * 2;
        lean.ty = (y - 0.5) * 2;
        if (last) {
          trail.set([x, y, Math.min(Math.hypot(x - last.x, y - last.y) * 25, 1)], head * 3);
          head = (head + 1) % TRAIL;
        }
        last = { x, y };
      };
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting && document.visibilityState === "visible";
        if (visible) run();
      });
      const onVisibility = () => {
        visible = document.visibilityState === "visible";
        if (visible) run();
      };
      const ro = new ResizeObserver(resize);

      resize();
      io.observe(canvas);
      ro.observe(canvas);
      document.addEventListener("visibilitychange", onVisibility);
      if (matchMedia("(pointer: fine)").matches) addEventListener("pointermove", onPointer, { passive: true });
      run();
      requestAnimationFrame(() => (canvas.dataset.live = ""));

      cleanup = () => {
        if (frame > 0) cancelAnimationFrame(frame);
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        removeEventListener("pointermove", onPointer);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    }

    // Boot on the visitor's first interaction. Until then the static photo looks the same, and nothing
    // competes with loading the page.
    const events = ["pointermove", "scroll", "touchstart", "keydown"] as const;
    let started = false;
    const begin = () => {
      if (started) return;
      started = true;
      events.forEach((e) => removeEventListener(e, begin));
      if ("requestIdleCallback" in window) requestIdleCallback(() => start(), { timeout: 1000 });
      else setTimeout(start, 100);
    };
    events.forEach((e) => addEventListener(e, begin, { passive: true }));

    return () => {
      cancelled = true;
      events.forEach((e) => removeEventListener(e, begin));
      cleanup();
    };
  }, [src]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 size-full opacity-0 transition-opacity duration-1000 data-live:opacity-100"
    />
  );
}
