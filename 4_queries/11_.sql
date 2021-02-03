SELECT day, count(name) as name, sum(duration) as duration
FROM assignments
GROUP BY day
ORDER BY day;