const express = require("express");
const bodyParser = require("body-parser"); 
const path = require("path");
const contactAPI = require(path.join(__dirname,"contactAPI"));
							
const port = process.env.PORT || 80;

const app = express();
app.use(bodyParser.json());

contactAPI(app);

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");