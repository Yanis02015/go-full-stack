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

app.use("/api/tcf-search", (req, res) => {
  var config = {
    method: "get",
    url: "https://portail.if-algerie.com/exams",
    headers: {
      Cookie: "_ga=GA1.2.1768497298.1630442910; _gid=GA1.2.1621704068.1630911347; remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6ImJXQ29CMU5aaGNCMGo3M1B1SGZsbGc9PSIsInZhbHVlIjoialZkOGJlR2wzN3k2NjVHcUlQdGFHbjJEVDRteVZLRGtjd2xVOUx1TzZucEpLQVhGV01BakNKMEpVYzQ0ZzFGVzJtdFN0d0dNeXM2Q0xHSytvR1A2dnNGcm1BTFwvYkswdmVmekhYaVpnTFE4VXFjMHRJWDUyV0FTS3JUSkw1MTl1THFSWHZYcld2dzBDRzZucHdmQWV6UHJcL2hMek9FNDBiMUJ1WHBUaWphcHlJZ2UyMWZqWXpzSTU1VFZBQm5KQjgiLCJtYWMiOiIxODIzYmY3YzEzNTU4YTgyN2Y0NTQ5Yzc3NTMzNGFhM2M2OTc1MTc2YmZkYmI0NTE0NGJiYWZlZWY5MGQ5YTI1In0%3D; XSRF-TOKEN=eyJpdiI6ImtJVE5CcHQraytvNnVyVmZDdEFZWmc9PSIsInZhbHVlIjoiWHdcL0VUTmg2bFZ2UFF0WlVDd2JoSE1LT2xyeEF2WjBrUFVrS2dSYmFld2NVK2pvdWhUYVwvRExzRjE1NUErbjRUIiwibWFjIjoiNGFhM2Q2NzE1ZmRkMmQyNWQ1ZmViYzcyZjZlMjViNGVhNTYzYTY0MGQ0NWVlZmVhZjEyODA0OGYzZDg2Nzg4OSJ9; ifa_session=eyJpdiI6IktZYVRpUExzV2I5ak03RDBORnZDalE9PSIsInZhbHVlIjoiVHJcL09pYmFGcXRsb09idit4WXU2Uk9YXC9JTmgzZldkdDkxSW9qd1ZKcVN1a2REbnRTMHN0VVRCWFhEY2hNVEdTIiwibWFjIjoiNjFjNWEzYmVjNjc4OGZiMWEyOTczM2I2ZjMwNWNlNzU2YzQzOWIxOGUyNjY1NjI3MGQ0YTE3NzU4ZmIyMzBmYSJ9",
    },
  };

  axios(config)
    .then(function (response) {
      let data = response.data;
      data = data.toString();
      data = data.split("var defaultEvents =  ")[1];
      data = data.split("console.log(defaultEvents)")[0];
      data = data.split(" ").join("");
      data = data.split("\n").join("");

      data = data.split("uid").join('"uid"');
      data = data.split("title").join('"title"');
      data = data.split("start").join('"start"');
      data = data.split("duration").join('"duration"');
      data = data.split("minutes").join('"minutes"');
      data = data.split("className").join('"className"');
      data = data.split("level").join('"level"');
      data = data.split("price").join('"price"');
      data = data.split("antenna_name").join('"antenna_name"');
      data = data.split("antenna_id").join('"antenna_id"');
      data = data.split("local").join('"local"');
      data = data.split("status").join('"status"');
      data = data.split("full").join('"full"');

      data = data.toString();
      data = data.substring(1, data.length - 3);

      const examens = data.split('{"uid":');
      examens.splice(0, 1);
      for (i = 0; i < examens.length; i++) {
        examens[i] = '{"uid":' + examens[i];
        if (i !== examens.length - 1)
          examens[i] = examens[i].substring(0, examens[i].length - 1);
        examens[i] = JSON.parse(examens[i])
        console.log(examens[i], "\n\n");
      }
      return examens;
    })
    .then((response) => {
      res.json(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log("test");
});

app.use("/api/telephone", stuffRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
