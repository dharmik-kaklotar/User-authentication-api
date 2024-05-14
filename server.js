const express = require("express");
const app = express();
const userRoutes = require("./routers/userRoutes");
require("dotenv").config();
const { connect } = require("./config/db");

connect();
app.use(express.json());


app.use("/api/users", userRoutes);


const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
});