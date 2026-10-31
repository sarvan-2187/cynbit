// macOS-style window title bar: traffic lights on the left, title centred over the whole bar.
export function TitleBar({ title }: { title?: string }) {
  return (
    <div className="grid grid-cols-[64px_1fr_64px] items-center border-b border-line px-4 py-3" aria-hidden="true">
      <div className="flex gap-2">
        <span className="size-3 rounded-full bg-[#ff5f57] ring-1 ring-black/10 ring-inset" />
        <span className="size-3 rounded-full bg-[#febc2e] ring-1 ring-black/10 ring-inset" />
        <span className="size-3 rounded-full bg-[#28c840] ring-1 ring-black/10 ring-inset" />
      </div>
      <p className="text-center text-[13px] font-medium text-mist">{title}</p>
    </div>
  );
}
