import express from "express";
import db from "./models/index";
import fountainsRouter from "./routes/fountain.routes";
import reviewsRouter from "./routes/review.routes";
import dotenv from "dotenv";
import { ConnectOptions } from "mongoose";

dotenv.config();

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(err => {
        console.log("Cannot connect to the database:", err);
        process.exit();
    });

const app = express();

app.use(express.json());

app.use("/fountains", fountainsRouter);

app.use("/reviews", reviewsRouter)

let PORT = process.env.PORT || "3000";

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})
