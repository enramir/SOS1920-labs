const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 80;

var contacts = [
	{ 
		name: "peter",
		phone: 123456,
		email: "peter@peter.com"
	},
	{ 
		name: "pablo",
		phone: 789456,
		email: "pablo@pablo.com"
	}
];

const BASE_API_URL = "/api/v1";

//GET CONTACTS

app.get(BASE_API_URL+"/contacts", (req,res) =>{
	res.send(JSON.stringify(contacts,null,2));
});

//POST CONTACTS

app.post(BASE_API_URL+"/contacts",(req,res) =>{
	
	var newContact = req.body;
	
	if(newContact == "" || (newContact.name == null) || (newContact.phone == null) || (newContact.email == null)){
		res.sendStatus(400,"BAD REQUEST");
	}else{
		contacts.push(req.body); 
		res.sendStatus(201,"CREATED");
	}
		
});

//DELETE CONTACTS

app.delete(BASE_API_URL+"/contacts",(req,res) =>{
	
	contacts = [];
	res.sendStatus(200);
});

//GET CONTACT/XXX

app.get(BASE_API_URL+"/contacts/:name", (req,res) =>{
	
	var name = req.params.name;
	
	var filteredContacts = contacts.filter((c) =>{
		return (c.name == name);
	});
	
	
	if(filteredContacts.length >= 1){
		res.send(filteredContacts[0]);
	}else{
		res.sendStatus(404, "CONTACT NOT FOUND");
	}
});

//PUT CONTACT/XXX

app.put(BASE_API_URL+"/contacts/:name", (req,res) =>{
	
	var name = req.params.name;
	var updateContact = req.body;
	var found = false;
	
	var updateContacts = contacts.map((c) =>{
		if(c.name == name){
			found = true;
			return updateContact;
		}else{
			return c;
		}
	});
	
	if(found == true){
		contacts = updateContacts;
		res.sendStatus(200);
	}else{
		res.sendStatus(404);
	}
});

//DELETE CONTACT/XXX

app.delete(BASE_API_URL+"/contacts/:name", (req,res) =>{
	
	var name = req.params.name;
	
	var filteredContacts = contacts.filter((c) =>{
		return (c.name != name);
	});
	
	
	if(filteredContacts.length < contacts.length){
		contacts = filteredContacts;
		res.sendStatus(200);
		
	}else{
		res.sendStatus(404, "CONTACT NOT FOUND");
	}
});

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");