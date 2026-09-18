import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock3, Heart, MapPin, Play, Radio, Sparkles } from "lucide-react";
import churchHeroImage from "@/assets/official/church-hero.jpg";
import womenGroupImage from "@/assets/official/IMG_2317.jpg";
import womenGatheringImage from "@/assets/official/IMG_2321.jpg";
import speakerImage from "@/assets/official/IMG_2444-2.jpg";
import ministryMomentImage from "@/assets/official/IMG_2457-1.jpg";
import fellowshipImage from "@/assets/official/IMG_2460-2.jpg";
import studyImage from "@/assets/official/IMG_2463.jpg";
import summerEventImage from "@/assets/official/event-summer.png";
import mensBreakfastImage from "@/assets/official/event-mens-breakfast.png";
import eventOneImage from "@/assets/official/event-1.png";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal, RevealWords } from "@/components/Reveal";
import { LightboxImage } from "@/components/LightboxImage";
import { useScrollProgress } from "@/hooks/useParallax";
import { CHURCH, formatServiceDate, upcomingServices } from "@/data/church";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gracious Living Church | Upland, CA" },
      { name: "description", content: "You belong here. Join Gracious Living Church Sundays at 10 AM in Upland, California." },
      { property: "og:title", content: "Gracious Living Church | Upland, CA" },
      { property: "og:description", content: "Know Jesus and make Him known. Join us Sundays at 10 AM in Upland." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SLOGAN = ["To", "know", "Jesus", "and", "make", "Him", "known."];
const SLOGAN_HIGHLIGHT = new Set(["Jesus", "known."]);

function AnimatedSlogan() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <p ref={ref} className="font-display text-3xl leading-tight sm:text-4xl" aria-label={CHURCH.slogan}>
      {SLOGAN.map((word, i) => (
        <span
          key={word + i}
          aria-hidden="true"
          className={`slogan-word${SLOGAN_HIGHLIGHT.has(word) ? " slogan-glow" : ""}${inView ? " is-in" : ""}`}
          style={{ animationDelay: `${i * 0.14}s` }}
        >
          {word}
          {i < SLOGAN.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

function Hero() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  // Keep the mountain ridge gently drifting behind the opening message as the page settles.
  const shift = (progress - 0.5) * 180;
  const heroScale = 1.04 - progress * 0.16;

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-deep-teal">
      <img
        src={churchHeroImage}
        alt="The San Gabriel Mountains rising above Upland, California"
        width={2500}
        height={1667}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-[50%_bottom]"
        style={{ transform: `translate3d(0, ${shift}px, 0) scale(1.04)` }}
      />
      <div className="hero-veil absolute inset-0" />
      <div className="ray-wash pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="hero-cloud hero-cloud-one" aria-hidden="true" />
      <div className="hero-cloud hero-cloud-two" aria-hidden="true" />
      <div className="light-orb glow-sun -right-10 top-24 size-96 opacity-40" aria-hidden="true" />
      <div className="light-orb glow-coral bottom-24 left-8 size-72 opacity-25" aria-hidden="true" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-40 lg:px-10 lg:pb-28">
        <div className="max-w-4xl text-primary-foreground">
          <Reveal variant="fade" className="mb-7 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.26em]">
            <span className="h-px w-12 bg-secondary" /> Upland, California
          </Reveal>
          <Reveal
            variant="fade"
            delay={120}
            className="mb-5 max-w-2xl font-display text-2xl leading-tight text-secondary sm:text-3xl"
          >
            <RevealWords text="To know Jesus and make Him known." className="hero-slogan" stagger={70} />
          </Reveal>
          <h1
            className="hero-title text-balance text-6xl leading-[0.92] sm:text-7xl lg:text-[7rem]"
            style={{ transform: `scale(${heroScale})`, transformOrigin: "left center" }}
          >
            <RevealWords text="Welcome home." className="hero-welcome" stagger={110} />
          </h1>
          <Reveal variant="rise" delay={340} className="mt-8 max-w-xl">
            <p className="text-lg leading-relaxed text-primary-foreground/95 drop-shadow-sm sm:text-xl">
              Loving Jesus. Loving people. Living on mission. We&rsquo;re a church in the City of Upland with a passion to know
              Jesus and to make Him known.
            </p>
          </Reveal>
          <Reveal variant="rise" delay={460} className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/"
              hash="visit"
              className="lift inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-4 text-sm font-extrabold text-secondary-foreground shadow-lg"
            >
              Plan your visit <ArrowRight size={18} />
            </Link>
            <Link
              to="/sermons"
              className="lift inline-flex items-center gap-2 rounded-full border border-primary-foreground/50 px-7 py-4 text-sm font-extrabold text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Play size={17} fill="currentColor" /> Watch a message
            </Link>
          </Reveal>
        </div>

        <Reveal variant="rise" delay={600} className="mt-14 grid max-w-3xl gap-4 text-primary-foreground sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-4 backdrop-blur-sm">
            <Clock3 className="shrink-0 text-secondary" />
            <div>
              <span className="block text-xs font-bold uppercase tracking-[0.18em] opacity-70">Sunday gathering</span>
              <strong>Coffee &amp; donuts 10 AM · Service 10:30 AM</strong>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-4 backdrop-blur-sm">
            <MapPin className="shrink-0 text-secondary" />
            <div>
              <span className="block text-xs font-bold uppercase tracking-[0.18em] opacity-70">{CHURCH.venue}</span>
              <strong>1480 W. 9th Street</strong>
            </div>
          </div>
        </Reveal>
      </div>

      <span
        className="scroll-cue absolute bottom-8 left-1/2 h-16 w-px -translate-x-1/2 text-primary-foreground/50"
        aria-hidden="true"
      />
    </section>
  );
}

function ParallaxFigure({
  src,
  alt,
  className = "",
  aspect = "aspect-[4/3]",
  strength = 60,
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
  strength?: number;
}) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  return (
    <div ref={ref} className={`overflow-hidden rounded-2xl ${aspect} ${className}`}>
      <LightboxImage
        src={src}
        alt={alt}
        className="h-full w-full"
        imageClassName="h-[118%] w-full object-cover"
        style={{ transform: `translate3d(0, ${(progress - 0.5) * -strength}px, 0)` }}
      />
    </div>
  );
}

function UpcomingEvents() {
  const events = [
    { title: "Upcoming gathering", image: summerEventImage, alt: "Upcoming Gracious Living Church event poster" },
    { title: "Men’s breakfast", image: mensBreakfastImage, alt: "Men’s breakfast event poster" },
    { title: "Community event", image: eventOneImage, alt: "Gracious Living Church community event poster" },
  ];

  return (
    <section id="events" className="relative overflow-hidden bg-sunshine/20 py-24 lg:py-32">
      <div className="light-orb glow-coral -right-16 top-20 size-96 opacity-20" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal variant="fade"><span className="text-xs font-extrabold uppercase tracking-[0.24em] text-primary">Make room for what matters</span></Reveal>
            <h2 className="mt-4 text-5xl leading-tight sm:text-6xl"><RevealWords text="Upcoming events." stagger={90} /></h2>
          </div>
          <Reveal variant="rise" delay={180} className="max-w-md"><p className="leading-7 text-muted-foreground">Find your people, make a memory, and join us for what is happening at Gracious Living Church.</p></Reveal>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {events.map((event, i) => (
            <Reveal key={event.title} variant="zoom" delay={i * 100}>
              <article className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
                <div className="aspect-[4/5] overflow-hidden bg-muted"><LightboxImage src={event.image} alt={event.alt} className="h-full w-full" imageClassName="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" /></div>
                <div className="flex items-center justify-between p-5"><h3 className="text-2xl">{event.title}</h3><ArrowRight className="text-primary transition-transform duration-500 group-hover:translate-x-1" /></div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Index() {
  const services = upcomingServices(5);

  return (
    <main className="home-page min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader overlay />
      <Hero />
      <UpcomingEvents />

      {/* Welcome */}
      <section id="welcome" className="sun-wash relative overflow-hidden py-24 lg:py-32">
        <div className="light-orb glow-sun -left-20 top-10 size-80 opacity-40" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-10">
          <div>
            <Reveal variant="fade">
              <span className="text-xs font-extrabold uppercase tracking-[0.24em] text-primary">New here?</span>
            </Reveal>
            <h2 className="mt-5 text-balance text-5xl leading-[1.02] sm:text-6xl">
              <RevealWords text="We're so happy you're here." stagger={70} />
            </h2>
          </div>
          <div className="lg:border-l lg:border-border/70 lg:pl-14">
            <Reveal variant="rise">
              <p className="text-lg leading-8 text-muted-foreground">
                Our heart is to see people <strong className="text-foreground">encounter</strong> the eternal-saving,
                life-changing grace of Jesus and grow in relationship with Him. To <strong className="text-foreground">engage</strong>{" "}
                community and help discover God-given gifts and talents. To further <strong className="text-foreground">equip</strong>{" "}
                by fanning the flame within, so that in family, we can impact our city, our nation and the world.
              </p>
            </Reveal>
            <Reveal variant="rise" delay={140}>
              <p className="mt-5 leading-8 text-muted-foreground">
                Our Pastor calls us a <strong className="text-foreground">Family of Friends</strong> — a multi-cultural,
                multi-generational church in the City of Upland. With GLC Kids (ages 1&ndash;12) and GLC Teens (ages
                13&ndash;17), Sunday is a great experience for every member of the family.
              </p>
            </Reveal>
            <Reveal variant="rise" delay={260} className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm font-bold">
              <span className="flex items-center gap-2"><Heart size={18} className="text-soft-coral" /> Casual &amp; contemporary</span>
              <span className="flex items-center gap-2"><Sparkles size={18} className="text-primary" /> About 75 minutes</span>
              <span className="flex items-center gap-2"><CalendarDays size={18} className="text-soft-coral" /> Free coffee &amp; donuts</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section aria-label="What to expect" className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <h2 className="text-4xl sm:text-5xl">
            <RevealWords text="What to expect" />
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                h: "The gathering",
                p: "Uplifting worship music, an encouraging message based on the Bible, great ministry and childcare for your kids, and a service that lasts about 75 minutes. You’ll be warmly greeted and can enjoy free coffee and refreshments in a relaxed, casual atmosphere.",
              },
              {
                h: "What to wear",
                p: "Gracious Living is a casual and contemporary church. We care more about you than what you wear, so whether it’s jeans or slacks, dress how you’re most comfortable.",
              },
              {
                h: "The music",
                p: "Our worship is contemporary in style — think Bethel, Elevation, Jesus Culture and Hillsong. You’ll find our time of worship uplifting, engaging and Spirit-led.",
              },
              {
                h: "Your kids",
                p: "GLC Kids runs during the Sunday gathering with Bible-based lessons, worship they can sing and dance to, and creative activities. Age-appropriate programs for nursery, pre-school and kinder, and 1st–6th grade, plus a mother’s room with a live feed of the service. All team members are pre-screened and every child is securely checked in.",
              },
            ].map((c, i) => (
              <Reveal key={c.h} variant="rise" delay={i * 120} className="lift rounded-2xl border border-border/60 bg-card p-6">
                <h3 className="text-2xl">{c.h}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{c.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Photo moments with parallax */}
      <section aria-label="Life at Gracious Living" className="py-6">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 md:grid-cols-4 lg:px-10">
          <Reveal variant="zoom" className="col-span-2">
            <ParallaxFigure src={womenGroupImage} alt="Women of Gracious Living Church gathered together" aspect="aspect-[16/9]" />
          </Reveal>
          <Reveal variant="zoom" delay={140}>
            <ParallaxFigure src={speakerImage} alt="A speaker sharing at a Gracious Living Church gathering" aspect="aspect-square" strength={40} />
          </Reveal>
          <Reveal variant="zoom" delay={260}>
            <ParallaxFigure src={studyImage} alt="A woman sharing a study resource at church" aspect="aspect-square" strength={40} />
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section id="about" className="relative overflow-hidden py-24 lg:py-32">
        <div className="light-orb glow-sky right-0 top-20 size-96 opacity-25" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:px-10">
          <Reveal variant="left" className="relative">
            <ParallaxFigure src={womenGatheringImage} alt="Gracious Living Church women gathered around the table" strength={70} />
            <div className="absolute -bottom-8 right-4 max-w-[18rem] rounded-2xl bg-deep-teal p-7 text-primary-foreground shadow-2xl sm:right-8">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-secondary">Our mission</span>
              <AnimatedSlogan />
            </div>
          </Reveal>
          <div className="pt-12 lg:pl-14 lg:pt-0">
            <Reveal variant="fade">
              <span className="text-xs font-extrabold uppercase tracking-[0.24em] text-primary">Our mission &amp; vision</span>
            </Reveal>
            <h2 className="mt-5 text-5xl leading-tight sm:text-6xl">
              <RevealWords text="Revealing destiny." stagger={100} />
            </h2>
            <Reveal variant="rise" delay={200}>
              <p className="mt-7 text-lg leading-8 text-muted-foreground">
                Our desire is to present Jesus, through the Gospel, to our community as the only real and relevant way to an
                eternal, fruitful and abundant life.
              </p>
            </Reveal>
            <Reveal variant="rise" delay={320}>
              <p className="mt-5 leading-8 text-muted-foreground">
                Upward, inward and outward — we believe in the preaching of the Gospel, the transforming of lives, the planting
                of churches, and the development of leaders who are real, relevant and relational. A place where children are
                cherished, people are engaged, and families are restored.
              </p>
            </Reveal>
            <Reveal variant="rise" delay={420}>
              <Link
                to="/"
                hash="ministries"
                className="mt-9 inline-flex items-center gap-2 border-b-2 border-primary pb-1 text-sm font-extrabold text-primary transition-transform duration-500 hover:translate-x-1"
              >
                Discover our community <ArrowRight size={17} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ministries */}
      <section id="ministries" className="relative overflow-hidden bg-deep-teal py-24 text-primary-foreground lg:py-32">
        <div className="light-orb glow-sun -left-16 top-16 size-96 opacity-25" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Reveal variant="fade">
                <span className="text-xs font-extrabold uppercase tracking-[0.24em] text-secondary">Life together</span>
              </Reveal>
              <h2 className="mt-4 text-5xl sm:text-6xl">
                <RevealWords text="Find your people." stagger={100} />
              </h2>
            </div>
            <Reveal variant="rise" delay={200} className="max-w-md">
              <p className="leading-7 text-primary-foreground/70">
                Ministries for every age and stage — kids, teens, women, and our whole church family gathering midweek to pray.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                img: womenGroupImage,
                alt: "Design to Shine women gathered together",
                tag: "Women",
                title: "Design to Shine",
                copy: "Our women’s ministry. DTS Ladies Gathering every 4th Wednesday at 7 PM.",
              },
              {
                img: ministryMomentImage,
                alt: "A ministry leader speaking at a church gathering",
                tag: "Kids & teens",
                title: "GLC Kids & Teens",
                copy: "GLC Kids (ages 1–12) during the Sunday gathering, and GLC Teens for ages 13–17.",
              },
              {
                img: fellowshipImage,
                alt: "A member enjoying fellowship around the table",
                tag: "Prayer",
                title: "Prayer Night",
                copy: "Every 1st Wednesday, 7–8 PM. We never pray without the expectation that God will answer.",
              },
            ].map((m, i) => (
              <Reveal key={m.title} variant="rise" delay={i * 150}>
                <article className="group h-full overflow-hidden rounded-2xl bg-primary-foreground/8 transition-transform duration-700 hover:-translate-y-2">
                  <div className="overflow-hidden">
                    <LightboxImage
                      src={m.img}
                      alt={m.alt}
                      className="w-full"
                      imageClassName="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="p-7">
                    <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-secondary">{m.tag}</span>
                    <h3 className="mt-2 text-3xl">{m.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-primary-foreground/70">{m.copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service calendar */}
      <section id="calendar" className="relative overflow-hidden py-24 lg:py-32">
        <div className="light-orb glow-coral right-4 top-32 size-80 opacity-20" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Reveal variant="fade">
                <span className="text-xs font-extrabold uppercase tracking-[0.24em] text-primary">Service calendar</span>
              </Reveal>
              <h2 className="mt-4 text-5xl sm:text-6xl">
                <RevealWords text="What's coming up." stagger={90} />
              </h2>
            </div>
            <Reveal variant="rise" delay={180} className="max-w-md">
              <p className="leading-7 text-muted-foreground">
                Our next gatherings, with times and livestream links so you can plan your visit — or join us from home.
              </p>
            </Reveal>
          </div>

          <ol className="mt-14 space-y-4">
            {services.map((s, i) => (
              <Reveal as="li" key={`${s.label}-${s.date.toISOString()}`} variant="rise" delay={Math.min(i * 80, 400)}>
                <div className="lift grid gap-5 rounded-2xl border border-border/70 bg-card p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8">
                  <div className="sm:w-40">
                    <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
                      {s.date.toLocaleDateString("en-US", { weekday: "long" })}
                    </span>
                    <span className="mt-1 block font-display text-2xl">
                      {s.date.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                    </span>
                  </div>
                  <div>
                    <h3 className="flex flex-wrap items-center gap-3 text-2xl">
                      {s.label}
                      {s.live ? (
                        <span className="live-dot inline-flex items-center gap-2 rounded-full bg-soft-coral/15 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-soft-coral">
                          <span className="size-1.5 rounded-full bg-soft-coral" /> Streams live
                        </span>
                      ) : null}
                    </h3>
                    <p className="mt-1 text-sm font-bold">{s.time}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{s.detail}</p>
                    <span className="sr-only">{formatServiceDate(s.date)}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {s.live ? (
                      <a
                        href={CHURCH.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-primary-foreground"
                      >
                        <Play size={14} fill="currentColor" /> Watch live
                      </a>
                    ) : null}
                    <a
                      href={CHURCH.mapsDirections}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em]"
                    >
                      <MapPin size={14} /> Directions
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Messages */}
      <section id="messages" className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal variant="zoom">
            <div className="grid overflow-hidden rounded-3xl bg-primary text-primary-foreground shadow-2xl lg:grid-cols-[1.05fr_0.95fr]">
              <div className="flex flex-col justify-center p-9 lg:p-14">
                <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-secondary">
                  <Radio size={15} /> Live &amp; latest messages
                </span>
                <h2 className="mt-4 text-4xl sm:text-5xl">
                  <RevealWords text="Check out the message of the week." stagger={60} />
                </h2>
                <p className="mt-5 max-w-2xl text-primary-foreground/80">
                  Practical, easy to understand and grounded in Scripture. Watch our Facebook live broadcast on Sundays, and join us
                  midweek for devotional and prayer on Wednesdays at 7:15 PM.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a
                    href={CHURCH.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="lift inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-4 font-extrabold text-secondary-foreground"
                  >
                    <Play size={18} fill="currentColor" /> Watch on Facebook
                  </a>
                  <Link
                    to="/sermons"
                    className="lift inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-4 font-extrabold hover:bg-primary-foreground/10"
                  >
                    All sermons <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
              <div className="relative min-h-72">
                <LightboxImage
                  src={speakerImage}
                  alt="A Gracious Living Church speaker sharing a message"
                  width={1920}
                  height={2560}
                  className="absolute inset-0 h-full w-full"
                  imageClassName="h-full w-full object-cover object-[center_32%]"
                />
                <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-xs font-extrabold uppercase text-foreground shadow-lg">
                  <span className="live-dot size-2 rounded-full bg-soft-coral" /> Sundays live
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="relative overflow-hidden bg-muted py-24 lg:py-32">
        <div className="light-orb glow-sun left-1/3 top-8 size-80 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:items-center lg:px-10">
          <div>
            <Reveal variant="fade">
              <span className="text-xs font-extrabold uppercase tracking-[0.24em] text-primary">Plan your visit</span>
            </Reveal>
            <h2 className="mt-4 text-5xl sm:text-6xl">
              <RevealWords text="We saved you a seat." stagger={90} />
            </h2>
            <Reveal variant="rise" delay={200}>
              <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
                Doors open at 10 AM with coffee and treats — we&rsquo;d love to meet you during our pre-service hangout. Worship
                starts at 10:30 AM sharp.
              </p>
            </Reveal>
            <ol className="mt-9 space-y-5 text-muted-foreground">
              {[
                ["Where to park", "From 9th Street, turn in at the blue Gracious Living Church sign; plenty of parking to your left."],
                ["Check in the kids", "Head to the Welcome station by the front door and our host team will get your child registered."],
                ["Worship with us", "Join in on what God is doing as we celebrate Jesus and grow in relationship with Him and each other."],
              ].map(([h, p], i) => (
                <Reveal as="li" key={h} variant="left" delay={i * 130} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span>
                    <strong className="text-foreground">{h} —</strong> {p}
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal variant="right" delay={150} className="rounded-2xl bg-background p-8 shadow-xl">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <Clock3 className="mb-3 text-primary" />
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground">Sunday gathering</p>
                <p className="mt-1 text-xl font-bold">Coffee &amp; donuts 10 AM</p>
                <p className="mt-1 text-sm text-muted-foreground">Service starts 10:30 AM · about 75 minutes</p>
                <p className="mt-3 text-sm text-muted-foreground">Midweek devotional &amp; prayer, Wednesdays at 7:15 PM</p>
              </div>
              <div>
                <MapPin className="mb-3 text-primary" />
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground">Where</p>
                <p className="mt-1 text-xl font-bold">{CHURCH.venue}</p>
                <p className="mt-1 text-sm text-muted-foreground">{CHURCH.address}</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  On 9th St. and Benson Ave., just north of the 10 freeway.
                </p>
              </div>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={CHURCH.mapsDirections}
                target="_blank"
                rel="noreferrer"
                className="lift inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-extrabold text-primary-foreground"
              >
                Get directions <ArrowRight size={17} />
              </a>
              <Link
                to="/contact"
                className="lift inline-flex items-center gap-2 rounded-full border border-border px-6 py-4 text-sm font-extrabold"
              >
                Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
