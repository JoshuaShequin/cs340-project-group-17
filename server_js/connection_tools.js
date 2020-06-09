var mysql = require('mysql');
var bcrypt = require('bcrypt');

const saltRounds = 10;

var methods = {};

methods.create_connection = function(){
	var con = mysql.createConnection({
	  host: "classmysql.engr.oregonstate.edu",
	  user: "cs340_thomlane",
	  password: "2564",
	  database: "cs340_thomlane"
	});
	con.connect(function(err){
		if (err) throw err;
	});
	return con;
}

methods.check_user_name = function(con, user, next_func, passed_variables){
	var sql = "SELECT user_name FROM User WHERE user_name='"+user+"';";
	con.query(sql, function(err, result){
		if (err) throw err;
		if (result.length == 0){
			next_func(false, passed_variables);
		}
		else next_func(true, passed_variables);
	});

}

methods.update_password = function(con, user, pass){
	/*
		Updates the password of the input user with the input password. Assumes user_name already exists.

		con - the connection object, expected to be connected already
		user - the user_name of the user that the password is getting updated
		pass - the new password being used

	*/
	hash = bcrypt.hashSync(pass, saltRounds);
	var sql = 'Update User SET credentials="'+hash+'" WHERE user_name="'+user+'";';
	con.query(sql);
};

methods.check_password = function(con, user, pass, next_func, passed_variables){
	/*
		Checks the input password from the input user with the database password for the user. Assumes the user already exists.

		con - the connection object, expected to be connected already
		user - the user_name of the user that the password is getting checked on
		pass - the input password to be checked
		next_func - the function that the async part of the function will call when it is done.

	*/
	var sql = "SELECT credentials FROM User WHERE user_name='"+user+"';";
	con.query(sql, function(err, result){
		if (err) throw err;
		next_func(bcrypt.compareSync(pass, result[0].credentials), passed_variables);
	});
};

methods.increment_test_taken_count = function(con, test_id){
	/*
		Increments the taken_count column for a specific test identified by test_id.

		con, the connection object, expected to be connected already
		test_id - the test_id of the test that is going to have its taken_count incremented
	*/
	var sql = "UPDATE Test SET taken_count = taken_count + 1 WHERE test_id='"+test_id+"';";
	con.query(sql, function(err, result){
		if (err) throw err;
	});
}


methods.get_questions = function(con, test_id, next_func, passed_variables){
	var sql = "SELECT * from Question WHERE test_id='"+test_id+"' ORDER BY question_ID";
	con.query(sql, function(err, result){
		if (err) throw err;
		next_func(result, passed_variables);
	});
}

methods.get_test_information = function(con, test_id, next_func, passed_variables){
	var sql = "SELECT * from Test WHERE test_id='"+test_id+"';";
	con.query(sql, function(err, result){
		if (err) throw err;
		next_func(result, passed_variables);
	});
}

methods.get_answer_information = function(con, user_name, question_id, next_func, passed_variables){
	var sql = "SELECT * from answers WHERE question_ID='"+question_id+"' AND user_name='"+user_name+"';";
	con.query(sql, function(err, result){
		if (err) throw err;
		next_func(result, passed_variables);
	});
};

methods.increment_color_count = function(con, hex_code, color){
	colors = ["red_count", "orange_count", "yellow_count", "green_count", "blue_count"];
	var sql = "UPDATE Color SET "+colors[color-1]+"="+colors[color-1]+"+1 WHERE hex_code='"+hex_code+"';";
	con.query(sql, function(err, result){
		if (err) throw err;
	});
}

methods.decrement_color_count = function(con, hex_code, color){
	colors = ["red_count", "orange_count", "yellow_count", "green_count", "blue_count"];
	var sql = "UPDATE Color SET "+colors[color-1]+"="+colors[color-1]+"-1 WHERE hex_code='"+hex_code+"';";
	con.query(sql, function(err, result){
		if (err) throw err;
	});
}

methods.get_correct_color = function(con, question_ID, next_func, passed_variables){

	var sql2 = "SELECT hex_code FROM Question WHERE question_ID="+question_ID+";";
	con.query(sql2, function(err, result){
		if (err) throw err;
		var sql = "SELECT * from Color WHERE hex_code='"+result.hex_code+"';";
		con.query(sql, function(err, result){
			if (err) throw err;

			red_count = result.red_count;
			orange_count = result.orange_count;
			yellow_count = result.yellow_count;
			green_count = result.green_count;
			blue_count = result.blue_count;
			correct_color = 1;
			correct_color_value = 0;
			counts = [red_count, orange_count, yellow_count, green_count, blue_count]
			for (var i = 0; i < counts.length; i++){
				if (correct_color_value < counts[i]){
					correct_color_value = counts[i];
					correct_color = i+1;
				};
			}
			next_func(correct_color, passed_variables);
		});
	});
};

