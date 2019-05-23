select channels.channel_id, channel_creator, channel_name, channel_image from channels
join user_channels on channels.channel_id = user_channels.channel_id
join users on users.user_id = user_channels.user_id
where users.user_id = $1;