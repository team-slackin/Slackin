update users
set user_status = 'offline'
where users.user_id = $1;