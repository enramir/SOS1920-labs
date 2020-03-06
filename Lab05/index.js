const cool = require("cool-ascii-faces");
const express = require("express");

var app = express();

app.use("/", express.static("./public"));

app.get("/cool",(request,response) => {
	response.send("<html>"+cool()+"</html>");
});

app.listen(8080, () => {
	console.log("server ready");
});

console.log("starting server...");