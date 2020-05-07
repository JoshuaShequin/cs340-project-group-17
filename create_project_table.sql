CREATE TABLE User
(
  user_name varchar(25) NOT NULL,
  credentials int(11) NOT NULL,
  birth_date DATE NOT NULL,
  sex TINYINT(1),
  PRIMARY KEY (user_name)
);

CREATE TABLE Test
(
  test_ID INT(11) NOT NULL AUTO_INCREMENT,
  summary TEXT NOT NULL,
  number_of_questions INT(11) NOT NULL,
  name varchar(255) NOT NULL,
  user_name varchar(25),
  taken_count int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (test_ID),
  FOREIGN KEY (user_name) REFERENCES User(user_name)
);

CREATE TABLE Color
(
  hex_code varchar(6) NOT NULL,
  red_count INT(11) NOT NULL DEFAULT 0,
  orange_count INT(11) NOT NULL DEFAULT 0,
  yellow_count INT(11) NOT NULL DEFAULT 0,
  green_count INT(11) NOT NULL DEFAULT 0,
  blue_count INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (hex_code)
);

CREATE TABLE Question
(
  question_ID INT(11) NOT NULL AUTO_INCREMENT,
  hex_code INT(11) NOT NULL,
  test_ID INT(11),
  PRIMARY KEY (question_ID),
  FOREIGN KEY (hex_code) REFERENCES Color(hex_code),
  FOREIGN KEY (test_ID) REFERENCES Test(test_ID)
);

CREATE TABLE takes
(
  date_taken DATE NOT NULL,
  user_name varchar(25) NOT NULL,
  test_ID INT(11) NOT NULL,
  PRIMARY KEY (user_name, test_ID),
  FOREIGN KEY (user_name) REFERENCES User(user_name),
  FOREIGN KEY (test_ID) REFERENCES Test(test_ID)
);

CREATE TABLE answers
(
  color_chosen INT(11) NOT NULL,
  correct_color INT(11) NOT NULL,
  username varchar(25) NOT NULL,
  question_ID INT(11) NOT NULL,
  PRIMARY KEY (username, question_ID),
  FOREIGN KEY (username) REFERENCES User(user_name),
  FOREIGN KEY (question_ID) REFERENCES Question(question_ID)
);

