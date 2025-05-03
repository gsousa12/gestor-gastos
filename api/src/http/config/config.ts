import dotenv from "dotenv";
dotenv.config();

export const serverConfig = {
  port: parseInt(process.env.PORT || "3000"),
  host: process.env.HOST || "0.0.0.0",
};
