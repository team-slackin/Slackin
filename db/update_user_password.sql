update users
set hash = $2
where user_id = $1;