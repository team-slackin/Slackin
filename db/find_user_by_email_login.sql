update users
set user_status = 'online'
where users.email = $1;

SELECT * FROM users
WHERE users.email = $1;