const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.use("/",express.static("./public"));

app.get("/cool",(request,response) => {
	response.send("<html>"+cool()+"</html>");
});

var contacts = [
	{
		name: "peter",
		phone: 12345
	},
	{
		name: "william",
		phone: 98765
	}
];

BASE_API = "/api/v1";

app.get(BASE_API+"/contacts", (req,res) => {
	res.send(contacts);
});

app.post(BASE_API+"/contacts", (req,res) => {
	
	var newContact = req.body;
	
	contacts.push(newContact);
	
	res.sendStatus(201);
});

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");