methods.new_answer = function(con, user_name, question_id, color_chosen, correct_color){
	var sql = "INSERT INTO answers(color_chosen, correct_color, user_name, question_ID) VALUES ("+color_chosen+","+correct_color+",'"+user_name+"',"+question_id+");";
	var sql2 = "SELECT hex_code FROM Question WHERE question_ID="+question_id+";";
	con.query(sql, function(err, result){
		if (err) throw err;
	});
	con.query(sql2, function(err, result){
		if (err) throw err;
		methods.increment_color_count(con, result[0].hex_code, color_chosen);
	});
}

methods.update_answer = function(con, user_name, question_id, color_chosen, correct_color){
	var sql = "UPDATE answers SET color_chosen="+String(color_chosen)+", correct_color="+correct_color+" WHERE user_name='"+user_name+"' AND question_id="+question_id+";";
	var sql2 = "SELECT hex_code FROM Question WHERE question_ID="+question_id+";";
	var sql3 = "SELECT color_chosen FROM answers WHERE question_ID="+question_id+" AND user_name='"+user_name+"';";
	con.query(sql2, function(err, result){
		if (err) throw err;
		var hex_code = result[0].hex_code;
		con.query(sql3, function(err, result2){
			methods.decrement_color_count(con, hex_code, result2[0].color_chosen);
		});

		con.query(sql, function(err, result){
			if (err) throw err;
		});

		con.query(sql2, function(err, result){
			if (err) throw err;
			methods.increment_color_count(con, result[0].hex_code, color_chosen);
		});

	});
};


methods.get_colorcount = function(con, hex_code, next_func, passed_variables){
	var sql = "SELECT red_count, orange_count, yellow_count, green_count, blue_count from Color WHERE hex_code='"+hex_code+"';";

	con.query(sql, function(err, result){
		if (err) throw err;
		next_func(result, passed_variables);
	});
}

/* Create test tools */

methods.create_test = function (res, con, req) {
	var colors 			= req.body.colors;
	var testName 		= req.body.testName;
	var testSummary	= req.body.testSummary;
	var testNum			= req.body.testNum;
	var username		= req.body.username;

	var sqlCreate = "INSERT INTO Test (summary, number_of_questions, name, user_name) " +
									"VALUES ('" + testSummary + "', '" + testNum + "', '" + testName + "', '" + username + "');";

	console.log(sqlCreate);
	var hey;
	con.query(sqlCreate, function(err, result){
		// console.log(result);
		if (err) throw err;
		create_test_testID (res, con, colors, username, testName);
	});
}

// find the test id that was just created
function create_test_testID (res, con, colors, username, testName) {
	var sql = "SELECT `test_ID` FROM `Test` WHERE `user_name`='"+ username +"' AND `name`='"+ testName +"';";
	console.log(sql);

	for (i = 0; i < colors.length; i++) {
		//remove extra character from front of string
		colors[i] = colors[i].slice(1,colors[i].length);
	}
	con.query(sql, function (err, result) {
		// using result[result.length - 1] pulls the most recent version
		var test_ID = result[result.length - 1];
		search_test_colors(con, colors).then(finish());

	});
}

// run through all the colors
async function search_test_colors (con,colors) {
	console.log("\nCOLORS==================================\n");
	for (let i = 0; i < colors.length; i++) {
		await color_insert(con,colors[i]);
	}
}

// query database
async function color_insert (con, color) {
	var sql = "INSERT INTO `Color` (`hex_code`) VALUES ('"+ color +"');\n";
	console.log(sql);
	await con.query(sql, function (err) {
		if (err)
			if (err.errno == 1062) 	console.log(color + " is already in database");		// if color is already in database
			else 										console.log(err);																	// any other error

		else {
			console.log(color + " entered into database");															// Success!
			return 1;
		}
	});
}


function finish () {
	console.log("END2");
}


/* Create account connection_tool*/

methods.create_userA = function (res, con, name, pass, date, sex) {
	methods.check_user_name (con, name, methods.create_userB, {"res":res, "con":con,"name":name,"pass":pass,"date":date,"sex":sex});
};

methods.create_userB = function (exists, list) {
	if (!exists) {
		var sexI;
		if 			(list.sex == 'male') 		sexI = 0;
		else if (list.sex == 'female') 	sexI = 1;
		else 														sexI = null;

		hash = bcrypt.hashSync(list.pass, saltRounds);

		var sqlEnter =	"INSERT INTO User (user_name, credentials, birth_date, sex) " +
											"VALUES ('" + list.name + "', '" + hash + "', '" + list.date + "', " + sexI + ");";
		console.log(sqlEnter);
		con.query(sqlEnter);

		console.log("Sending success");
		list.res.status(200).send("success");
		console.log("Sent");
	}
	else {
		console.log("INSERT failed; Username already exists");
		list.res.status(200).send("exists");
	}
};


module.exports = methods;
