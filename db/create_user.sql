INSERT INTO users(email, hash, user_display_name, first_name, last_name, user_image, user_status) 
VALUES($1,$2,$3,$4,$5, 'http://team.slackin.s3.amazonaws.com/ecb7b10e-297f-4fe9-8e31-9f3cc0552f8c-monkey-logo.png', 'online');

SELECT user_id, email, user_display_name, first_name, last_name, user_image, user_status FROM users
WHERE users.email = $1;
