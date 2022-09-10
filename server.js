import express from "express";
import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import cors from "cors";
import path from "path";

//ROUTES
import * as authRoutes from "./routes/authRoutes.js";
import * as userRoutes from "./routes/userRoutes.js";
import * as transactionRoutes from "./routes/transactionRoutes.js";
import * as categoriesRoutes from "./routes/categoriesRoutes.js";

//Prisma Client
import prisma from "./constats/config.js";

const app = express();
const port = process.env.PORT || 5000;

//SERVER CLIENT FOLDER IE REACT BUILD
app.use(express.static(path.join(__dirname, "clientBuild")));

//CORS
//ADD YOUR URL HERE
app.use(
  cors({
    origin: [
      "http://localhost:3006",
      "https://localhost:5000",
      "https://better-tracker-app.onrender.com/",
    ],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
    credentials: true,
  })
);

//SESSIONS
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//ROUTES
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", transactionRoutes);
app.use("/api", categoriesRoutes);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "clientBuild", "index.html"));
});

app.listen(port, () => {
  console.log(`SERVER STARTED : ${port}`);
});
