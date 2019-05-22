UPDATE friends 
  SET chatkit_id = $1
  WHERE friends.friend_id = $4
    AND friends.user_id = $5;

UPDATE friends 
  SET chatkit_name = $2
  WHERE friends.friend_id = $4
    AND friends.user_id = $5;

UPDATE friends 
  SET chatkit_private = $3
  WHERE friends.friend_id = $4
    AND friends.user_id = $5;

UPDATE friends 
  SET chatkit_id = $1
  WHERE friends.friend_id = $5
    AND friends.user_id = $4;

UPDATE friends 
  SET chatkit_name = $2
  WHERE friends.friend_id = $5
    AND friends.user_id = $4;

UPDATE friends 
  SET chatkit_private = $3
  WHERE friends.friend_id = $5
    AND friends.user_id = $4;