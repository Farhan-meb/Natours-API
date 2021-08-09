const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("./../../models/tourModel");

dotenv.config({ path: "./config.env" });

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   prcoess.env.DATABASE_PASSWORD
// );
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
//const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    //console.log(con.connections);
    console.log("DB Connection Succesful!");
  });

//Read json file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

//import data into database
const exit = () => {
  process.exit();
};

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully loaded!");
    exit();
  } catch (err) {
    console.log(err);
    exit();
  }
};

//delete all data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data Successfully deleted!");
    exit();
  } catch (err) {
    console.log(err);
    exit();
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] == "--delete") {
  deleteData();
}

console.log(process.argv);
