args = process.argv.slice(2);

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryObj =
`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts on cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`


const cohortName = args[0];
const limit = args[1] || 5;
const values = [`%${cohortName}%`, limit];

pool.query(queryObj, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
})
