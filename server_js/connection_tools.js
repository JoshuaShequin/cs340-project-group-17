var mysql = require('mysql');
var bcrypt = require('bcrypt');

const saltRounds = 10;

var methods = {};

methods.create_connection = function(){
	var con = mysql.createConnection({
	//   host: "127.0.0.1",
	//   user: "root",
	//   password: "root",
	//   database: "color_test_testing"
	  host: "classmysql.engr.oregonstate.edu",
	  user: "cs340_condreab",
	  password: "Yoshi40@@",
	  database: "cs340_condreab"
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

methods.alter_username = function(con, user, pass, olduser){
	hash = bcrypt.hashSync(pass, saltRounds);
	var sql = 'Update User SET user_name="'+user+'" WHERE user_name="'+olduser+'";';
	con.query(sql, function(err, result){
		if (err) throw err;
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
		con.query(sqlEnter);

		list.res.status(200).send("success");
	}
	else {
		list.res.status(200).send("exists");
	}
};

methods.delete_user = function(con, user_name){
	sql = "DELETE FROM User WHERE user_name='"+user_name+"';";
	con.query(sql);
};

// a universal find_test_ID from various parameters (additive)
methods.find_test_id = function(con, test_ID, summary, number_of_questions, name, user_name, next_func, passed_variables) {
	// create sql queries for all, in the case which user can decide how to search
	var sql = "SELECT test_ID FROM Test WHERE testID="+toString(test_ID)+";";
	var sql2 = "SELECT test_ID FROM Test LIKE summary=%"+summary+"%;";
	var sql3 = "SELECT test_ID FROM Test WHERE number_of_questions="+toString(number_of_questions)+";";
	var sql4 = "SELECT test_ID FROM Test WHERE name="+name+";";
	var sql5 = "SELECT test_ID FROM Test WHERE user_name="+user_name+";";

	let complete_set = new Set();

	// test id
	if (test_ID) {
		con.query(sql, function(err, result) {
			if (err) throw err;
			result.forEach(complete_set.add, complete_set);
		});
	};
	// summary
	if (summary) {
		con.query(sql2, function (err, result) {
			if (err) throw err;
			result.forEach(complete_set.add, complete_set);
		});
	};
	// number of questions 
	if (number_of_questions) {
		con.query(sql3, function(err, result) {
			if (err) throw err;
			result.forEach(complete_set.add, complete_set);
		})
	};
	// name
	if (number_of_questions) {
		con.query(sql4, function(err, result) {
			if (err) throw err;
			result.forEach(complete_set.add, complete_set);
		})
	};
	// user_name
	if (number_of_questions) {
		con.query(sql5, function(err, result) {
			if (err) throw err;
			result.forEach(complete_set.add, complete_set);
		})
	};
	next_func([...complete_set], passed_variables);
};

// popular test all tests
methods.find_popular_tests = function(con, next_func, passed_variables) {
	var sql = "SELECT test_ID, summary, number_of_questions, name, user_name, taken_count " +
	"FROM Test " +
	"ORDER BY taken_count DESC";
	con.query(sql, function(err, result) {
		if (err) throw err;
		next_func(result, passed_variables);
	});
}

// find recent taken by user tests
methods.find_recent_tests_taken = function(con, user_name, next_func, passed_variables) {
	// based on the username
	var sql = "SELECT test_ID, summary, number_of_questions, name, user_name, taken_count " +
	"FROM Test " + 
	"INNER JOIN takes ON Test.test_ID==takes.test_ID " +
	"INNER JOIN  User ON takes.user_name==User.user_name " +
	"WHERE (User.user_name == "+user_name+")" +
	"ORDER BY takes.date_taken DESC";
	con.query(sql, function(err, result) {
		if (err) throw err;
		next_func(result, passed_variables);
	})
}

// find recent tests made
methods.find_recent_tests_made = function(con, next_func, passed_variables) {
	var sql = "SELECT test_ID, summary, number_of_questions, name, user_name, taken_count " +
	"FROM Test " + 
	"INNER JOIN takes ON Test.test_ID==takes.test_ID " +
	"ORDER BY takes.date_taken DESC";
	con.query(sql, function(err, result) {
		if (err) throw err;
		next_func(result, passed_variables);
	})
}

methods.get_tests = function(con, user_name, next_func, passed_variables){
	sql = "SELECT * FROM test WHERE user_name='"+user_name+"';"
	con.query(sql, function(err, result){
		if (err) throw err;
		next_func(result, passed_variables);
	});
};

methods.update_test_information = function(con, user_name, test_id, test_name, test_summary){
	sql = "UPDATE test SET name='"+test_name+"' WHERE test_id="+test_id+" AND user_name='"+user_name+"';";
	sql2 = "UPDATE test SET summary='"+test_summary+"' WHERE test_id="+test_id+" AND user_name='"+user_name+"';";
	con.query(sql, function(err, result){
		if (err) throw err;
	});
	con.query(sql2, function(err, result){
		if (err) throw err;
	});
};



module.exports = methods;
