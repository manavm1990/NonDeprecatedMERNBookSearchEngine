import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import config from "./config.js";
// It's a class. We'll use it to create a Stripe client.
import Stripe from "stripe";

const stripe = new Stripe(config.stripeSecretKey);

function calculateCartTotal(cart) {
  // Stripe wants an integer (cents). In real life, this can lead to rounding errors 💸 ⚠️.
  return Math.round(
    cart.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0) * 100
  );
}

export const encodeToken = (payload) => {
  return jwt.sign({ data: payload }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

export const handleError = (error, code = "INTERNAL_SERVER_ERROR") => {
  throw new GraphQLError(error.message, {
    extensions: {
      code,
    },
  });
};

export const createPaymentIntent = (cart) => {
  console.log("Creating payment intent...");
  console.log("Cart:", cart);
  console.log("Total:", calculateCartTotal(cart));
  return stripe.paymentIntents.create({
    amount: calculateCartTotal(cart),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
};
