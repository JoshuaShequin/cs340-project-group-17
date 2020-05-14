-- Create tables
CREATE TABLE User
(
  user_name varchar(25) NOT NULL,
  credentials varchar(64) NOT NULL,
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
  hex_code varchar(6) NOT NULL,
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
  color_chosen int(6) NOT NULL,
  correct_color int(6) NOT NULL,
  user_name varchar(25) NOT NULL,
  question_ID INT(11) NOT NULL,
  PRIMARY KEY (user_name, question_ID),
  FOREIGN KEY (user_name) REFERENCES User(user_name),
  FOREIGN KEY (question_ID) REFERENCES Question(question_ID)
);


-- User
INSERT INTO User ('user_name', 'credentials', 'birth_date', 'sex')
VALUES
  ('mary meh', '1', '1999-10-07', 0),
  ('joe king', '2', '1920-12-22', NULL),
  ('don keigh', '3', '2001-04-22', 0),
  ('dinah mite', '3', '1860-06-17', 1),
  ('horace cope', '4', '2001-11-17', 1),
  ('jim nasium', '6', '1995-01-18', 0),
  ('kay oss', '5', '1990-10-31', NULL),
  ('jay walker', '7', '1981-04-20', 1),
  ('quill thecat', '8', '2019-04-23', 0),
  ('anita room', '9', '1974-08-16', NULL);

-- Tests
INSERT INTO Test ('summary', 'number_of_questions', 'name', 'user_name')
VALUES
  ('test zero test', 1, 't0', 'mary meh'),
  ('test one test',  1, 't1', 'joe king'),
  ('test two test',  1, 't2', 'don keigh'),
  ('test three test',1, 't3', 'dinah mite'),
  ('test four test', 1, 't4', 'horace cope'),
  ('test five test', 1, 't5', 'jim nasium'),
  ('test six test',  1, 't6', 'kay oss'),
  ('test seven test',1, 't7', 'jay walker'),
  ('test eight test',1, 't8', 'quill thecat'),
  ('test nine test', 1, 't9', 'anita room');

-- Color
INSERT INTO Color ('hex_code')
VALUES
  ('ff0000'),
  ('ff9933'),
  ('66ff99'),
  ('ccff33'),
  ('66ccff'),
  ('33cccc'),
  ('99cc00'),
  ('ff5050'),
  ('6600ff'),
  ('3333ff');

-- Question
INSERT INTO Question ('hex_code', 'test_ID')
VALUES
  ('ff0000', 1),
  ('ff9933', 2),
  ('66ff99', 3),
  ('ccff33', 4),
  ('66ccff', 5),
  ('33cccc', 6),
  ('99cc00', 7),
  ('ff5050', 8),
  ('6600ff', 9),
  ('3333ff', 10);

-- FK: user_name, Question_ID
INSERT INTO answers (color_chosen, correct_color, user_name, question_ID)
VALUES
  (1, 2, 'mary meh', 4),
  (2, 2, 'joe king', 4),
  (3, 1, 'don keigh', 4),
  (4, 4, 'don keigh', 2),
  (5, 1, 'quill thecat', 2),
  (1,  5, 'kay oss', 6),
  (2, 2, 'jay walker', 2),
  (3, 1, 'anita room', 4),
  (4,  4, 'anita room', 7),
  (5, 3, 'jim nasium', 10);

-- FK: user_name, test_ID
INSERT INTO takes (date_taken, user_name, test_ID)
VALUES
  ('2004-02-04', 'mary meh', 4),
  ('2005-05-02', 'joe king',  1),
  ('2004-01-04', 'don keigh', 7),
  ('2020-02-05', 'dinah mite',1),
  ('1999-02-02', 'horace cope', 1),
  ('2005-05-02', 'jim nasium', 1),
  ('2019-11-27', 'kay oss', 2),
  ('2020-01-01', 'jay walker', 5),
  ('2000-04-21', 'quill thecat', 5),
  ('2004-01-06', 'anita room', 2);



-- get tests the user has created
SELECT name from Test
WHERE user_name = '$user_name';

