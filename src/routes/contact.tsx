import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Clock3, Facebook, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal, RevealWords } from "@/components/Reveal";
import { CHURCH, formatServiceDate, toISODate, upcomingSundays } from "@/data/church";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Gracious Living Church Upland" },
      { name: "description", content: "Call, email or message Gracious Living Church in Upland, California. Find us at the Upland Event Center, 1480 W. 9th St." },
      { property: "og:title", content: "Contact Gracious Living Church | Upland, CA" },
      { property: "og:description", content: "Reach our team by phone, email or message — we would love to hear from you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `Name: ${name}`,
      `Email: ${from}`,
      phone ? `Phone: ${phone}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");
    const href = `mailto:${CHURCH.email}?subject=${encodeURIComponent(`Website message from ${name || "a visitor"}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden bg-deep-teal pb-20 pt-36 text-primary-foreground lg:pb-24 lg:pt-44">
        <div className="light-orb glow-sun -right-16 top-0 size-80 opacity-35" aria-hidden="true" />
        <div className="light-orb glow-coral left-1/4 bottom-0 size-72 opacity-20" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal variant="fade">
            <span className="text-xs font-extrabold uppercase tracking-[0.24em] text-secondary">We would love to hear from you</span>
          </Reveal>
          <h1 className="mt-4 text-balance text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
            <RevealWords text="Say hello." />
          </h1>
          <Reveal variant="rise" delay={180} className="mt-6 max-w-xl">
            <p className="text-lg leading-8 text-primary-foreground/80">
              Questions about Sunday, prayer requests, or just want to introduce yourself? Call, email, or send us a message
              and someone from our team will get back to you.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Contact details and form" className="relative py-20 lg:py-28">
        <div className="light-orb glow-sky -left-24 top-32 size-80 opacity-25" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
          <Reveal variant="left">
            <h2 className="text-4xl sm:text-5xl">Reach us directly</h2>
            <ul className="mt-8 space-y-7 text-sm">
              <li className="flex gap-4">
                <Phone className="mt-1 shrink-0 text-primary" size={20} />
                <span>
                  <span className="block font-bold uppercase tracking-[0.16em] text-muted-foreground">Phone</span>
                  <a href={CHURCH.phoneHref} className="mt-1 block text-xl font-bold hover:text-primary">{CHURCH.phone}</a>
                </span>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 shrink-0 text-primary" size={20} />
                <span>
                  <span className="block font-bold uppercase tracking-[0.16em] text-muted-foreground">Email</span>
                  <a href={`mailto:${CHURCH.email}`} className="mt-1 block break-all text-xl font-bold hover:text-primary">{CHURCH.email}</a>
                </span>
              </li>
              <li className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-primary" size={20} />
                <span>
                  <span className="block font-bold uppercase tracking-[0.16em] text-muted-foreground">Where we meet</span>
                  <span className="mt-1 block text-xl font-bold">{CHURCH.venue}</span>
                  <span className="text-muted-foreground">{CHURCH.address}</span>
                </span>
              </li>
              <li className="flex gap-4">
                <Clock3 className="mt-1 shrink-0 text-primary" size={20} />
                <span>
                  <span className="block font-bold uppercase tracking-[0.16em] text-muted-foreground">Sunday gathering</span>
                  <span className="mt-1 block text-xl font-bold">Coffee &amp; donuts 10 AM</span>
                  <span className="text-muted-foreground">Service starts 10:30 AM</span>
                </span>
              </li>
              <li className="flex gap-4">
                <Facebook className="mt-1 shrink-0 text-primary" size={20} />
                <span>
                  <span className="block font-bold uppercase tracking-[0.16em] text-muted-foreground">Facebook</span>
                  <a href={CHURCH.facebook} target="_blank" rel="noreferrer" className="mt-1 block text-xl font-bold hover:text-primary">
                    facebook.com/GLCUPLAND
                  </a>
                </span>
              </li>
            </ul>
          </Reveal>

          <Reveal variant="right" delay={150}>
            <form onSubmit={submit} className="rounded-2xl bg-muted p-8 shadow-xl lg:p-10">
              <h2 className="text-3xl">Send us a message</h2>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-bold sm:col-span-1">
                  Your name
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 font-normal outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  />
                </label>
                <label className="text-sm font-bold sm:col-span-1">
                  Email
                  <input
                    required
                    type="email"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 font-normal outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  />
                </label>
                <label className="text-sm font-bold sm:col-span-2">
                  Phone (optional)
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 font-normal outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  />
                </label>
                <label className="text-sm font-bold sm:col-span-2">
                  How can we pray for you or help?
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 font-normal outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="lift mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-extrabold text-primary-foreground"
              >
                <Send size={17} /> Send message
              </button>
              {sent ? (
                <p className="mt-4 text-sm text-muted-foreground">
                  Your email app should have opened with the message ready to send to {CHURCH.email}. If it did not, please email
                  us directly or call {CHURCH.phone}.
                </p>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">
                  This opens your email app with the message addressed to {CHURCH.email}.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      <BookingSection />

      <section aria-label="Find us in Upland" className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal variant="zoom">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <iframe
                title="Map of Gracious Living Church, 1480 W. 9th St., Upland, CA"
                src={CHURCH.mapsEmbed}
                width="100%"
                height="460"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full border-0"
              />
            </div>
          </Reveal>
          <Reveal variant="rise" delay={120} className="mt-6">
            <p className="max-w-2xl leading-8 text-muted-foreground">
              We are on 9th St. at Benson Ave., just north of the 10 freeway. From Mountain Ave., head west on 9th St. — the
              event center is on your left just before Benson. Turn in at the blue Gracious Living Church sign; there is plenty
              of parking to your left.
            </p>
            <a
              href={CHURCH.mapsDirections}
              target="_blank"
              rel="noreferrer"
              className="lift mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-extrabold text-primary-foreground"
            >
              <MapPin size={17} /> Get directions
            </a>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function BookingSection() {
  const sundays = useMemo(() => upcomingSundays(8), []);
  const [serviceDate, setServiceDate] = useState(() => toISODate(upcomingSundays(1)[0]!));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [party, setParty] = useState(1);
  const [kids, setKids] = useState(0);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const book = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const { error } = await supabase.from("service_bookings").insert({
      name: name.trim().slice(0, 80),
      email: email.trim().slice(0, 160),
      phone: phone.trim() ? phone.trim().slice(0, 40) : null,
      service_date: serviceDate,
      party_size: party,
      kids_count: kids,
      notes: notes.trim() ? notes.trim().slice(0, 500) : null,
    });
    setStatus(error ? "error" : "done");
  };

  const field =
    "mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 font-normal outline-none transition-shadow focus:ring-2 focus:ring-ring";

  return (
    <section id="book" aria-label="Save your seat for Sunday" className="relative bg-muted py-20 lg:py-28">
      <div className="light-orb glow-sun -left-20 top-16 size-80 opacity-25" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
        <Reveal variant="left">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.24em] text-primary">
            <CalendarCheck size={15} /> Plan your Sunday
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl">Let us save you a seat</h2>
          <p className="mt-5 max-w-md leading-8 text-muted-foreground">
            Tell us which Sunday you are coming and we will be watching for you at the door — with coffee and donuts from
            10 AM and the service starting at 10:30. If you are bringing kids, we will have GLC Kids check-in ready.
          </p>
          <ul className="mt-8 space-y-3 text-sm font-bold">
            <li>Free parking on site at {CHURCH.venue}</li>
            <li>Come as you are — there is no dress code</li>
            <li>About 75 minutes, with nursery and a mother&apos;s room</li>
          </ul>
        </Reveal>

        <Reveal variant="right" delay={140}>
          <form onSubmit={book} className="rounded-2xl bg-card p-8 shadow-xl lg:p-10">
            <h3 className="text-3xl">Reserve your spot</h3>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-bold sm:col-span-2">
                Which Sunday?
                <select value={serviceDate} onChange={(e) => setServiceDate(e.target.value)} className={field}>
                  {sundays.map((d) => (
                    <option key={toISODate(d)} value={toISODate(d)}>
                      {formatServiceDate(d)} · 10:30 AM
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-bold">
                Your name
                <input required value={name} onChange={(e) => setName(e.target.value)} className={field} />
              </label>
              <label className="text-sm font-bold">
                Email
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
              </label>
              <label className="text-sm font-bold">
                Phone (optional)
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className={field} />
              </label>
              <div className="grid grid-cols-2 gap-5">
                <label className="text-sm font-bold">
                  Adults
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={party}
                    onChange={(e) => setParty(Number(e.target.value))}
                    className={field}
                  />
                </label>
                <label className="text-sm font-bold">
                  Kids
                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={kids}
                    onChange={(e) => setKids(Number(e.target.value))}
                    className={field}
                  />
                </label>
              </div>
              <label className="text-sm font-bold sm:col-span-2">
                Anything we should know? (optional)
                <textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} className={field} />
              </label>
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="lift mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-extrabold text-primary-foreground disabled:opacity-60"
            >
              {status === "sending" ? <Loader2 className="animate-spin" size={17} /> : <CalendarCheck size={17} />}
              Save my seat
            </button>
            {status === "done" ? (
              <p className="mt-4 text-sm font-bold text-primary">
                You are on the list — we cannot wait to meet you this Sunday.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="mt-4 text-sm text-muted-foreground">
                That did not go through. Please try again or call us at {CHURCH.phone}.
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
