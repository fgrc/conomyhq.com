const express = require("express");
const app = express();
const path = require('path')

// server your css as static
app.use(express.static(path.join(__dirname, 'public')));

console.log("Server Started");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
})

// start your server
app.listen(3000, () => console.log('la mejor y más pulenta app del mercado'))