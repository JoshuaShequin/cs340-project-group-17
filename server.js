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

var con;


function handleError(){
	con = cts.create_connection();
	con.on('error', function(err){
		if (err.code === "PROTOCOL_CONNECTION_LOST"){
			handleError();
		}
	});
};
handleError()

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
	//console.log(req);
	//set our default page to index.html, served through handlebars
	cts.find_all_tests(con, "NULL", render_all_tests, [req,res]);
});

app.get('/home/:user_name', function(req, res, next){
	//set our default page to index.html, served through handlebars
	console.log("== SERVER: req values: ", req.params.user_name);
	cts.find_all_tests(con, req.params.user_name, render_all_tests, [req,res]);
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
	res.status(200).render('findtests');
});

app.post('/findtests', function(req, res, next){
	if (req.body && (req.body.test_ID || req.body.summary || req.body.number_of_questions || req.body.name || req.body.user_name)) {

		var test_ID = req.body.test_ID;
		var summary = req.body.summary;
		var number_of_questions = req.body.number_of_questions;
		var name = req.body.name;
		var user_name = req.body.user_name;
		
		console.log("== SERVER: req values: ", test_ID, summary, number_of_questions, name, user_name);
	
		cts.find_test_id(con, test_ID, summary, number_of_questions, name, user_name, test_table_render, [req, res]);
	}
});

app.get('/managetest', function(req, res, next){

	res.status(200).render('managetest');
});

app.get('/managetest/:user_name', function(req, res, next){
	
	var user_name = req.params.user_name;
	
	cts.get_tests(con, user_name, render_manage_tests, [req, res]);
});

app.get('/managetest/:user_name/:test_ID', function(req, res, next){
	
	var user_name = req.params.user_name;
	var test_ID = req.params.test_ID;
	cts.get_test_information(con, test_ID, render_specific_manage_test, [req, res, test_ID]);
});

app.post('/changetestinfo', function(req, res, next){
	if (req.body && req.body.user_name && req.body.test_ID && req.body.test_name && req.body.test_summary){
		cts.update_test_information(con, req.body.user_name, req.body.test_ID, req.body.test_name, req.body.test_summary);
	};
});

app.post('/deletetest', function(req, res, next){
	if (req.body && req.body.user_name && req.body.test_ID){
		cts.delete_test(con, req.body.user_name, req.body.test_ID);
	};
});

app.post('/deletequestion', function(req, res, next){
	if (req.body && req.body.question_ID){
		cts.delete_question(con, req.body.question_ID);
	};
});

app.post('/createquestion', function(req, res, next){
	if (req.body && req.body.test_ID && req.body.hex_code){
		cts.check_and_make_color(con, req.body.hex_code, create_question_2, [req, res, req.body.hex_code, req.body.test_ID]);
	};
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

app.post('/taketest', function(req, res, next){
	
	if(req.body && req.body.user_name && req.body.test_id){
		cts.take_test(con, req.body.user_name, req.body.test_id);
	};
	
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
	if (req.body) {
		cts.create_userA(res, con, req.body.name, req.body.pass, req.body.date, req.body.sex);
	}
});
/////////////////////////////////

app.post('/alterUsername', function (req, res, next){
	if (req.body) {
		cts.check_user_name(con, req.body.oldname, alter_username_2, [req, res, req.body.name, req.body.pass, req.body.oldname]);
	}
});

app.post('/alterPassword', function (req, res, next){
	if (req.body) {
		cts.check_user_name(con, req.body.oldname, alter_password_2, [req, res, req.body.oldname, req.body.pass]);
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

function alter_username_2(content, passed_variables){
	if (content){
		if (passed_variables[2] == ''){
			passed_variables[1].send("empty");
		}
		else{
			cts.check_user_name(con, passed_variables[2], alter_username_3, passed_variables);
		}
	}
	else{
		passed_variables[1].send("error");
	};
};

function alter_username_3(content, passed_variables){
	if (content){
		passed_variables[1].send("exists");
	}
	else{
		cts.alter_username(con, passed_variables[2], passed_variables[3], passed_variables[4]);
		passed_variables[1].send("success");
	}
};

function alter_password_2(content, passed_variables){
	if (content){
		if (passed_variables[2] == ''){
			passed_variables[1].send("empty");
		}
		else{
			cts.update_password(con, passed_variables[2], passed_variables[3]);
			passed_variables[1].send("success");
		}
	}
	else{
		passed_variables[1].send("error");
	}
};

function test_table_render(content, passed_variables) {
	console.log("==SERVER: content: ", content);

	passed_variables[1].status(200).send(content);
}
function render_manage_tests(content, passed_variables){
	
	//transform content in to correct object style
	for (var i = 0; i < content.length; i++){
		content[i].testName = content[i].name,
		content[i].testSumm = content[i].summary,
		content[i].test_id = content[i].test_ID
	}
	
	
	passed_variables[1].status(200).render('managetest', {
		yourTests: content
	});
};

function render_all_tests(content, passed_variables) {
	passed_variables[1].status(200).render('index',content);
}
function render_specific_manage_test(content, passed_variables){
	// got the test information.
	passed_variables.push(content[0].name)
	passed_variables.push(content[0].summary)
	cts.get_questions(con, passed_variables[2], render_specific_manage_test2, passed_variables)
};

function render_specific_manage_test2(content, passed_variables){
	// got the questions on the test and render the page.
	
	for (var i = 0; i < content.length; i++){
		content[i].questionNum = i+1,
		content[i].questionHexCode = content[i].hex_code,
		content[i].question_id = content[i].question_ID
	}
	
	passed_variables[1].status(200).render('managetest_specific', {
		testName: passed_variables[3],
		testSummary: passed_variables[4],
		questions: content
	});
};

function create_question_2(content, passed_variables){
	cts.new_question(con, passed_variables[2], passed_variables[3]);
};



//////End///////////////--server function--///////////////////////////////////////////////

/////--SERVER START--//////////////////////////

SERVER_PORT = process.env.PORT; // this is the port that the server will listen on.
// set with PORT environment variable.

if (SERVER_PORT == undefined){
	// If the PORT variable does not exist, default to port 7721
	SERVER_PORT = 1337;
}

app.listen(SERVER_PORT, function (){
	console.log("Server has started and is listening on port " + SERVER_PORT);
})
