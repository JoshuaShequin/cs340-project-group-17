-- User
INSERT INTO `User` (`user_name`, `credentials`, `birth_date`, `sex`)
VALUES
  ('mary meh', 'maryedForLife', '1999-10-07', 0),
  ('joe king', 'realJoker', '1920-12-22', NULL),
  ('don keigh', 'shrek', '2001-04-22', 0),
  ('dinah mite', 'boom', '1860-06-17', 1),
  ('horace cope', 'imascorpio', '2001-11-17', 1),
  ('jim nasium', 'doyouevenlift', '1995-01-18', 0),
  ('kay oss', 'goCrazy', '1990-10-31', NULL),
  ('jay walker', 'watchfopopo', '1981-04-20', 1),
  ('quill thecat', 'grass', '2019-04-23', 0),
  ('anita room', 'plzhelp', '1974-08-16', NULL);

-- Tests
INSERT INTO `Test` (`summary`, `number_of_questions`, `name`, `user_name`)
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
INSERT INTO `Color` (`hex_code`)
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
INSERT INTO `Question` (`hex_code`, `test_ID`)
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

-- FK: username, Question_ID
INSERT INTO answers(color_chosen, correct_color, username, question_ID)
  ('6600ff', 'ff0000', 'mary meh', 4),
  ('99cc00', '99cc00', 'joe king', 4),
  ('6600ff', '6600ff', 'don keigh', 4),
  ('ccff33', '3333ff', 'don keigh', 4),
  ('6600ff', '99cc00', 'quill thecat', 2),
  ('6600ff',  'ff0000', 'kay oss', 6),
  ('6600ff', '66ccff', 'jay walker', 2),
  ('6600ff', '6600ff', 'anita room', 4),
  ('ccff33',  'ff0000', 'anita room', 4),
  ('6600ff', '3333ff', 'jim nasium', 10);

-- FK: user_name, test_ID
INSERT INTO takes(date_taken, user_name, test_ID)
  ('2004-02-04', 'mary meh', '1999-10-07', 4),
  ('2005-05-02', 'joe king', '1920-12-22', 1),
  ('2004-01-04', 'don keigh', '2001-04-22', 7),
  ('2020-02-05', 'dinah mite', '1860-06-17', 1),
  ('1999-02-02', 'horace cope', '2001-11-17', 1),
  ('2005-05-02', 'jim nasium', '1995-01-18', 1),
  ('2019-11-27', 'kay oss', '1990-10-31', 2),
  ('2020-01-01', 'jay walker', '1981-04-20', 5),
  ('2000-04-21', 'quill thecat', '2019-04-23', 5),
  ('2004-01-06', 'anita room', '1974-08-16', 2);
