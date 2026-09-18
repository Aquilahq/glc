import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import churchLogo from "@/assets/official/glc-logo-white.png";

const HOME_LINKS = [
  { label: "New Here?", hash: "welcome" },
  { label: "Our Heart", hash: "about" },
  { label: "Ministries", hash: "ministries" },
  { label: "Events", hash: "events" },
  { label: "Calendar", hash: "calendar" },
];

const PAGE_LINKS = [
  { label: "Sermons", to: "/sermons" as const },
  { label: "Prayer Wall", to: "/prayer" as const },
  { label: "Giving", to: "/giving" as const },
  { label: "Contact", to: "/contact" as const },
];

const EXTERNAL_LINKS = [
  { label: "Our Story", href: "/our-story" }
];

const underline =
  "relative py-2 transition-opacity after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-secondary after:transition-transform after:duration-500 hover:after:scale-x-100";

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(!overlay);

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  const solid = !overlay || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-700 ${
        solid ? "bg-deep-teal/95 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-700 lg:px-10 ${solid ? "h-16" : "h-24"}`}>
        <Link to="/" className="flex items-center gap-3 text-primary-foreground" aria-label="Gracious Living Church home">
          <img
            src={churchLogo}
            alt="Gracious Living Church"
            width={2500}
            height={887}
            className={`w-auto transition-all duration-700 ${solid ? "h-9" : "h-12"}`}
          />
          <span className="hidden text-[0.65rem] font-light italic tracking-[0.16em] text-primary-foreground/75 sm:inline lg:hidden">
            Loving and living the gospel
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-bold text-primary-foreground lg:flex" aria-label="Main navigation">
          {HOME_LINKS.map((l) => (
            <Link key={l.label} to="/" hash={l.hash} className={underline}>
              {l.label}
            </Link>
          ))}
          {PAGE_LINKS.map((l) => (
            <Link key={l.label} to={l.to} className={underline}>
              {l.label}
            </Link>
          ))}
          {EXTERNAL_LINKS.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className={underline}>
              {l.label}
            </a>
          ))}
          <Link
            to="/"
            hash="visit"
            className="rounded-full bg-secondary px-5 py-2.5 text-secondary-foreground transition-transform duration-500 hover:-translate-y-0.5"
          >
            Plan a visit
          </Link>
        </nav>

        <details className="relative lg:hidden">
          <summary className="grid size-11 cursor-pointer list-none place-items-center text-primary-foreground" aria-label="Open menu">
            <Menu />
          </summary>
          <nav className="absolute right-0 mt-2 flex w-52 flex-col gap-1 rounded-xl bg-background p-3 text-sm font-bold text-foreground shadow-2xl">
            {HOME_LINKS.map((l) => (
              <Link key={l.label} to="/" hash={l.hash} className="rounded-md p-3 hover:bg-muted">
                {l.label}
              </Link>
            ))}
            {PAGE_LINKS.map((l) => (
              <Link key={l.label} to={l.to} className="rounded-md p-3 hover:bg-muted">
                {l.label}
              </Link>
            ))}
            {EXTERNAL_LINKS.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="rounded-md p-3 hover:bg-muted">
                {l.label}
              </a>
            ))}
            <Link to="/" hash="visit" className="rounded-md p-3 hover:bg-muted">
              Plan a visit
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
