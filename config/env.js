import dotenv from "dotenv";
import path from "path";

const envFile = process.env.NODE_ENV === "develop" ? ".env.develop" : ".env";
dotenv.config({ path: path.resolve(process.cwd(), envFile) });
