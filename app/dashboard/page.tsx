import { PremiumShell, MetricCard } from "@/components/premium-shell";
import { BarChart3, Bot, Crown, MessageCircle, TrendingUp, Zap } from "lucide-react";

const activity = [
  "AI booked Aigerim for manicure at 17:30",
  "Recovered lost lead: Dinara replied after 9 days",
  "Upsold hand spa +2 500 ₸",
  "Human takeover requested for allergy question",
];

const funnel = [
  ["New leads", 42, "bg-roseglow"],
  ["Interested", 31, "bg-orchid"],
  ["Booked", 18, "bg-champagne"],
  ["Visited", 14, "bg-emerald-300"],
];

const series = [62, 74, 69, 88, 91, 107, 124];

export default function Dashboard() {
  return (
    <PremiumShell>
      <header className="glass rounded-[2.2rem] p-6 md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-champagne">Live AI Business OS</p>
            <h1 className="mt-2 max-w-3xl text-4xl font-semibold leading-tight">Your AI employee is working right now.</h1>
            <p className="mt-3 max-w-2xl text-white/55">Realtime chats, bookings, revenue, lead recovery, trial health and AI performance for a small beauty salon.</p>
          </div>
          <div className="rounded-[1.7rem] border border-emerald-300/20 bg-emerald-300/10 p-4 text-emerald-100">
            <div className="flex items-center gap-2 font-semibold"><Crown size={18} /> Pro trial · 7 days left</div>
            <p className="mt-2 text-sm text-emerald-100/70">5,000 AI replies · CRM · analytics · memory · takeover</p>
          </div>
        </div>
      </header>

      <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard label="AI solved" value="87%" delta="+12%" />
        <MetricCard label="Booking conversion" value="41%" delta="+8%" />
        <MetricCard label="Revenue generated" value="486k ₸" delta="+91k" />
        <MetricCard label="Avg response" value="4.2s" delta="fast" />
        <MetricCard label="Recovered clients" value="26" delta="+9" />
        <MetricCard label="Active chats" value="12" delta="live" />
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_.9fr]">
        <div className="glass rounded-[2rem] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Revenue & AI replies</h2>
              <p className="mt-1 text-sm text-white/50">Last 7 days · combines bookings, recovered leads and AI activity.</p>
            </div>
            <BarChart3 className="text-champagne" />
          </div>
          <div className="mt-6 flex h-56 items-end gap-3 rounded-[1.5rem] bg-black/25 p-4">
            {series.map((value, index) => (
              <div key={value} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-2xl bg-gradient-to-t from-orchid to-roseglow" style={{ height: `${value}%` }} />
                <span className="text-xs text-white/35">D{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-[2rem] p-6">
          <h2 className="text-2xl font-semibold">Smart funnel</h2>
          <p className="mt-1 text-sm text-white/50">A salon-specific pipeline from lead to visit.</p>
          <div className="mt-6 space-y-4">
            {funnel.map(([label, value, color]) => (
              <div key={label as string}>
                <div className="flex justify-between text-sm"><span>{label}</span><span>{value}</span></div>
                <div className="mt-2 h-3 rounded-full bg-white/10"><div className={`h-3 rounded-full ${color}`} style={{ width: `${Number(value) * 2}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
        <div className="glass rounded-[2rem] p-6">
          <div className="flex items-center gap-2"><Zap className="text-champagne" /><h2 className="text-2xl font-semibold">Realtime AI activity</h2></div>
          <div className="mt-5 space-y-3">
            {activity.map((item) => <div key={item} className="rounded-2xl bg-white/8 p-4 text-white/75">{item}</div>)}
          </div>
        </div>
        <div className="glass rounded-[2rem] p-6">
          <div className="flex items-center gap-2"><Bot className="text-champagne" /><h2 className="text-2xl font-semibold">AI quality</h2></div>
          {[
            ["Human tone match", "94%"],
            ["Upsell acceptance", "28%"],
            ["Memory hits", "73%"],
            ["Needs human", "6 chats"],
          ].map(([label, value]) => (
            <div key={label} className="mt-4 flex justify-between rounded-2xl bg-white/8 p-4"><span>{label}</span><span className="text-emerald-200">{value}</span></div>
          ))}
        </div>
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="glass rounded-[2rem] p-5"><MessageCircle className="text-champagne" /><p className="mt-4 text-sm text-white/50">Unread conversations</p><strong className="mt-2 block text-3xl">9</strong></div>
        <div className="glass rounded-[2rem] p-5"><TrendingUp className="text-champagne" /><p className="mt-4 text-sm text-white/50">Recovered revenue</p><strong className="mt-2 block text-3xl">118k ₸</strong></div>
        <div className="glass rounded-[2rem] p-5"><Crown className="text-champagne" /><p className="mt-4 text-sm text-white/50">Trial activation</p><strong className="mt-2 block text-3xl">72%</strong></div>
      </section>
    </PremiumShell>
  );
}
