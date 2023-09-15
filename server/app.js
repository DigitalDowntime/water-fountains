import express from "express";
import db from "./models/index.js";
import fountainsRouter from "./routes/fountain.routes.js";
import dotenv from "dotenv";

dotenv.config();

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
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

let PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})