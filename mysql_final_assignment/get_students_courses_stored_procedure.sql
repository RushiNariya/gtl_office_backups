CREATE DEFINER=`root`@`localhost` PROCEDURE `universitydb`.`get_courses_students`(in category varchar(30))
begin
	
DECLARE CategoryCount int;
	DECLARE CourseCountForCategory int;

	DECLARE category_not_found condition for sqlstate '02000';
	DECLARE courses_not_found CONDITION FOR SQLSTATE '02001';

	DECLARE EXIT HANDLER FOR SQLEXCEPTION SELECT 'SQLException encountered' Message; 
    DECLARE EXIT HANDLER FOR SQLSTATE '23000' SELECT 'SQLSTATE 23000' ErrorCode;
   	DECLARE EXIT HANDLER for category_not_found select 'Category Name does not exist.' as message;
    declare exit HANDLER for courses_not_found
	select
	'No courses found for this Category' as Message;

   	select Count(*) into CategoryCount from categories where category_name = category;
   
   	if CategoryCount = 0 then
		signal category_not_found;
	END IF;

	if CourseCountForCategory = 0 then signal courses_not_found;
	ELSE
		select co.course_name as course,
		ifnull(group_concat(distinct st.full_name), 'No students enrolled') as students
		from courses_categories cc
		left join courses co on cc.course_id = co.course_id
		join categories ca on cc.category_id = ca.category_id
		and ca.category_name = category left join students_courses stco on
		cc.course_id = stco.course_id left join students st on
		stco.student_id = st.student_id group by co.course_name;
	
end if;

END