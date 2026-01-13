import { useEffect } from "react";

export default function RightDrawer({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0  transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute right-0 top-0 h-full  shadow-xl bg- transition-transform duration-300
        w-[40vw] max-w-[520px] min-w-[360px]   backdrop-blur-md  bg-black/5
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="h-[calc(100%-56px)] overflow-auto ">{children}</div>
      </div>
    </div>
  );
}
