const mongoose = require("mongoose");
const ShorturlSchema = new mongoose.Schema({
  MAC_ID: { type: String, required: true }, //ip
  FULL_URL: { type: String, required: true },
  SHORT_URL: { type: String, required: true },
  VIEW: { type: Number, required: false, default: 0 },
});

module.exports = mongoose.model("Shorturl", ShorturlSchema);
