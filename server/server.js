const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const connect = mongoose.connection;

app.use(express.urlencoded());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.listen(process.env.PORT || 8080, () => console.log("Server running"));

mongoose.connect("mongodb://localhost:27017/shortly", {
  useNewUrlParser: true,
});
connect.on("open", () => console.log("Database Connted"));

app.use("/", require("./routers/url"));
app.use("/shorturl", require("./routers/shorturl"));
