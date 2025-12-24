import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import tourRoute from "./routes/tour.route.js"
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
import reviewRoute from "./routes/review.route.js"
import bookingRoute from "./routes/booking.route.js"
import fansRoute from "./routes/fans.route.js"

const app = express()

app.use(cors({
    origin: true,
    credentials: true 
}))

app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(express.static("public"))

// tour route
app.use("/api/v1/tours", tourRoute)

// user route
app.use("/api/v1/users", userRoute)

// auth route
app.use("/api/v1/auth", authRoute)

// review route
app.use("/api/v1/review", reviewRoute)

// booking route
app.use("/api/v1/booking", bookingRoute)

// get all fans comments
app.use("/api/v1/get-all-fans", fansRoute)

export { app }