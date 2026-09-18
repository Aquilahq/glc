import { Link } from "@tanstack/react-router";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import churchLogo from "@/assets/official/glc-logo-white.png";
import { CHURCH } from "@/data/church";

export function SiteFooter() {
  return (
    <footer id="give" className="relative overflow-hidden bg-deep-teal py-16 text-primary-foreground">
      <div className="light-orb glow-sun -left-24 bottom-0 size-72 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <img src={churchLogo} alt={CHURCH.name} width={2500} height={887} className="h-16 w-auto" />
          <p className="mt-3 max-w-xs text-sm leading-6 text-primary-foreground/60">{CHURCH.slogan}</p>
        </div>

        <div className="space-y-3 text-sm">
          <h2 className="text-xs font-extrabold uppercase tracking-[0.24em] text-secondary">Get in touch</h2>
          <a href={CHURCH.phoneHref} className="flex items-center gap-2 text-primary-foreground/75 transition-colors hover:text-primary-foreground">
            <Phone size={16} /> {CHURCH.phone}
          </a>
          <a href={`mailto:${CHURCH.email}`} className="flex items-center gap-2 text-primary-foreground/75 transition-colors hover:text-primary-foreground">
            <Mail size={16} /> {CHURCH.email}
          </a>
          <a
            href={CHURCH.mapsDirections}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-2 text-primary-foreground/75 transition-colors hover:text-primary-foreground"
          >
            <MapPin size={16} className="mt-0.5 shrink-0" /> {CHURCH.address}
          </a>
        </div>

        <div className="space-y-3 text-sm">
          <h2 className="text-xs font-extrabold uppercase tracking-[0.24em] text-secondary">Explore</h2>
          <Link to="/" hash="calendar" className="block text-primary-foreground/75 hover:text-primary-foreground">Service calendar</Link>
          <Link to="/sermons" className="block text-primary-foreground/75 hover:text-primary-foreground">Sermons &amp; podcast</Link>
          <Link to="/giving" className="block text-primary-foreground/75 hover:text-primary-foreground">Giving</Link>
          <Link to="/contact" className="block text-primary-foreground/75 hover:text-primary-foreground">Contact us</Link>
          <Link to="/" hash="ministries" className="block text-primary-foreground/75 hover:text-primary-foreground">Ministries</Link>
        </div>

        <div className="space-y-4 text-sm">
          <h2 className="text-xs font-extrabold uppercase tracking-[0.24em] text-secondary">Follow along</h2>
          <a
            href={CHURCH.facebook}
            target="_blank"
            rel="noreferrer"
            className="lift inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-5 py-3 font-bold hover:bg-primary-foreground/10"
          >
            <Facebook size={18} /> facebook.com/GLCUPLAND
          </a>
          <p className="text-primary-foreground/60">The Sunday service streams live on our Facebook page.</p>
        </div>
      </div>
      <div className="relative mx-auto mt-12 flex max-w-7xl flex-col gap-2 px-5 text-xs uppercase tracking-[0.22em] text-primary-foreground/40 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p>© {new Date().getFullYear()} {CHURCH.name} · Upland, California</p>
        <p>Design by <span className="font-bold text-secondary/70">Aquila</span></p>
      </div>
    </footer>
  );
}
