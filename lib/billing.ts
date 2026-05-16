export type PlanKey = "free" | "pro" | "business";

export type Plan = {
  key: PlanKey;
  name: string;
  priceKzt: number;
  trialDays: number;
  limits: {
    bots: number;
    aiReplies: number;
    teamSeats: number;
    trainingDocuments: number;
  };
  features: string[];
};

export const PLANS: Record<PlanKey, Plan> = {
  free: {
    key: "free",
    name: "Free",
    priceKzt: 0,
    trialDays: 5,
    limits: { bots: 1, aiReplies: 100, teamSeats: 1, trainingDocuments: 3 },
    features: ["1 AI employee", "100 trial replies", "Telegram preview", "Basic knowledge upload"],
  },
  pro: {
    key: "pro",
    name: "Pro",
    priceKzt: 19900,
    trialDays: 7,
    limits: { bots: 1, aiReplies: 5000, teamSeats: 2, trainingDocuments: 100 },
    features: ["7-day trial", "Unlimited live chats", "CRM pipeline", "AI memory", "Human takeover", "Revenue analytics"],
  },
  business: {
    key: "business",
    name: "Business",
    priceKzt: 49900,
    trialDays: 7,
    limits: { bots: 5, aiReplies: 25000, teamSeats: 10, trainingDocuments: 500 },
    features: ["7-day trial", "Multi-location", "Team access", "Advanced analytics", "Priority setup", "Custom playbooks"],
  },
};

export function trialEndsAt(plan: PlanKey, from = new Date()) {
  const result = new Date(from);
  result.setDate(result.getDate() + PLANS[plan].trialDays);
  return result.toISOString();
}

export function daysLeft(date: string | null | undefined, now = new Date()) {
  if (!date) return 0;
  return Math.max(0, Math.ceil((new Date(date).getTime() - now.getTime()) / 86_400_000));
}
