"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Bot, Check, Crown, Loader2, Scissors, Sparkles, UploadCloud } from "lucide-react";

const niches = [
  { name: "Nail Studio", preset: "Маникюр, укрепление, дизайн, hand spa" },
  { name: "Hair Salon", preset: "Стрижки, окрашивание, уход, консультации" },
  { name: "Lash Studio", preset: "Классика, 2D/3D, коррекция, уход" },
  { name: "Brow Studio", preset: "Коррекция, окрашивание, ламинирование" },
  { name: "Beauty Clinic", preset: "Консультации, процедуры, противопоказания" },
  { name: "Massage Studio", preset: "Сеансы, абонементы, восстановление" },
];

const styles = [
  { name: "Luxury", description: "Спокойно, дорого, очень аккуратно" },
  { name: "Friendly", description: "Тепло, emoji, как любимый админ" },
  { name: "Fast Sales", description: "Коротко, быстро ведет к записи" },
  { name: "Premium Concierge", description: "Забота, рекомендации, VIP-сервис" },
  { name: "Warm Support", description: "Мягко снимает страхи и возражения" },
];

const avatars = ["Amina", "Sofia", "Dana", "Mira", "Lina", "Aya"];
const steps = ["Ниша", "AI-сотрудник", "Тон", "Знания", "Telegram", "Запуск"];

