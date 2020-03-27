module.exports = function (app){
	
	console.log("Registering contact API...");
	const dataStore = require("nedb");
	const path = require("path");
	
	const dbFileName = path.join(__dirname,"contacts.db");
	const BASE_API_URL = "/api/v1";
	
	const db = new dataStore({
		
		filename: dbFileName,
		autoload: true
	});

	
	var initialContacts = [
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

	// loadInitialData

	app.get(BASE_API_URL+"/contacts/loadInitialData", (req,res) =>{
		console.log("New GET .../loadInitialData");
		
		db.insert(initialContacts);
		res.sendStatus(200);
		
		console.log("Initial Contact loaded:"+JSON.stringify(initialContacts,null,2));
	});

	//GET CONTACTS

	app.get(BASE_API_URL+"/contacts", (req,res) =>{
		console.log("New GET .../contacts");

		db.find({}, (err, contacts) =>{
			contacts.forEach( (c) => {
				delete c._id;
				
			});
			
			res.send(JSON.stringify(contacts,null,2));
			console.log("Data sent:"+JSON.stringify(contacts,null,2));
		});

	});

	
	console.log("Ok.");
}


