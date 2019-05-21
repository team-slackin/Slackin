select 
  friends.friend_id, 
  users.email, 
  users.first_name, 
  users.last_name, 
  users.user_display_name, 
  users.user_image, 
  users.user_status, 
  friends.room_created,
  friends.friends_chatkit_id
from users
join friends 
  on users.user_id = friends.friend_id
where friends.user_id = $1;