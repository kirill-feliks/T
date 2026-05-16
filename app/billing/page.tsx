import { PremiumShell } from "@/components/premium-shell";
import { Check, Crown, Shield, Zap } from "lucide-react";

const plans = [
  {
    key: "free",
    name: "Free",
    price: "0 ₸",
    trial: "5 дней чтобы попробовать",
    description: "Для первого теста AI-сотрудника без риска.",
    features: ["1 bot", "100 AI replies", "Basic upload", "Telegram preview"],
  },
  {
    key: "pro",
    name: "Pro",
    price: "19 900 ₸",
    trial: "7 дней бесплатно",
    description: "Оптимально для solo masters и маленьких студий.",
    features: ["Unlimited chats", "CRM", "Analytics", "AI memory", "Human takeover", "Lead recovery"],
    popular: true,
  },
  {
    key: "business",
    name: "Business",
    price: "49 900 ₸",
    trial: "7 дней бесплатно",
    description: "Для команд, multi-location и продвинутой аналитики.",
    features: ["5 bots", "Team access", "Advanced analytics", "Multi-location", "Priority setup", "Custom playbooks"],
  },
];

export default function Billing() {
  return (
    <PremiumShell>
      <section className="glass rounded-[2.2rem] p-6 md:p-8">
        <p className="text-champagne">Subscription OS</p>
        <h1 className="mt-2 max-w-3xl text-4xl font-semibold leading-tight">5–7 day trial, then simple pricing for small salons.</h1>
        <p className="mt-3 max-w-2xl text-white/55">Top-startup billing flow: trial state, usage limits, AI replies, CRM, analytics, memory and human takeover are packaged into clear plans.</p>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.key} className={`relative rounded-[2rem] border p-6 ${plan.popular ? "border-roseglow bg-roseglow/10 shadow-glow" : "border-white/12 bg-white/8"}`}>
            {plan.popular && <div className="absolute right-5 top-5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">Most popular</div>}
            <Crown className="text-champagne" />
            <h2 className="mt-5 text-2xl font-semibold">{plan.name}</h2>
            <p className="mt-2 text-sm text-emerald-200">{plan.trial}</p>
            <p className="mt-4 text-4xl font-bold">{plan.price}<span className="text-base font-normal text-white/45"> / month</span></p>
            <p className="mt-3 min-h-12 text-white/55">{plan.description}</p>
            <button className="mt-6 w-full rounded-full bg-gradient-to-r from-roseglow to-orchid py-3 font-semibold">Start {plan.name} trial</button>
            <div className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-white/70"><Check size={16} className="text-emerald-200" />{feature}</div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="glass rounded-[2rem] p-5"><Zap className="text-champagne" /><h3 className="mt-4 font-semibold">Usage tracking</h3><p className="mt-2 text-sm text-white/55">Every AI reply, recovered lead and appointment can be counted in `usage_events`.</p></div>
        <div className="glass rounded-[2rem] p-5"><Shield className="text-champagne" /><h3 className="mt-4 font-semibold">Trial guardrails</h3><p className="mt-2 text-sm text-white/55">Subscriptions store trial end, status, plan limits and provider metadata.</p></div>
        <div className="glass rounded-[2rem] p-5"><Crown className="text-champagne" /><h3 className="mt-4 font-semibold">Kaspi-ready MVP</h3><p className="mt-2 text-sm text-white/55">Manual Kaspi invoice first, payment provider integration later.</p></div>
      </section>
    </PremiumShell>
  );
}
