var express = require("express");
var mongoose = require("mongoose");

//Importing routers

var RegisterRouter = require("./routes/register");
var LoginRouter = require("./routes/login");
var postRouter = require('./routes/private/posts');

require("dotenv/config");

var app = express();

//
app.use(express.json());
//middleware routes;

app.use("/user", RegisterRouter);
app.use("/user", LoginRouter);
app.use("/user", postRouter);

//database connection
var db = mongoose.connection;
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to database!!");
});

//starting server
app.listen(
  process.env.PORT,
  console.log(`server started at port ${process.env.PORT}`)
);