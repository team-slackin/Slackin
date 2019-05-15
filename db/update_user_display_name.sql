update users
set user_display_name = $2
where user_id = $1;