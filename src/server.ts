import express from "express";
import dotenv from "dotenv";
import { connectToDB, sequelize } from "./config/db";
import { setupAssociations } from "./models/Assosiation";
import { artistRouter } from "./routes/artistRoutes";
import paintingRouter from "./routes/paintingRoutes";
import cors from "cors";
import paymentRouter from "./routes/paymentRoutes";
dotenv.config();

export const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;
app.use(cors());
//routes
app.use("/api", artistRouter);
app.use("/api", paintingRouter);
app.use("/api", paymentRouter);
app.listen(PORT, async () => {
  // To create the tables, you need to convert the commented lines into normal code:
  console.log("Connecting to DB...");
  await connectToDB();
  console.log("Connected to DB successfully.");
  // To create the tables, you need to convert the commented lines into normal code:

  console.log("Setting up associations...");
  setupAssociations();
  console.log("Associations are set up.");
  // console.log("Syncing Sequelize...");
  // await sequelize.sync({ alter: true });
  // console.log("Sequelize has been synced.");

  console.log(`Server is running on http://localhost:${PORT}`);
});
