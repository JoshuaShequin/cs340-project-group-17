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
  ('test zero test', 1, 't0', (SELECT `user_name` FROM `User` WHERE `user_name` = 'mary meh')),
  ('test one test',  1, 't1', (SELECT `user_name` FROM `User` WHERE `user_name` = 'joe king')),
  ('test two test',  1, 't2', (SELECT `user_name` FROM `User` WHERE `user_name` = 'don keigh')),
  ('test three test',1, 't3', (SELECT `user_name` FROM `User` WHERE `user_name` = 'dinah mite')),
  ('test four test', 1, 't4', (SELECT `user_name` FROM `User` WHERE `user_name` = 'horace cope')),
  ('test five test', 1, 't5', (SELECT `user_name` FROM `User` WHERE `user_name` = 'jim nasium')),
  ('test six test',  1, 't6', (SELECT `user_name` FROM `User` WHERE `user_name` = 'kay oss')),
  ('test seven test',1, 't7', (SELECT `user_name` FROM `User` WHERE `user_name` = 'jay walker')),
  ('test eight test',1, 't8', (SELECT `user_name` FROM `User` WHERE `user_name` = 'quill thecat')),
  ('test nine test', 1, 't9', (SELECT `user_name` FROM `User` WHERE `user_name` = 'anita room'));

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
  ((SELECT `hex_code` FROM `Color` WHERE `hex_code` = 'ff0000'), 1),
  ((SELECT `hex_code` FROM `Color` WHERE `hex_code` = 'ff9933'), 2),
  ((SELECT `hex_code` FROM `Color` WHERE `hex_code` = '66ff99'), 3),
  ((SELECT `hex_code` FROM `Color` WHERE `hex_code` = 'ccff33'), 4),
  ((SELECT `hex_code` FROM `Color` WHERE `hex_code` = '66ccff'), 5),
  ((SELECT `hex_code` FROM `Color` WHERE `hex_code` = '33cccc'), 6),
  ((SELECT `hex_code` FROM `Color` WHERE `hex_code` = '99cc00'), 7),
  ((SELECT `hex_code` FROM `Color` WHERE `hex_code` = 'ff5050'), 8),
  ((SELECT `hex_code` FROM `Color` WHERE `hex_code` = '6600ff'), 9),
  ((SELECT `hex_code` FROM `Color` WHERE `hex_code` = '3333ff'), 10);
