import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, HandCoins, HeartHandshake, Landmark, Loader2, Lock, Mail, Phone } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal, RevealWords } from "@/components/Reveal";
import { CHURCH } from "@/data/church";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/giving")({
  head: () => ({
    meta: [
      { title: "Giving | Gracious Living Church Upland" },
      {
        name: "description",
        content:
          "Give to Gracious Living Church in Upland, California. Give securely online, in person on Sunday, or by check — every gift supports our church, kids and community.",
      },
      { property: "og:title", content: "Giving | Gracious Living Church" },
      { property: "og:description", content: "Support the mission of Gracious Living Church in Upland — online, in person, or by mail." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Giving,
});

const AMOUNTS = [25, 50, 100, 250, 500];

const FUNDS = [
  { value: "general", label: "General fund", detail: "Sunday gatherings, kids, teens and day-to-day ministry" },
  { value: "missions", label: "Missions", detail: "Sharing the gospel beyond our own city" },
  { value: "building", label: "Building & vision", detail: "Toward a permanent home for our family of friends" },
  { value: "benevolence", label: "Benevolence", detail: "Practical help for families in need in Upland" },
] as const;

function Giving() {
  const [amount, setAmount] = useState<number | "">(100);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [fund, setFund] = useState<(typeof FUNDS)[number]["value"]>("general");
  const [method, setMethod] = useState<"card" | "check" | "in-person" | "other">("card");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const chosen = custom.trim() ? Number(custom.replace(/[^0-9.]/g, "")) : Number(amount || 0);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!Number.isFinite(chosen) || chosen < 1) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const { error } = await supabase.from("giving_pledges").insert({
      name: name.trim().slice(0, 80),
      email: email.trim().slice(0, 255),
      phone: phone.trim() ? phone.trim().slice(0, 30) : null,
      amount_cents: Math.round(chosen * 100),
      frequency,
      fund,
      method,
      note: note.trim() ? note.trim().slice(0, 500) : null,
    });
    setStatus(error ? "error" : "done");
    if (!error) {
      setNote("");
      setCustom("");
    }
  };

  const field =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-shadow duration-300 focus:ring-2 focus:ring-secondary";

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden bg-deep-teal pb-20 pt-36 text-primary-foreground lg:pb-24 lg:pt-44">
        <div className="light-orb glow-sun -right-16 top-0 size-80 opacity-35" aria-hidden="true" />
        <div className="light-orb glow-coral left-1/4 bottom-0 size-72 opacity-20" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal variant="fade">
            <span className="text-xs font-extrabold uppercase tracking-[0.24em] text-secondary">Generosity at GLC</span>
          </Reveal>
          <h1 className="mt-4 text-balance text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
            <RevealWords text="Give with joy." />
          </h1>
          <Reveal variant="rise" delay={180} className="mt-6 max-w-xl">
            <p className="text-lg leading-8 text-primary-foreground/80">
              Every gift helps us love our city, raise up kids and teens, and keep telling people about Jesus. Give online, in
              person on a Sunday, or by mail — whatever suits you best.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Give online" className="relative py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <Reveal variant="rise">
            <div className="rounded-3xl border border-border bg-card p-7 shadow-xl lg:p-9">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-muted-foreground">
                <Lock size={14} /> Secure giving form
              </div>
              <h2 className="mt-3 text-3xl">Make a gift</h2>

              {status === "done" ? (
                <div className="mt-8 rounded-2xl bg-muted p-6">
                  <CheckCircle2 className="text-deep-teal" />
                  <p className="mt-3 font-bold">Thank you for your generosity.</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    We&apos;ve received your details and someone from our team will email you a secure confirmation with the
                    next step for your chosen way of giving.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-5 rounded-full bg-deep-teal px-5 py-2.5 text-sm font-bold text-primary-foreground"
                  >
                    Give again
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-7 space-y-6">
                  <fieldset>
                    <legend className="text-sm font-bold">How often?</legend>
                    <div className="mt-3 inline-flex rounded-full bg-muted p-1">
                      {(["one-time", "monthly"] as const).map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setFrequency(f)}
                          aria-pressed={frequency === f}
                          className={`rounded-full px-5 py-2 text-sm font-bold capitalize transition-colors duration-300 ${
                            frequency === f ? "bg-deep-teal text-primary-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {f === "one-time" ? "One-time" : "Monthly"}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-sm font-bold">Amount</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {AMOUNTS.map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => {
                            setAmount(a);
                            setCustom("");
                          }}
                          aria-pressed={!custom && amount === a}
                          className={`rounded-full border px-5 py-2.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                            !custom && amount === a
                              ? "border-deep-teal bg-deep-teal text-primary-foreground"
                              : "border-border bg-background"
                          }`}
                        >
                          ${a}
                        </button>
                      ))}
                      <label className="relative">
                        <span className="sr-only">Other amount</span>
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">$</span>
                        <input
                          value={custom}
                          onChange={(e) => setCustom(e.target.value)}
                          inputMode="decimal"
                          placeholder="Other"
                          className={`${field} w-32 pl-8`}
                        />
                      </label>
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-sm font-bold">Where should it go?</legend>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {FUNDS.map((f) => (
                        <button
                          key={f.value}
                          type="button"
                          onClick={() => setFund(f.value)}
                          aria-pressed={fund === f.value}
                          className={`rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5 ${
                            fund === f.value ? "border-deep-teal bg-muted" : "border-border bg-background"
                          }`}
                        >
                          <span className="block text-sm font-bold">{f.label}</span>
                          <span className="mt-1 block text-xs leading-5 text-muted-foreground">{f.detail}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-sm font-bold">How would you like to give?</legend>
                    <select
                      value={method}
                      onChange={(e) => setMethod(e.target.value as typeof method)}
                      className={`${field} mt-3`}
                    >
                      <option value="card">Card or bank transfer</option>
                      <option value="check">Check by mail</option>
                      <option value="in-person">In person on Sunday</option>
                      <option value="other">Something else</option>
                    </select>
                  </fieldset>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-bold">Your name</span>
                      <input required maxLength={80} value={name} onChange={(e) => setName(e.target.value)} className={`${field} mt-2`} />
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold">Email</span>
                      <input
                        required
                        type="email"
                        maxLength={255}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`${field} mt-2`}
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-sm font-bold">Phone <span className="font-normal text-muted-foreground">(optional)</span></span>
                    <input maxLength={30} value={phone} onChange={(e) => setPhone(e.target.value)} className={`${field} mt-2`} />
                  </label>

                  <label className="block">
                    <span className="text-sm font-bold">Anything we should know? <span className="font-normal text-muted-foreground">(optional)</span></span>
                    <textarea rows={3} maxLength={500} value={note} onChange={(e) => setNote(e.target.value)} className={`${field} mt-2`} />
                  </label>

                  {status === "error" && (
                    <p className="text-sm font-bold text-coral">
                      Something went wrong. Please check the amount and email, or call us at {CHURCH.phone}.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="lift inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3.5 font-bold text-secondary-foreground disabled:opacity-60"
                  >
                    {status === "sending" ? <Loader2 className="animate-spin" size={18} /> : <HandCoins size={18} />}
                    Give ${chosen > 0 ? chosen.toLocaleString() : "0"} {frequency === "monthly" ? "monthly" : ""}
                  </button>
                  <p className="text-xs leading-5 text-muted-foreground">
                    Your details are sent over an encrypted connection and never shared. We never ask for card or account
                    numbers through this form.
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal variant="rise" delay={120}>
              <div className="rounded-3xl border border-border bg-card p-7 shadow-lg">
                <Landmark className="text-deep-teal" />
                <h2 className="mt-3 text-2xl">Church giving details</h2>
                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-xs font-extrabold uppercase tracking-[0.2em] text-muted-foreground">Checks payable to</dt>
                    <dd className="mt-1 font-bold">{CHURCH.name}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-extrabold uppercase tracking-[0.2em] text-muted-foreground">Mail or bring to</dt>
                    <dd className="mt-1 leading-6">{CHURCH.address}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-extrabold uppercase tracking-[0.2em] text-muted-foreground">In person</dt>
                    <dd className="mt-1 leading-6">
                      Sundays at the {CHURCH.venue} — coffee &amp; donuts at 10:00 AM, service at 10:30 AM.
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-extrabold uppercase tracking-[0.2em] text-muted-foreground">Questions</dt>
                    <dd className="mt-2 space-y-2">
                      <a href={CHURCH.phoneHref} className="flex items-center gap-2 font-bold hover:text-deep-teal">
                        <Phone size={16} /> {CHURCH.phone}
                      </a>
                      <a href={`mailto:${CHURCH.email}`} className="flex items-center gap-2 font-bold hover:text-deep-teal">
                        <Mail size={16} /> {CHURCH.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>

            <Reveal variant="rise" delay={220}>
              <div className="rounded-3xl bg-deep-teal p-7 text-primary-foreground shadow-lg">
                <HeartHandshake className="text-secondary" />
                <h2 className="mt-3 text-2xl">Where your gift goes</h2>
                <p className="mt-3 text-sm leading-7 text-primary-foreground/80">
                  Your generosity keeps Sunday running, cares for our kids and teens, supports families in need around Upland,
                  and carries the gospel further than we could go alone. Thank you for being part of it.
                </p>
                <p className="mt-4 text-sm font-bold text-secondary">
                  &ldquo;God loves a cheerful giver.&rdquo; — 2 Corinthians 9:7
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
