const express = require("express");
const bodyParser = require("body-parser");
const back = require("./src/back");

var app = express();
app.use(bodyParser.json());
back(app);

var port = process.env.PORT || 8080;

app.use("/",express.static("./public"));

app.listen(port, () => {
	console.log("Server ready on port " + port);
});

console.log("Starting server...");
