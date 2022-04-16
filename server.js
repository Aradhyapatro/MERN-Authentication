require("dotenv").config({ path: "./config.env" });
const express = require("express");
const config = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
config();

const app = express();

app.use(express.json());
app.use(cors);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`The Error is :\n ${err}`);
  server.close(() => {
    process.exit(1);
  });
});
