const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  endpoint: { type: String },
  expirationTime: { type: Number },
  keys: {
    auth: { type: String },
    p256dh: { type: String },
  },
});

const SubscriptionModel = mongoose.model("push", SubscriptionSchema);

module.exports = SubscriptionModel