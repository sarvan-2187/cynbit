// The logo SVG used as a mask, so it takes the current text colour and follows the theme.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Cynbit Technologies"
      className={`block aspect-[400/165] bg-current ${className}`}
      style={{ mask: "url(/logo.svg) center / contain no-repeat", WebkitMask: "url(/logo.svg) center / contain no-repeat" }}
    />
  );
}
