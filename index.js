const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT||3000;

//cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());
//body parser
app.use(express.json());

require("./config/database").connect();

//route import and mount
const user = require("./routes/user");
app.use("/api/v1",user);

//server activate
app.listen(PORT, () => {
    console.log(`Server started succesfully at ${PORT}`);
})
