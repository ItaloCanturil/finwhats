import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key is missing");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-04-30.basil"
});
export default stripe;
