import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Play, Radio, Rss } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal, RevealWords } from "@/components/Reveal";
import { CHURCH, SERMONS } from "@/data/church";
import speakerImage from "@/assets/official/IMG_2444-2.jpg";

export const Route = createFileRoute("/sermons")({
  head: () => ({
    meta: [
      { title: "Sermons & Podcast | Gracious Living Church Upland" },
      { name: "description", content: "Listen to Sunday messages from Gracious Living Church in Upland, streamed live on Facebook." },
      { property: "og:title", content: "Sermons & Podcast | Gracious Living Church" },
      { property: "og:description", content: "Sunday messages and midweek devotionals from Gracious Living Church, Upland, California." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Sermons,
});

function Sermons() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden bg-deep-teal pb-20 pt-36 text-primary-foreground lg:pb-28 lg:pt-44">
        <img src={speakerImage} alt="" width={1920} height={2560} className="absolute inset-0 h-full w-full object-cover object-[center_28%] opacity-25" aria-hidden="true" />
        <div className="light-orb glow-sun right-0 top-10 size-96 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal variant="fade">
            <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.24em] text-secondary">
              <Radio size={15} /> Messages
            </span>
          </Reveal>
          <h1 className="mt-4 text-balance text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
            <RevealWords text="Messages that meet you where you are." />
          </h1>
          <Reveal variant="rise" delay={200} className="mt-6 max-w-2xl">
            <p className="text-lg leading-8 text-primary-foreground/80">
              Every Sunday we teach the timeless truths of the Bible in a way that is practical, easy to understand and grounded
              in Scripture. The Sunday service streams live on Facebook, and we gather again midweek for devotional and prayer at 7:15 PM.
            </p>
          </Reveal>
          <Reveal variant="rise" delay={320} className="mt-8 flex flex-wrap gap-3">
            <a
              href={CHURCH.facebookVideos}
              target="_blank"
              rel="noreferrer"
              className="lift inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-4 text-sm font-extrabold text-secondary-foreground"
            >
              <Play size={17} fill="currentColor" /> Watch all messages
            </a>
            <a
              href={CHURCH.facebook}
              target="_blank"
              rel="noreferrer"
              className="lift inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-4 text-sm font-extrabold hover:bg-primary-foreground/10"
            >
              <Facebook size={17} /> Follow on Facebook
            </a>
          </Reveal>
        </div>
      </section>

      <section aria-label="Recent messages" className="relative py-20 lg:py-28">
        <div className="light-orb glow-sky -left-20 top-40 size-80 opacity-25" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal variant="rise">
            <h2 className="text-4xl sm:text-5xl">Recent messages</h2>
            <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
              Tap any message to open it on our Facebook page, where the full audio and video are available.
            </p>
          </Reveal>

          <ul className="mt-12 divide-y divide-border border-y border-border">
            {SERMONS.map((s, i) => (
              <Reveal as="li" key={s.title} variant="rise" delay={i * 90}>
                <a
                  href={CHURCH.facebookVideos}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col gap-3 py-7 transition-colors hover:bg-muted/60 sm:flex-row sm:items-center sm:gap-8 sm:px-4"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:scale-110">
                    <Play size={18} fill="currentColor" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs font-bold uppercase tracking-[0.2em] text-primary">{s.series}</span>
                    <span className="mt-1 block font-display text-2xl sm:text-3xl">{s.title}</span>
                  </span>
                  <span className="text-sm text-muted-foreground sm:text-right">
                    <span className="block font-bold text-foreground">{s.date}</span>
                    {s.note}
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Podcast and livestream feed" className="bg-muted py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:items-center lg:px-10">
          <Reveal variant="left">
            <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.24em] text-primary">
              <Rss size={15} /> Listen anywhere
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl">Take the message with you.</h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              Our Sunday messages are published as they stream. Follow the church on Facebook to be notified the moment we go
              live, or open the video library any time to listen back through past Sundays.
            </p>
          </Reveal>
          <Reveal variant="right" delay={150} className="rounded-2xl bg-background p-8 shadow-xl">
            <h3 className="text-2xl">Live schedule</h3>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="font-bold uppercase tracking-[0.16em] text-muted-foreground">Sundays</dt>
                <dd className="mt-1 text-lg font-bold">10:30 AM service, streamed live</dd>
              </div>
              <div>
                <dt className="font-bold uppercase tracking-[0.16em] text-muted-foreground">Wednesdays</dt>
                <dd className="mt-1 text-lg font-bold">7:15 PM devotional &amp; prayer gathering</dd>
              </div>
            </dl>
            <a
              href={CHURCH.facebookVideos}
              target="_blank"
              rel="noreferrer"
              className="lift mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-extrabold text-primary-foreground"
            >
              <Play size={17} fill="currentColor" /> Open the video library
            </a>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
