export const CHURCH = {
  name: "Gracious Living Church",
  slogan: "To know Jesus and make Him known.",
  phone: "(909) 286-2042",
  phoneHref: "tel:+19092862042",
  email: "info@graciouslivingchurch.com",
  facebook: "https://www.facebook.com/GLCUPLAND",
  facebookVideos: "https://www.facebook.com/GLCUPLAND/videos",
  address: "1480 W. 9th St., Upland, CA 91786",
  venue: "Upland Event Center",
  mapsDirections: "https://maps.google.com/?q=1480+W+9th+St+Upland+CA+91786",
  mapsEmbed:
    "https://www.google.com/maps?q=1480+W+9th+St+Upland+CA+91786&output=embed",
} as const;

/** Recurring gathering rhythm used to generate the Sunday service calendar. */
export const WEEKLY = {
  coffee: "10:00 AM",
  service: "10:30 AM",
  midweek: "7:15 PM",
} as const;

export type ServiceEntry = {
  date: Date;
  label: string;
  time: string;
  detail: string;
  live: boolean;
};

/** Next `count` Sundays, plus the midweek gatherings that fall in between. */
export function upcomingServices(count = 6, from: Date = new Date()): ServiceEntry[] {
  const entries: ServiceEntry[] = [];
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const firstSunday = new Date(start);
  firstSunday.setDate(start.getDate() + ((7 - start.getDay()) % 7));

  for (let i = 0; i < count; i += 1) {
    const sunday = new Date(firstSunday);
    sunday.setDate(firstSunday.getDate() + i * 7);
    entries.push({
      date: sunday,
      label: "Sunday Gathering",
      time: `Coffee & donuts ${WEEKLY.coffee} · Service ${WEEKLY.service}`,
      detail: `${CHURCH.venue}, Upland · about 75 minutes · GLC Kids and Teens during service`,
      live: true,
    });

    // Wednesday that follows this Sunday
    const wed = new Date(sunday);
    wed.setDate(sunday.getDate() + 3);
    const weekOfMonth = Math.ceil(wed.getDate() / 7);
    if (weekOfMonth === 1) {
      entries.push({
        date: wed,
        label: "Prayer Night",
        time: "7:00 – 8:00 PM",
        detail: "First Wednesday of the month. Come and pray with us — bring anything on your heart.",
        live: false,
      });
    } else if (weekOfMonth === 4) {
      entries.push({
        date: wed,
        label: "DTS Ladies Gathering",
        time: "7:00 PM",
        detail: "Design to Shine women's gathering, fourth Wednesday of the month.",
        live: false,
      });
    } else {
      entries.push({
        date: wed,
        label: "Midweek Devotional & Prayer",
        time: WEEKLY.midweek,
        detail: "A short devotional and prayer to carry you through the week.",
        live: false,
      });
    }
  }

  return entries;
}

export function formatServiceDate(date: Date) {
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

/**
 * Sermon list. Titles and dates are placeholders modelled on the church's
 * teaching series — replace with the real message list when available.
 */
export const SERMONS = [
  { title: "Revealing Destiny", date: "Most recent Sunday", series: "Vision", note: "Full message on Facebook Live" },
  { title: "Know Jesus, Make Him Known", date: "Sunday gathering", series: "Mission", note: "Full message on Facebook Live" },
  { title: "Grace Upon Grace", date: "Sunday gathering", series: "Grace", note: "Full message on Facebook Live" },
  { title: "Fanning the Flame Within", date: "Sunday gathering", series: "Equip", note: "Full message on Facebook Live" },
  { title: "Upward, Inward, Outward", date: "Sunday gathering", series: "Vision", note: "Full message on Facebook Live" },
  { title: "Midweek Devotional & Prayer", date: "Wednesdays, 7:15 PM", series: "Midweek", note: "A short devotional and prayer to carry you through the week" },
] as const;

/** Next `count` Sundays as ISO dates (for the service booking form). */
export function upcomingSundays(count = 8, from: Date = new Date()): Date[] {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const first = new Date(start);
  first.setDate(start.getDate() + ((7 - start.getDay()) % 7));
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(first);
    d.setDate(first.getDate() + i * 7);
    return d;
  });
}

export function toISODate(date: Date) {
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

/** A month of daily prayer focuses used by the prayer calendar. */
export const PRAYER_FOCUS: string[] = [
  "Our city of Upland — peace, hope and revival",
  "Families in our church — grace at home",
  "Children and GLC Kids",
  "Teens finding their identity in Christ",
  "Marriages — love that reflects Jesus",
  "The sick and those awaiting healing",
  "Pastors, leaders and volunteers",
  "Neighbors who have never heard the gospel",
  "Those who are grieving",
  "Provision for families under pressure",
  "Schools, teachers and students",
  "First responders and medical workers",
  "Our Sunday gathering — hearts prepared",
  "Freedom from addiction",
  "The lonely — that they would find family here",
  "Wisdom for big decisions",
  "Missionaries and the global church",
  "Design to Shine women's ministry",
  "Those searching for work",
  "Unity in the body of Christ",
  "Courage to share our faith",
  "The unborn and expectant mothers",
  "Single parents",
  "Prayer Night — a fresh outpouring",
  "Our worship team and musicians",
  "The homeless in our community",
  "Elders and the aging in our church",
  "Forgiveness where there is hurt",
  "Baptisms and new believers",
  "Generosity and open hands",
  "Thanksgiving for God's faithfulness",
];

export function prayerFocusForDay(day: number) {
  return PRAYER_FOCUS[(day - 1) % PRAYER_FOCUS.length] ?? PRAYER_FOCUS[0]!;
}

export function daysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
