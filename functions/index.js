require("dotenv").config();
const functions = require("firebase-functions");
const express=require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.CLIENT_SECRET);

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("Hello World"));

app.post("/payments/create", async (request, response)=>{
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!! for this amount >>>", total );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "USD",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command

exports.api = functions.https.onRequest(app);
