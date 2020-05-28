var mysql = require('mysql');
var bcrypt = require('bcrypt');

const saltRounds = 10;

var methods = {};

methods.create_connection = function(){
	var con = mysql.createConnection({
	  host: "127.0.0.1",
	  user: "root",
	  password: "root",
	  database: "color_test_testing"
	});
	con.connect(function(err){
		if (err) throw err;
	});
	return con;
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

methods.check_password = function(con, user, pass, next_func){
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
		next_func(bcrypt.compareSync(pass, result[0].credentials));
	});
};



module.exports = methods;
