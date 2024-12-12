const express = require("express");
const app = express();

app.use("/hello",(req,res) => {
    res.send("Hello From Helloooooooo!!");
});
app.use("/test",(req,res) => {
    res.send("Hello From server!!");
});
app.use("/",(req,res) => {
    res.send("Hello From DashBoard!!");
});

app.listen(3000,() => {
    console.log("Server is sucessfully listening on port 3000....");
});
