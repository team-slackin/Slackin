select users.fav_color, users.user_id, users.email, users.user_display_name, users.first_name, users.last_name, users.user_image, users.user_status from users
join user_channels on user_channels.user_id = users.user_id
where user_channels.channel_id = $1;