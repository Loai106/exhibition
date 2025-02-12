import Jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();
export function genarateToken(email: string) {
  const token = Jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: "24h",
  });
  return token;
}
