import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, HandHeart, Loader2, Send } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal, RevealWords } from "@/components/Reveal";
import { CHURCH, daysInMonth, prayerFocusForDay } from "@/data/church";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/prayer")({
  head: () => ({
    meta: [
      { title: "Prayer Wall | Gracious Living Church Upland" },
      {
        name: "description",
        content:
          "Share a prayer request, pray for others, and join our monthly prayer calendar at Gracious Living Church in Upland, California.",
      },
      { property: "og:title", content: "Prayer Wall | Gracious Living Church" },
      { property: "og:description", content: "Submit a prayer, pray for others, and follow our monthly prayer calendar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrayerWall,
});

type Prayer = {
  id: string;
  name: string;
  request: string;
  prayer_count: number;
  created_at: string;
};

function PrayerWall() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");
  const [shared, setShared] = useState(true);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [prayedFor, setPrayedFor] = useState<Record<string, boolean>>({});

  const load = async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    try {
      const { data, error } = await supabase
        .from("prayer_requests")
        .select("id, name, request, prayer_count, created_at")
        .order("created_at", { ascending: false })
        .limit(60)
        .abortSignal(controller.signal);
      if (!error && data) setPrayers(data as Prayer[]);
    } catch (error) {
      console.error("Prayer wall could not load", error);
    } finally {
      window.clearTimeout(timeout);
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim()) return;
    setStatus("sending");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    try {
      const { error } = await supabase
        .from("prayer_requests")
        .insert({
          name: name.trim() ? name.trim().slice(0, 60) : "Anonymous",
          request: request.trim().slice(0, 1000),
          is_public: shared,
        })
        .abortSignal(controller.signal);
      if (error) throw error;
      setRequest("");
      setName("");
      setStatus("done");
      void load();
    } catch (error) {
      console.error("Prayer submission failed", error);
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const pray = async (id: string) => {
    if (prayedFor[id]) return;
    setPrayedFor((p) => ({ ...p, [id]: true }));
    setPrayers((list) => list.map((p) => (p.id === id ? { ...p, prayer_count: p.prayer_count + 1 } : p)));
    try {
      await supabase.rpc("increment_prayer_count", { _id: id });
    } catch (error) {
      console.error("Prayer count could not be updated", error);
    }
  };

  const today = useMemo(() => new Date(), []);
  const monthName = today.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const total = daysInMonth(today);
  const leadingBlanks = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden bg-deep-teal pb-20 pt-36 text-primary-foreground lg:pb-24 lg:pt-44">
        <div className="light-orb glow-sun -left-16 top-0 size-80 opacity-35" aria-hidden="true" />
        <div className="light-orb glow-sky right-1/4 bottom-0 size-72 opacity-25" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal variant="fade">
            <span className="text-xs font-extrabold uppercase tracking-[0.24em] text-secondary">Prayer Wall</span>
          </Reveal>
          <h1 className="mt-4 text-balance text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
            <RevealWords text="We pray together." />
          </h1>
          <Reveal variant="rise" delay={180} className="mt-6 max-w-xl">
            <p className="text-lg leading-8 text-primary-foreground/80">
              Leave a prayer for our church family to carry, and pray for the requests others have shared. Nothing is too
              small and nothing is too heavy.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Share a prayer request" className="relative py-20 lg:py-28">
        <div className="light-orb glow-coral -right-24 top-24 size-80 opacity-20" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <Reveal variant="left">
            <form onSubmit={submit} className="rounded-2xl bg-muted p-8 shadow-xl lg:p-10">
              <h2 className="text-3xl">Share a prayer</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Our team prays over every request. Leave your name off if you would rather stay anonymous.
              </p>
              <label className="mt-7 block text-sm font-bold">
                Your name (optional)
                <input
                  value={name}
                  maxLength={60}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Anonymous"
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 font-normal outline-none transition-shadow focus:ring-2 focus:ring-ring"
                />
              </label>
              <label className="mt-5 block text-sm font-bold">
                What can we pray for?
                <textarea
                  required
                  rows={6}
                  maxLength={1000}
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 font-normal outline-none transition-shadow focus:ring-2 focus:ring-ring"
                />
              </label>
              <label className="mt-5 flex items-start gap-3 text-sm font-bold">
                <input
                  type="checkbox"
                  checked={shared}
                  onChange={(e) => setShared(e.target.checked)}
                  className="mt-1 size-4 accent-primary"
                />
                <span>
                  Show this on the prayer wall
                  <span className="mt-1 block font-normal text-muted-foreground">
                    Uncheck to send it privately to our prayer team only.
                  </span>
                </span>
              </label>
              <button
                type="submit"
                disabled={status === "sending"}
                className="lift mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-extrabold text-primary-foreground disabled:opacity-60"
              >
                {status === "sending" ? <Loader2 className="animate-spin" size={17} /> : <Send size={17} />}
                Send prayer request
              </button>
              {status === "done" ? (
                <p className="mt-4 text-sm font-bold text-primary">Thank you — we are praying with you.</p>
              ) : null}
              {status === "error" ? (
                <p className="mt-4 text-sm text-muted-foreground">
                  Something went wrong sending that. Please try again, or call us at {CHURCH.phone}.
                </p>
              ) : null}
            </form>
          </Reveal>

          <Reveal variant="right" delay={140}>
            <h2 className="text-4xl sm:text-5xl">On the wall</h2>
            <p className="mt-3 text-muted-foreground">Tap “I prayed” to let them know someone lifted them up.</p>
            <div className="mt-8 space-y-5">
              {loading ? (
                <p className="text-muted-foreground">Loading prayers…</p>
              ) : prayers.length === 0 ? (
                <p className="text-muted-foreground">No prayers yet — yours can be the first.</p>
              ) : (
                prayers.map((p, i) => (
                  <Reveal key={p.id} variant="rise" delay={Math.min(i * 60, 360)}>
                    <article className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-transform duration-500 hover:-translate-y-0.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-xl">{p.name}</h3>
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                          {new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                      <p className="mt-3 whitespace-pre-line leading-7">{p.request}</p>
                      <button
                        type="button"
                        onClick={() => pray(p.id)}
                        disabled={prayedFor[p.id]}
                        className="mt-5 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-extrabold text-secondary-foreground transition-transform duration-500 hover:-translate-y-0.5 disabled:opacity-70"
                      >
                        <HandHeart size={16} />
                        {prayedFor[p.id] ? "You prayed" : "I prayed"} · {p.prayer_count}
                      </button>
                    </article>
                  </Reveal>
                ))
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-label="Monthly prayer calendar" className="bg-muted py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal variant="fade">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.24em] text-primary">
              <CalendarDays size={15} /> Prayer calendar
            </span>
          </Reveal>
          <h2 className="mt-4 text-4xl sm:text-5xl">{monthName}</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A focus for every day of the month. Pray with us wherever you are — and join Prayer Night on the first
            Wednesday, 7–8 PM.
          </p>
          <div className="mt-10 grid grid-cols-7 gap-1 text-center text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted-foreground">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <span key={d} className="py-2">
                {d.charAt(0)}
                <span className="hidden sm:inline">{d.slice(1)}</span>
              </span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1 sm:gap-2">
            {Array.from({ length: leadingBlanks }, (_, i) => (
              <div key={`blank-${i}`} aria-hidden="true" />
            ))}
            {Array.from({ length: total }, (_, i) => {
              const day = i + 1;
              const isToday = day === today.getDate();
              return (
                <Reveal key={day} variant="zoom" delay={Math.min(i * 18, 300)}>
                  <div
                    className={`flex h-full min-h-24 flex-col rounded-xl p-2 text-left shadow-sm sm:p-3 ${
                      isToday ? "bg-deep-teal text-primary-foreground" : "bg-card"
                    }`}
                  >
                    <span className={`text-sm font-extrabold ${isToday ? "text-secondary" : "text-primary"}`}>{day}</span>
                    <span className="mt-1 text-[11px] leading-4 sm:text-xs sm:leading-5">{prayerFocusForDay(day)}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
