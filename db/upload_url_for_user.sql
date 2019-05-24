update users
set user_image = $1
where user_id = $2;

SELECT user_id, email, user_display_name, first_name, last_name, user_image, user_status FROM users
WHERE users.user_id = $2;