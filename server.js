const express = require("express");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const cors = require("cors");
const path = require("path");

//ROUTES
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");

const app = express();
const port = process.env.PORT || 5000;
const { prisma } = require("./constats/config");

//SERVER CLIENT FOLDER IE REACT BUILD
app.use(express.static(path.join(__dirname, "client")));

//CORS
//ADD YOUR URL HERE
app.use(
  cors({
    origin: [
      "http://localhost:3006",
      "https://localhost:5000",
      "https://expensetracker20.herokuapp.com/",
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
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(port, () => {
  console.log(`SERVER STARTED : ${port}`);
});
