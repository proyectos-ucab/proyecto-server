require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");

const api = require("./routes/api");
const auth = require("./auth");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(
  logger("dev", {
    skip: (req) => req.url.includes("_next"),
  })
);

app.get("/test-route", (req, res) =>
  res.status(200).json({ hello: "Hello, from the back-end world!" })
);

app.use("/api/v1", api);
app.use("/api/v1/auth", auth);

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
