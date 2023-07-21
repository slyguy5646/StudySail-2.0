import { env } from "@/env";
import { prisma } from "@/db";
import { Subscription } from "@prisma/client";

export const sailorPlan: SubscriptionPlan = {
  name: "Sailor",
  description: "The free plan has a limit of 3 documents. Upgrade to the First Mate plan for 15 documents.",
  stripePriceId: env.STRIPE_SAILOR_MONTHLY_PLAN_ID,
};

export const firstMatePlan: SubscriptionPlan = {
  name: "First Mate",
  description: "The First Mate plan has a limit of 15 documents. Upgrade to the Captain plan for unlimited documents.",
  stripePriceId: env.STRIPE_FIRST_MATE_MONTHLY_PLAN_ID,
};
export const captainPlan: SubscriptionPlan = {
  name: "Captain",
  description: "The Captain plan has no document limit.",
  stripePriceId: env.STRIPE_CAPTAIN_MONTHLY_PLAN_ID,
};

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId: string;
};

export type UserSubscriptionPlan = SubscriptionPlan  & {
    subscription: Subscription
    stripeCurrentPeriodEnd: number;
    isPro: boolean;
  };

export async function getUserSubscriptionPlan(userId: string): Promise<UserSubscriptionPlan> {
  const sub = await prisma.subscription.findFirst({
    where: {
      user_id: userId,
    },
  });

  if (!sub) {
    throw new Error("User subscription not found");
  }

  const isPro = isSubPro(sub.stripePriceId, sub.stripeCurrentPeriodEnd);

  const plan = isPro ? sub.stripePriceId == env.STRIPE_CAPTAIN_MONTHLY_PLAN_ID ? captainPlan : firstMatePlan : sailorPlan;

  return {
    ...plan,
    subscription: sub,
    stripeCurrentPeriodEnd: sub.stripeCurrentPeriodEnd?.getTime() ?? 0,
    isPro,
  };
}

export function isSubPro(priceId: string | null, currentPeriodEnd: Date | null) {
  if (!currentPeriodEnd) return false;

  return (priceId != null && currentPeriodEnd?.getTime() + 86_400_000 > Date.now());
}
