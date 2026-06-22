const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Rajdip:Rajdip@cluster0.xahuo6t.mongodb.net/raaz"
);

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});