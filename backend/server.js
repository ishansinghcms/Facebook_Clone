const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const DB = process.env.DATABASE_URL;
const port = 8000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb", err));

app.listen(port, () => {
  console.log(`server is running on port ${port}..`);
});
