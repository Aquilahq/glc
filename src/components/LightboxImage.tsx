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
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image: ${alt}`}
      >
        <img src={src} alt={alt} loading={loading} width={width} height={height} className={imageClassName} style={style} />
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/55 p-2 text-white opacity-0 backdrop-blur transition-opacity group-hover/lightbox:opacity-100 group-focus-visible/lightbox:opacity-100" aria-hidden="true">
          <ZoomIn size={18} />
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={() => setOpen(false)}
            aria-label="Close enlarged image"
          >
            <X size={24} />
          </button>
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
