CREATE TABLE `gender` (
  `gender_id` int PRIMARY KEY,
  `gender_name` varchar(255)
);

CREATE TABLE `cities` (
  `city_id` int PRIMARY KEY,
  `city_name` varchar(255)
);

CREATE TABLE `states` (
  `state_id` int PRIMARY KEY,
  `state_name` varchar(255)
);

CREATE TABLE `address` (
  `address_id` int PRIMARY KEY,
  `house_number` varchar(255),
  `address_description` varchar(255),
  `city_id` int,
  `state_id` int,
  `pincode` int
);

CREATE TABLE `students` (
  `student_id` int PRIMARY KEY AUTO_INCREMENT,
  `full_name` varchar(255),
  `gender_id` int,
  `semester` int,
  `address_id` int
);

CREATE TABLE `categories` (
  `category_id` int PRIMARY KEY,
  `category_name` varchar(255)
);

CREATE TABLE `courses` (
  `course_id` int PRIMARY KEY,
  `course_name` varchar(255),
  `course_description` varchar(255),
  `course_rating` int,
  `course_durtaion` int,
  `course_start_date` date
);

CREATE TABLE `courses_categories` (
  `course_id` int,
  `category_id` int,
  PRIMARY KEY (`course_id`, `category_id`)
);

CREATE TABLE `students_courses` (
  `student_id` int,
  `course_id` int,
  PRIMARY KEY (`student_id`, `course_id`)
);

ALTER TABLE `students` ADD FOREIGN KEY (`gender_id`) REFERENCES `gender` (`gender_id`);

ALTER TABLE `students` ADD FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`);

ALTER TABLE `address` ADD FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`);

ALTER TABLE `address` ADD FOREIGN KEY (`state_id`) REFERENCES `states` (`state_id`);

ALTER TABLE `courses_categories` ADD FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

ALTER TABLE `courses_categories` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

ALTER TABLE `students_courses` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `students_courses` ADD FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

