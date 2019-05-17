update users
set user_status = $2
where user_id = $1;