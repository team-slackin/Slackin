INSERT INTO users(email, hash, user_display_name, first_name, last_name, user_image, user_status) 
VALUES($1,$2,$3,$4,$5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE8KtKj_zXIxHEt7KjVWuUdjfq_WNbfMf5x3AGaPfkW6iSplZI', 'online');

SELECT user_id, email, user_display_name, first_name, last_name, user_image, user_status FROM users
WHERE users.email = $1;
