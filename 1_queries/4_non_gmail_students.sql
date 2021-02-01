SELECT name, id, email, cohort_id, phone
FROM students
WHERE email NOT LIKE '%gmail.com' 
OR phone IS NULL;
