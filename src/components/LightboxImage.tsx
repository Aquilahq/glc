import { useEffect, useState, type CSSProperties } from "react";
import { X, ZoomIn } from "lucide-react";

type LightboxImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  loading?: "eager" | "lazy";
  width?: number;
  height?: number;
  style?: CSSProperties;
};

export function LightboxImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  loading = "lazy",
  width,
  height,
  style,
}: LightboxImageProps) {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`group/lightbox relative block cursor-zoom-in border-0 bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary ${className}`}
        onClick={() => {
          setZoomed(false);
          setOpen(true);
        }}
        aria-label={`Enlarge image: ${alt}`}
      >
        <img src={src} alt={alt} loading={loading} width={width} height={height} className={imageClassName} style={style} />
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/55 p-2 text-white opacity-0 backdrop-blur transition-opacity group-hover/lightbox:opacity-100 group-focus-visible/lightbox:opacity-100" aria-hidden="true">
          <ZoomIn size={18} />
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-md sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Image gallery: ${alt}`}
          onClick={() => setOpen(false)}
        >
          <div className="flex max-h-full w-full max-w-6xl flex-col gap-4" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between text-white">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Image gallery</p>
              <button
                type="button"
                className="rounded-full border border-white/20 bg-white/10 p-3 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onClick={() => setOpen(false)}
                aria-label="Close image gallery"
              >
                <X size={22} />
              </button>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-2xl border border-white/15 bg-black/30 p-2 shadow-2xl sm:p-5">
              <img
                src={src}
                alt={alt}
                className={zoomed ? "max-w-none cursor-zoom-out rounded-xl object-contain" : "max-h-[72vh] max-w-full cursor-zoom-in rounded-xl object-contain"}
                onClick={() => setZoomed((value) => !value)}
              />
            </div>
            <div className="flex items-center justify-between gap-4 text-sm text-white/75">
              <p>{alt}</p>
              <span className="shrink-0 text-xs uppercase tracking-wider text-white/45">Click image to {zoomed ? "shrink" : "zoom"}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
