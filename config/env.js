import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  SERVER_URL,
  CLIENT_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  NODE_ENV,
  MONGO_URL,
} = process.env;

 