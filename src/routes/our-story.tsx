import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import storyImage from "@/assets/official/our-story.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal, RevealWords } from "@/components/Reveal";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story | Gracious Living Church" },
      { name: "description", content: "The story of how Joe and Sue Cano came to follow Jesus and start Gracious Living Church in Upland." },
    ],
  }),
  component: OurStory,
});

function OurStory() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-deep-teal pb-20 pt-40 text-primary-foreground lg:pb-28 lg:pt-48">
          <div className="ray-wash pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
            <Reveal variant="fade" className="mb-12 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.26em] text-secondary lg:mb-16">
              <span className="h-px w-12 bg-secondary" /> Loving and living the Gospel
            </Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <h1 className="max-w-3xl text-balance text-6xl leading-[0.92] sm:text-7xl lg:text-[7rem]">
                  <RevealWords text="Our story." stagger={110} />
                </h1>
              </div>
            <Reveal variant="rise" delay={260} className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[5/4]">
                <img src={storyImage} alt="Joe and Sue Cano" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/45 to-transparent" />
              </div>
              <p className="mt-5 text-center font-signature text-6xl leading-none text-primary-foreground sm:text-7xl">Joe and Sue Cano</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-[0.7fr_1.3fr] lg:px-10">
            <Reveal variant="left" className="lg:sticky lg:top-28 lg:self-start">
              <span className="text-xs font-extrabold uppercase tracking-[0.24em] text-primary">A life transformed</span>
              <p className="mt-5 font-display text-3xl leading-tight text-deep-teal sm:text-4xl">
                One decision changed the direction of an entire family—and a church in Upland.
              </p>
            </Reveal>
            <article className="space-y-7 text-lg leading-8 text-muted-foreground">
              <Reveal variant="rise">
                <p>We became followers of Jesus Christ a little differently, and a little later than most people might expect. I asked Jesus to come into my life right around my 30th birthday. Until that point, I had been consumed with other things, having started a successful insurance and investment business right out of college.</p>
              </Reveal>
              <Reveal variant="rise" delay={80}>
                <p>When I hit the age of 23, I was working with New York Life as a Life and Disability Agent, excelling in the area of employee benefits. Then at the age of 25 I started Cano Insurance Services, which went on to become Corporate Choice Benefits. During that period, I began to write and service pensions, mutual funds, and investments as part of our ongoing employee benefit solutions for corporations.</p>
              </Reveal>
              <Reveal variant="rise" delay={120}>
                <p>As time went on, we felt there was something still missing in my life. We had a good marriage, a wonderful daughter, and plenty of finances to go around. Even though we had a lot of positive things going on in our lives and career, we felt unfulfilled and empty inside, as though we were taking one step forward and two steps back.</p>
              </Reveal>
              <Reveal variant="rise" delay={160}>
                <p>In October of 1990, after a sequence of events, we turned our life over to Jesus Christ. From that time on, we have never looked back, nor felt so sure and secure in our life decision to follow Jesus Christ as our personal Lord and Savior.</p>
              </Reveal>
              <Reveal variant="rise" delay={200}>
                <p>After we gave our lives over to God, He put us on a new path. We enrolled in pastoral courses called International Theological Training Course (ITTC), run by New Covenant Ministries International (NCMI). Since then I have pastored and led two churches.</p>
              </Reveal>
              <Reveal variant="rise" delay={240}>
                <p>In 2010, my wife, Susan, and I moved to Upland, CA to start Gracious Living Church, where I am the Lead Pastor. I also partner with the Upland Foothill Kiwanis Club and sit on the Board of Directors for Inland Valley Recovery Services (IVRS).</p>
              </Reveal>
            </article>
          </div>
        </section>

        <section className="bg-sunshine/25 px-5 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-4xl">
            <Reveal variant="fade">
              <span className="text-xs font-extrabold uppercase tracking-[0.24em] text-primary">An invitation</span>
            </Reveal>
            <Reveal variant="rise" delay={120}>
              <p className="mt-6 text-xl leading-9 text-deep-teal sm:text-2xl sm:leading-10">
                If you have never asked Jesus Christ into your life, we encourage you to pray the same prayer we prayed that fall day in Southern California:
              </p>
            </Reveal>
            <Reveal variant="rise" delay={220} className="mt-10 rounded-2xl bg-deep-teal p-8 text-xl leading-9 text-primary-foreground shadow-xl sm:p-12 sm:text-2xl">
              <blockquote>“Dear God, I open my heart to you and invite you into my life. I confess that I am a sinner. I ask that you would forgive me of all that I’ve done wrong. Thank you for sending your Son, Jesus Christ, who died for me and who gives me the opportunity to know you. I want to be your follower. Thank you for accepting me. In Jesus’ name I pray.”</blockquote>
              <footer className="mt-8 text-sm font-extrabold uppercase tracking-[0.2em] text-secondary">A prayer from Joe and Sue</footer>
            </Reveal>
            <Reveal variant="rise" delay={320} className="mt-10">
              <a href="https://graciouslivingchurch.com/" className="inline-flex items-center gap-2 font-extrabold text-deep-teal hover:text-soft-coral">
                Visit Gracious Living Church <ArrowRight size={18} />
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
