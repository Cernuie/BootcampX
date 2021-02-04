const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
// Store all potentially malicious values in an array. 
const values = [cohortName];


const queryStr = `
SELECT teachers.name as teacher, cohorts.name as cohorts, count(assistance_requests) as total_assistances
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
GROUP BY teachers.name,cohorts.name
ORDER BY teacher;
`
pool.query(queryStr, values)
.then(res => {
  res.rows.forEach(cohort => {
    console.log(`${cohort.cohorts}: ${cohort.teacher}`)
  })
}) .catch(err => console.error('query error', err.stack));