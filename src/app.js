import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import tourRoute from "./routes/tour.route.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import reviewRoute from "./routes/review.route.js";
import bookingRoute from "./routes/booking.route.js";
import fansRoute from "./routes/fans.route.js";

const app = express();

/* --- CORS: production only --- */
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

/* --- Body parsers & cookies --- */
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

/* --- Routes --- */
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/get-all-fans", fansRoute);

export default app;