-- get top 5 taken tests
SELECT name from Test
ORDER BY taken_count DESC
LIMIT 5;

-- get 5 most recently taken test_IDs by user
SELECT test_ID from takes
WHERE user_name = '$user_name'
ORDER BY date_taken DESC
LIMIT 5;

-- get the tests names from the above query
SELECT name from Test
WHERE test_ID = '$test_ID';


-- check if a user_name is already taken
SELECT user_name FROM User
WHERE user_name = '$user_name';

-- create the new user
INSERT INTO User VALUES ('$user_name', '$hashedInputPassword', '$birthdate', '$sex');

-- see if password hashes match
SELECT user_name FROM User
WHERE credentials = '$hashedInputPassword'

-- create a new test
INSERT INTO Test (name, summary, number_of_questions, user_name) VALUES('$name', '$summary', '$numQuestions', '$user_name');

-- see if color exists
SELECT hex_code FROM Color
WHERE hex_code = '$hex_code';

-- create a color object
INSERT INTO Color (hex_code) VALUES ('$hex_code');

-- create a question object
INSERT INTO Question (hex_code, test_ID) VALUES ('$hex_code', '$test_ID');

-- find tests with a specific color as a question
SELECT test_ID FROM Question
WHERE hex_code = "$hex_code";

-- get test based on test_ID
SELECT * from Test
where test_ID  = "$test_ID";

-- find tests with a specific substring in the name
SELECT * from Test
where name like "$subString";

-- find tests with a specific substring in the summary
SELECT * from Test
where summary like "$subString";

-- grab information on the test we are managing
SELECT * from Test
WHERE test_ID = '$test_ID';

-- update test
UPDATE Test
SET name = '$inputName', summary = '$inputSummary', number_of_questions = '$numQuestions'
WHERE test_ID = '$test_ID';

-- delete test
DELETE FROM Test
WHERE test_ID = '$test_ID';

-- delete user
DELETE FROM User
WHERE user_name = '$user_name';

-- new questions created, don't update old questions to maintain continuity with user responses.
INSERT INTO Question (hex_code, test_ID) VALUES ('$hex_code', '$test_ID');

-- update question to NULL out test_ID if it is no longer a part of the test
UPDATE Question
SET test_ID = NULL
WHERE test_ID = '$test_ID';

-- count the number of times a user has picked a specific color on all questions
SELECT a.color_chosen, COUNT(u.user_name) AS 'Number_of_times_chosen'
FROM answers AS a
INNER JOIN user AS u ON a.user_name=u.user_name
WHERE (u.user_name='$user_name')
GROUP BY a.color_chosen;

-- function for the correct color from a hex_code
DELIMITER $$


CREATE FUNCTION correct_color (hex_color VARCHAR(6))
RETURNS INT

BEGIN
    declare highest_color_chosen INT DEFAULT 1;
    declare testing_color INT(11) DEFAULT 11;
    declare r_count, o_count, y_count, g_count, b_count INT(11) DEFAULT 1;

    SELECT red_count INTO r_count FROM Color WHERE hex_code = hex_color;
    if r_count > testing_color THEN
        SET highest_color_chosen = 1;
        SET testing_color = r_count;
    end if;
    SELECT orange_count INTO o_count FROM Color WHERE hex_code = hex_color;
    if o_count > testing_color THEN
        SET highest_color_chosen = 2;
        SET testing_color = o_count;
    end if;

    SELECT yellow_count INTO y_count FROM Color WHERE hex_code = hex_color;
    if y_count > testing_color THEN
        SET highest_color_chosen = 3;
        SET testing_color = y_count;
    end if;

    SELECT green_count INTO g_count FROM Color WHERE hex_code = hex_color;
    if g_count > testing_color THEN
        SET highest_color_chosen = 4;
        SET testing_color = g_count;
    end if;
    SELECT blue_count INTO b_count FROM Color WHERE hex_code = hex_color;
    if b_count > testing_color THEN
        SET highest_color_chosen = 5;
    end if;

    return highest_color_chosen;

END$$
