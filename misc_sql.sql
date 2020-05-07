
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

-- new questions created, don't update old questions to maintain continuity with user responses.
INSERT INTO Question (hex_code, test_ID) VALUES ('$hex_code', '$test_ID');

-- update question to NULL out test_ID if it is no longer a part of the test
UPDATE Question
SET test_ID = NULL
WHERE test_ID = '$test_ID';