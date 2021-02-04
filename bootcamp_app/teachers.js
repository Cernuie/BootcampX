const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(
`
SELECT teachers.name as teacher, cohorts.name as cohorts
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = 'JUL02'
GROUP BY teachers.name,cohorts.name
ORDER BY teacher;
`)
.then(res => {
  res.rows.forEach(cohort => {
    console.log(`${cohort.cohorts}: ${cohort.teacher}`)
  })
}) .catch(err => console.error('query error', err.stack));