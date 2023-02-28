const express = require("express");
const mongoose = require("mongoose");
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");
const Thing = require("./models/Things");
const axios = require("axios");

const app = express();

mongoose
  .connect(
    "mongodb+srv://root:toor@cluster1.c453g.mongodb.net/Cluster1?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use("/api/telephone", stuffRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
