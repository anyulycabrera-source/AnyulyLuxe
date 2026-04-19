import { NextResponse } from "next/server";
import Stripe from "stripe";
import { MOCK_PRODUCTS } from "@/lib/data";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27ts", // Using current stable API version
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    // 1. SECURE PRICE CALCULATION
    // Never trust the total sent from the frontend.
    const calculateOrderAmount = (cartItems: any[]) => {
      return cartItems.reduce((total, item) => {
        const product = MOCK_PRODUCTS.find((p) => p.id === item.id);
        if (product) {
          return total + product.price * item.quantity;
        }
        return total;
      }, 0);
    };

    const amount = calculateOrderAmount(items);

    // Stripe expects amount in cents/smallest currency unit
    // USD $10.00 -> 1000 cents
    const amountInCents = Math.round(amount * 100);

    // 2. CREATE PAYMENT INTENT
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        // You can add extra info here
        order_items_count: items.length.toString(),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