type FormState = {
  salonName: string;
  niche: string;
  employeeName: string;
  avatar: string;
  style: string;
  files: string[];
  botToken: string;
  plan: "pro" | "business";
};

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [createdSalonId, setCreatedSalonId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    salonName: "Aru Beauty Studio",
    niche: "Nail Studio",
    employeeName: "Amina",
    avatar: "Amina",
    style: "Premium Concierge",
    files: [],
    botToken: "",
    plan: "pro",
  });

  const selectedNiche = useMemo(() => niches.find((niche) => niche.name === form.niche) ?? niches[0], [form.niche]);
  const progress = Math.round(((step + 1) / steps.length) * 100);

  function patch(update: Partial<FormState>) {
    setForm((current) => ({ ...current, ...update }));
  }

  function next() {
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function back() {
    setStep((current) => Math.max(current - 1, 0));
  }

  async function launchDemo() {
    setSaving(true);
    const demoId = `demo-${Date.now()}`;
    localStorage.setItem("aruai:onboarding", JSON.stringify({ ...form, salonId: demoId, trialDays: form.plan === "pro" ? 7 : 7 }));
    setCreatedSalonId(demoId);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSaving(false);
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-5 pb-28 md:py-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 text-sm text-white/65 hover:text-white">
          <ArrowLeft size={16} /> Назад
        </Link>
        <div className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100">
          {form.plan === "pro" ? "7 дней тестового периода" : "7 дней Business trial"}
        </div>
      </div>

      <section className="glass overflow-hidden rounded-[2.5rem] p-5 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-champagne">Step {step + 1} of 6 · {steps[step]}</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">Create your AI salon employee</h1>
            <p className="mt-4 max-w-2xl text-white/60">Теперь wizard не заканчивается тупиком: выберите 6 пунктов, запустите trial и переходите в dashboard.</p>
          </div>
          <div className="min-w-56 rounded-[1.7rem] bg-white/8 p-4">
            <div className="flex justify-between text-sm text-white/60"><span>Launch progress</span><span>{progress}%</span></div>
            <div className="mt-3 h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-gradient-to-r from-roseglow to-orchid" style={{ width: `${progress}%` }} /></div>
          </div>
        </div>

        <div className="mt-8 grid gap-2 md:grid-cols-6">
          {steps.map((label, index) => (
            <button key={label} onClick={() => setStep(index)} className={`rounded-2xl px-3 py-3 text-sm transition ${index === step ? "bg-white text-black" : index < step ? "bg-emerald-300/15 text-emerald-100" : "bg-white/8 text-white/50"}`}>
              {index < step ? "✓ " : ""}{label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[1fr_360px]">
        <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass min-h-[520px] rounded-[2rem] p-5 md:p-7">
          {step === 0 && (
            <div>
              <h2 className="text-3xl font-semibold">1. Выберите тип салона</h2>
              <input value={form.salonName} onChange={(event) => patch({ salonName: event.target.value })} className="mt-5 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-4 outline-none" placeholder="Название салона" />
              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {niches.map((niche) => (
                  <button key={niche.name} onClick={() => patch({ niche: niche.name })} className={`rounded-[1.7rem] border p-5 text-left transition ${form.niche === niche.name ? "border-roseglow bg-roseglow/15" : "border-white/15 bg-white/8 hover:bg-white/12"}`}>
                    <Scissors className="text-roseglow" />
                    <strong className="mt-4 block">{niche.name}</strong>
                    <span className="mt-2 block text-sm text-white/50">{niche.preset}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-3xl font-semibold">2. Создайте AI-сотрудника</h2>
              <p className="mt-2 text-white/55">Имя и аватар будут использоваться в live preview, сообщениях и аналитике.</p>
              <input value={form.employeeName} onChange={(event) => patch({ employeeName: event.target.value })} className="mt-6 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-4 outline-none" placeholder="Имя AI-администратора" />
              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
                {avatars.map((avatar) => (
                  <button key={avatar} onClick={() => patch({ avatar, employeeName: avatar })} className={`rounded-[1.5rem] p-4 text-left ${form.avatar === avatar ? "bg-orchid/25 ring-1 ring-orchid" : "bg-white/8"}`}>
                    <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-roseglow to-orchid text-xl font-bold">{avatar[0]}</div>
                    <strong className="mt-3 block">{avatar}</strong>
                    <span className="text-sm text-white/45">AI Concierge</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-3xl font-semibold">3. Выберите тон общения</h2>
              <p className="mt-2 text-white/55">Это стартовая настройка. После загрузки переписок AI дополнительно обучится на вашем реальном стиле.</p>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {styles.map((style) => (
                  <button key={style.name} onClick={() => patch({ style: style.name })} className={`rounded-[1.7rem] border p-5 text-left ${form.style === style.name ? "border-champagne bg-champagne/15" : "border-white/15 bg-white/8"}`}>
                    <Sparkles className="text-champagne" />
                    <strong className="mt-4 block">{style.name}</strong>
                    <span className="mt-2 block text-sm text-white/50">{style.description}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-3xl font-semibold">4. Загрузите знания и переписки</h2>
              <p className="mt-2 text-white/55">Telegram export, WhatsApp .txt, PDF, FAQ, прайс. AI извлечет услуги, цены, возражения и стиль администратора.</p>
              <label className="mt-6 grid cursor-pointer place-items-center rounded-[2rem] border border-dashed border-white/25 bg-white/8 p-10 text-center transition hover:bg-white/12">
                <UploadCloud className="text-champagne" size={34} />
                <span className="mt-3 font-medium">Drop files here</span>
                <span className="text-sm text-white/45">Можно продолжить без файла и загрузить позже</span>
                <input className="hidden" type="file" multiple onChange={(event) => patch({ files: Array.from(event.target.files ?? []).map((file) => file.name) })} />
              </label>
              <div className="mt-4 space-y-2">
                {(form.files.length ? form.files : ["demo-telegram-export.html", "price-list.pdf"]).map((file) => (
                  <div key={file} className="flex items-center gap-2 rounded-2xl bg-white/8 p-3 text-sm text-white/70"><Check size={16} className="text-emerald-200" />{file}</div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-3xl font-semibold">5. Подключите Telegram</h2>
              <p className="mt-2 text-white/55">Пользователь вставляет только bot token. Webhook создается автоматически backend route `/api/integrations/telegram`.</p>
              <input value={form.botToken} onChange={(event) => patch({ botToken: event.target.value })} className="mt-6 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-4 outline-none" placeholder="123456:ABCDEF..." />
              <div className="mt-5 rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-100">
                Можно пропустить сейчас: в demo режиме мы покажем dashboard, а реальный token подключите позже в Integrations.
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-3xl font-semibold">6. Запустите trial</h2>
              <p className="mt-2 text-white/55">Выберите тариф. Trial 5–7 дней стартует сразу, чтобы салон мог протестировать AI на реальных клиентах.</p>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {[
                  ["pro", "Pro", "7 дней trial · CRM · analytics · human takeover", "19 900 ₸/мес"],
                  ["business", "Business", "7 дней trial · team · multi-location · advanced analytics", "49 900 ₸/мес"],
                ].map(([key, name, description, price]) => (
                  <button key={key} onClick={() => patch({ plan: key as FormState["plan"] })} className={`rounded-[1.7rem] border p-5 text-left ${form.plan === key ? "border-roseglow bg-roseglow/15" : "border-white/15 bg-white/8"}`}>
                    <Crown className="text-champagne" />
                    <strong className="mt-4 block text-xl">{name}</strong>
                    <span className="mt-2 block text-sm text-white/50">{description}</span>
                    <span className="mt-4 block text-2xl font-semibold">{price}</span>
                  </button>
                ))}
              </div>
              {createdSalonId ? (
                <Link href="/dashboard" className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-300 px-6 py-4 font-semibold text-black">Открыть dashboard <ArrowRight size={18} /></Link>
              ) : (
                <button onClick={launchDemo} disabled={saving} className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-roseglow to-orchid px-6 py-4 font-semibold shadow-glow disabled:opacity-60">
                  {saving ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />} Создать AI-сотрудника и начать trial
                </button>
              )}
            </div>
          )}
        </motion.div>

        <aside className="glass rounded-[2rem] p-5">
          <div className="flex items-center gap-3">
            <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-roseglow to-orchid text-xl font-bold">{form.employeeName[0] || "A"}</div>
            <div>
              <p className="font-semibold">{form.employeeName || "Amina"}</p>
              <p className="text-sm text-white/45">{form.style} · {selectedNiche.name}</p>
            </div>
          </div>
          <div className="mt-5 rounded-[1.5rem] bg-black/25 p-4 text-sm leading-relaxed text-white/70">
            <p className="text-white/45">Live preview</p>
            <p className="mt-3 rounded-2xl bg-white/8 p-3">Клиент: Можно завтра на запись?</p>
            <p className="mt-3 rounded-2xl bg-gradient-to-r from-orchid/30 to-roseglow/25 p-3">{form.employeeName}: Конечно 💕 Для {selectedNiche.name} завтра есть 12:00 и 18:30. Подскажите, какая услуга удобнее? Могу сразу забронировать.</p>
          </div>
          <div className="mt-5 space-y-2 text-sm">
            {[
              `Ниша: ${form.niche}`,
              `Тон: ${form.style}`,
              `Файлы: ${form.files.length || "demo"}`,
              `Telegram: ${form.botToken ? "token added" : "connect later"}`,
              `Trial: ${form.plan === "pro" ? "7 days Pro" : "7 days Business"}`,
            ].map((item) => <div key={item} className="flex gap-2 text-white/60"><Check size={16} className="text-emerald-200" />{item}</div>)}
          </div>
        </aside>
      </section>

      <div className="fixed bottom-4 left-4 right-4 z-40 mx-auto flex max-w-6xl justify-between rounded-[1.7rem] border border-white/15 bg-black/75 p-3 backdrop-blur md:static md:mt-4 md:bg-transparent md:p-0 md:backdrop-blur-0">
        <button onClick={back} disabled={step === 0} className="rounded-full border border-white/15 px-5 py-3 text-sm text-white/70 disabled:opacity-30">Назад</button>
        {step < steps.length - 1 ? (
          <button onClick={next} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">Дальше <ArrowRight size={16} /></button>
        ) : (
          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-white/70">Пропустить и открыть dashboard</Link>
        )}
      </div>
    </main>
  );
}
