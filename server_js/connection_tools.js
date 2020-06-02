var mysql = require('mysql');
var bcrypt = require('bcrypt');

const saltRounds = 10;

var methods = {};

methods.create_connection = function(){
	var con = mysql.createConnection({
		host: "classmysql.engr.oregonstate.edu",
		user: "cs340_shequinj",
		password: "9379",
		database: "cs340_shequinj"
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
	var sql = 'Update user SET credentials="'+hash+'" WHERE user_name="'+user+'";';
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
	var sql = "SELECT credentials FROM user WHERE user_name='"+user+"';";
	con.query(sql, function(err, result){
		if (err) throw err;
		next_func(bcrypt.compareSync(pass, result[0].credentials), passed_variables);
	});
};


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
