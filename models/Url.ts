import { Schema, model, models } from "mongoose";

const UrlSchema = new Schema({
  urlCode: String, // Code representing the shortened URL
  longUrl: String, // Original (long) URL
  shortUrl: String, // Shortened URL
  date: {
    type: String,
    default: Date.now,
  },
});

const Url = models.Url || model("Url", UrlSchema);

export default Url;
