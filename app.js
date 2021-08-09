const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

//importing rout handlers
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

//1. middllewares
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//3. routes

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//4. Server
module.exports = app;
