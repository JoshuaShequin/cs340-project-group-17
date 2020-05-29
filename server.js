// imports
var express = require('express');
var process = require('process');
var exphbs = require("express-handlebars");
var fs = require('fs');
var cts = require('./server_js/connection_tools');
var bodyParser = require('body-parser');


var app = express();
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());

con = cts.create_connection();

//////Start/////////////--File Hosting--///////////////////////////////////////////////

app.use(express.static('public')); // any files in public can be requested and will be returned.

app.get('/', function(req, res, next){

	res.status(200).render('login');

});

app.post('/enterlogin', function(req, res, next){

	if (req.body && req.body.user_name && req.body.pass){
		cts.check_user_name(con, req.body.user_name, user_name_result, [req, res]);
	}
	else{
		res.status(200).send('Incorrect password or username!');
	};
	
	

});

app.get('/home', function(req, res, next){
	// set our default page to index.html, served through handlebars
	dummyRecentTests = [{
		testName: "Most Recent Test",
		testSumm: "Blah blah blah"
	}];
	dummyPopularTests = [{
		testName: "Most popular test",
		testSumm: "Blah blah blah"
	}];
	dummyYourTests = [{
		testName: "Most Recent Test",
		testSumm: "Blah blah blah",
		test_id: "1"
	}];
	res.status(200).render('index', {
		recentTests: dummyRecentTests,
		popularTests: dummyPopularTests,
		yourTests: dummyYourTests
	});
});

app.get('/color', function(req, res, next){
	// set our default page to index.html, served through handlebars
	res.status(200).render('color', {
		color: "#ff0000",
		redValue: "99",
		orangeValue: "1",
		yellowValue: "0",
		greenValue: "0",
		blueValue: "0"
	});
	
});

app.get('/createaccount', function(req, res, next){
	// set our default page to index.html, served through handlebars
	res.status(200).render('createaccount');
});

app.get('/createtest', function(req, res, next){

	res.status(200).render('createtests');
});

app.get('/findtests', function(req, res, next){
	
	dummyTestList = [{
		testName: "Dummy Test",
		testSumm: "Dummy Summary",
		test_id: "1"
	}];

	res.status(200).render('findtests', {
		findTest: dummyTestList
	});
});



app.get('/managetest', function(req, res, next){

	res.status(200).render('managetest');
});

app.get('/manageuser', function(req, res, next){

	res.status(200).render('login');
});

app.get('/question', function(req, res, next){

	res.status(200).render('question');
});

app.get('/testinformation', function(req, res, next){
	dummyQuestionList = [{
		questionNum: "1",
		question_id: "1",
		questionHexCode: "#ff0000"
	}];
	
	res.status(200).render('testInformation', {
		testName: "Dummy Test",
		testPercent: "00",
		testCorrect: "0",
		testTotal: "1",
		testSummary: "Dummy Summary",
		allQuestions: dummyQuestionList
	});
});

app.get('*', function (req, res, next){
	// if requested routing does not exist, serve 404 page through handlebars
	res.status(404).render('404');
});

//////End///////////////--File Hosting--///////////////////////////////////////////////

//////start///////////////--server functions--///////////////////////////////////////////////

function user_name_result(bool, passed_variables){
	if (bool){
		cts.check_password(con, passed_variables[0].body.user_name, passed_variables[0].body.pass, password_result, passed_variables);
	}
	else{
		passed_variables[1].status(200).send("Incorrect password or username!");
	};
};

function password_result(bool, passed_variables){
	if (bool){
		passed_variables[1].status(200).send("Login successful!");
	}
	else{
		passed_variables[1].status(200).send("Incorrect password or username!");
	};
}

//////End///////////////--server function--///////////////////////////////////////////////

/////--SERVER START--//////////////////////////

SERVER_PORT = process.env.PORT; // this is the port that the server will listen on.
// set with PORT environment variable.

if (SERVER_PORT == undefined){
	// If the PORT variable does not exist, default to port 7721
	SERVER_PORT = 7721;
}

app.listen(SERVER_PORT, function (){
	console.log("Server has started and is listening on port " + SERVER_PORT);
})