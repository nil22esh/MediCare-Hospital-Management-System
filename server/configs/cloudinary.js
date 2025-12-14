import { v2 as cloudinary } from "cloudinary";

// Validate env vars, trim to remove accidental whitespace
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const API_KEY = process.env.CLOUDINARY_API_KEY?.trim();
const API_SECRET = process.env.CLOUDINARY_API_SECRET?.trim();

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  throw new Error(
    "Missing Cloudinary config. Ensure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET are set"
  );
}
if (/\s/.test(CLOUD_NAME)) {
  throw new Error("Invalid CLOUDINARY_CLOUD_NAME: contains whitespace");
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export default cloudinary;
