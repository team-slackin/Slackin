INSERT INTO users(email, hash, user_display_name, first_name, last_name, user_image, user_status) 
VALUES($1,$2,$3,$4,$5, 'default', 'online');

SELECT email, user_display_name, first_name, last_name, user_image, user_status FROM users
WHERE users.email = $1;
