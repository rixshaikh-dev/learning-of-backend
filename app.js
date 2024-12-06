import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import dbConnect from "./config/dbConnect.js";
import passport from "./auth.js";
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

dbConnect(process.env.MONGO_URI);

app.set("view engine", "ejs")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())
const localAuthMiddleware = passport.authenticate("local", { session: false })

app.use("/api", localAuthMiddleware, userRouter);


app.listen(PORT, () => {
  console.log(`server is running on : http://localhost:${PORT}/`);
});
