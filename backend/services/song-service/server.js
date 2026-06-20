require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const songRoutes = require("./routes/songRoutes");

const app = express();

app.use(cors());

app.use(express.json());

connectDB();

app.use("/songs/api", songRoutes);

app.listen(process.env.PORT, () => {

    console.log(
        `Song Service running on ${process.env.PORT}`
    );

});