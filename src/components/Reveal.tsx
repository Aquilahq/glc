import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  variant?: "rise" | "fade" | "left" | "right" | "zoom" | "blur";
  threshold?: number;
};

/** Scroll-triggered reveal with a soft ease-out. Respects reduced motion via CSS. */
export function Reveal({ children, as, className = "", delay = 0, variant = "rise", threshold = 0.18 }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant}${shown ? " is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Headline that reveals word by word on scroll. */
export function RevealWords({ text, className = "", stagger = 60 }: { text: string; className?: string; stagger?: number }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [shown, setShown] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={`reveal-words ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <span key={w + i} className="reveal-word-mask" aria-hidden="true">
          <span
            className={`reveal-word${shown ? " is-visible" : ""}`}
            style={{ transitionDelay: `${i * stagger}ms`, ["--word-delay" as string]: `${i * stagger}ms` }}
          >
            {w}
          </span>
          {i < words.length - 1 ? <span className="reveal-word-space"> </span> : null}
        </span>
      ))}
    </span>
  );
}
