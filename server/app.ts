import express from "express";
import session from "express-session";
import db from "./models/index";
import fountainsRouter from "./routes/fountain.routes";
import reviewsRouter from "./routes/review.routes";
import usersRouter from "./routes/user.routes";
import dotenv from "dotenv";
import { ConnectOptions } from "mongoose";
import connectMongoDBStore from "connect-mongodb-session";
import cors from "cors";

dotenv.config();

if (!process.env.SESSION_STORE_SECRET) {
    console.warn("SESSION_STORE_SECRET should be set");
}

// connect to main application database
db.mongoose
    .connect(db.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(err => {
        console.error("Cannot connect to the database:", err);
        process.exit();
    });

// initialize express app
const app = express();

// activate cors
app.use(cors({
    origin: "*",
    methods: ["POST", "GET", "PATCH", "DELETE"],
    credentials: true
}))

// enable parsing of json request bodies
app.use(express.json());

declare module "express-session" {
    interface SessionData {
        username: string
    }
}

// initialize session store
const MongoDBStore = connectMongoDBStore(session);

const sessionStore = new MongoDBStore({
    uri: process.env.SESSION_STORE_URI || "",
    collection: "sessions"
}, (err) => {
    if (err) {
        console.error("Cannot connect to session store:", err);
        process.exit();
    }
})

// pass the session store into the express-session middleware
app.use(session({
    secret: process.env.SESSION_STORE_SECRET || "",
    cookie: { maxAge: 1000 * 60 * 60, secure: false },
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}))

app.use("/fountains", fountainsRouter);

app.use("/reviews", reviewsRouter);

app.use("/users", usersRouter);

let PORT = process.env.PORT || "3000";

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})
