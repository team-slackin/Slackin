SELECT 
user_id,
email,
user_display_name,
first_name,
last_name, 
user_image, 
user_status 
FROM users 
WHERE users.email = $1;