insert into channels (
    channel_creator,
    channel_name,
    channel_is_private,
    channel_image
) values (
    $1,
    $2,
    $3,
    'https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/chat-circle-blue-512.png'
);

select * from channels
where channel_creator = $1 and channel_name = $2;

