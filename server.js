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
		testSumm: "Blah blah blah",
		test_id: "1"
	}];
	dummyPopularTests = [{
		testName: "Most popular test",
		testSumm: "Blah blah blah",
		test_id: "1"
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
	res.status(200).render('colorsearch');
	
});

app.get('/color/:hex_code', function(req, res, next){
	// set our default page to index.html, served through handlebars
	var hex_code = req.params.hex_code;

	cts.get_colorcount(con, hex_code, color_count_return, [req, res, hex_code, next]);
});

app.post('/deleteAccount', function(req, res, next){
	if (req.body && req.body.user_name){
		cts.delete_user(con, req.body.user_name);
	};
});

app.get('/createaccount', function(req, res, next){
	// set our default page to index.html, served through handlebars
	res.status(200).render('createaccount');
});

app.get('/editaccount', function(req, res, next){
	res.status(200).render('editaccount');
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

app.get('/testinformation/:test_id', function(req, res, next){
	var test_id = req.params.test_id;
	
	cts.increment_test_taken_count(con, test_id); // not really representative of the true "taken_count", more like visited count. But it works.
	cts.get_questions(con, test_id, test_information_render_p1, [req, res, test_id]);
});

/*
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
*/

app.post('/testinformation/answer/:user_name/:question_id', function(req, res, next){
	if (req.body && req.body.user_name && req.body.answer){
		var user_name = req.params.user_name;
		var question_id = req.params.question_id;
		
		cts.get_correct_color(con, question_id, answer_question_p1, [req, res, user_name, question_id, req.body.answer]);
	}
	else{
		res.status(200).send("NO");
	};
	
});

app.get('/testinformation/:user_name/:question_id', function(req, res, next){
	
	var user_name = req.params.user_name;
	var question_id = req.params.question_id;
	
	cts.get_answer_information(con, user_name, question_id, relay_question_information, [req, res]);
});



/////////////////////////////////
app.post('/createuser', function (req,res, next) {
	console.log("\n== Attempting to create new user with following attributes");
	console.log(req.body);
	console.log("\n");
	if (req.body) {
		cts.create_userA(res, con, req.body.name, req.body.pass, req.body.date, req.body.sex);
	}
});
/////////////////////////////////

app.post('/alterUsername', function (req, res, next){
	console.log("\n== Attempting to give existing user the following username");
	console.log(req.body);
	console.log("\n");
	if (req.body) {
		console.log("\n Got inside if statement");
		cts.alter_username(con, req.body.name, req.body.pass, req.body.oldname);
		console.log("\n Got after cts call");
	}
});

app.post('/alterPassword', function (req, res, next){
	console.log("\n== Attempting to give existing user the following password");
	console.log(req.body);
	console.log("\n");
	if (req.body) {
		cts.update_password(con, req.body.oldname, req.body.pass);
	}
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

function test_information_render_p1(content, passed_variables){
	questionList = []
	for (var i = 0; i < content.length; i++) {
		questionList.push({
			questionNum: String(i+1),
			question_id: content[i].question_ID,
			questionHexCode: "#" + content[i].hex_code
		});
	}
	passed_variables.push(questionList);
	cts.get_test_information(con, passed_variables[2], test_information_render_p2, passed_variables);
	
}

function test_information_render_p2(content, passed_variables){
	passed_variables[1].status(200).render('testInformation', {
		testName: content[0].name,
		testSummary: content[0].summary,
		allQuestions: passed_variables[3]
	});
};

function relay_question_information(content, passed_variables){
	if(content.length == 1){
		passed_variables[1].status(200).send("A:"+content[0].color_chosen);
	}
	else{
		passed_variables[1].status(200).send("F:");
	};
};

function answer_question_p1(content, passed_variables){
	passed_variables.push(content);
	cts.get_answer_information(con, passed_variables[2], passed_variables[3], answer_question_p2, passed_variables);
}

function answer_question_p2(content, passed_variables){
	if(content.length > 0){
		cts.update_answer(con, passed_variables[2], passed_variables[3], passed_variables[4], passed_variables[5]);
	}
	else{
		cts.new_answer(con, passed_variables[2], passed_variables[3], passed_variables[4], passed_variables[5]);
	}
}



function color_count_return(content, passed_variables){
	
	if(content.length == 0){
		passed_variables[1].status(404).render('404');
	} else {
		passed_variables[1].status(200).render('color', {
			color: "#" + passed_variables[2],
			redValue: content[0].red_count,
			orangeValue: content[0].orange_count,
			yellowValue: content[0].yellow_count,
			greenValue: content[0].green_count,
			blueValue: content[0].blue_count
		});
	}
	

	
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
