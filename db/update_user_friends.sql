UPDATE friends 
  SET room_created = true
  WHERE friends.friend_id = $1 
    AND friends.user_id = $2;