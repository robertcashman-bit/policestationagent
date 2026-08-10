import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
  typescript: true,
});

export const STRIPE_PRICE_IDS = {
  oneTime: process.env.STRIPE_PRICE_ID_ONE_TIME || "",
  subscription: process.env.STRIPE_PRICE_ID_SUBSCRIPTION || "",
  cloudBackup: process.env.STRIPE_PRICE_ID_CLOUD_BACKUP || "",
};

export function generateLicenceKey(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const segment = () => {
    const bytes = new Uint8Array(4);
    crypto.getRandomValues(bytes);
    return Array.from(bytes)
      .map((b) => chars[b % chars.length])
      .join("");
  };
  return `CN-${segment()}-${segment()}-${segment()}-${segment()}`;
}
