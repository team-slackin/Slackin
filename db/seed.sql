CREATE TABLE Users (
    user_id serial NOT NULL,
    email varchar(80) NOT NULL UNIQUE,
    hash TEXT NOT NULL,
    user_display_name varchar(80) NOT NULL,
    first_name varchar(80) NOT NULL,
    last_name varchar(80) NOT NULL,
    user_image TEXT NOT NULL,
    user_status varchar(80) NOT NULL,
    CONSTRAINT Users_pk PRIMARY KEY (user_id)
);
CREATE TABLE Friends (
    friends_id serial NOT NULL,
    user_id int NOT NULL,
    friend_id int NOT NULL,
    CONSTRAINT Friends_pk PRIMARY KEY (friends_id)
);
CREATE TABLE Friends_messages (
    friend_messages_id serial NOT NULL,
    friends_id int NOT NULL,
    user_id int NOT NULL,
    date_posted TEXT NOT NULL,
    message TEXT NOT NULL,
    CONSTRAINT Friends_messages_pk PRIMARY KEY (friend_messages_id)
);
CREATE TABLE Channels (
    channel_id serial NOT NULL,
    channel_creator int NOT NULL,
    channel_name varchar(80) NOT NULL,
    channel_image TEXT NOT NULL,
    CONSTRAINT Channels_pk PRIMARY KEY (channel_id)
);
CREATE TABLE Sub_channels (
    sub_channel_id serial NOT NULL,
    channel_id int NOT NULL,
    sub_channel_name varchar(80) NOT NULL,
    CONSTRAINT Sub_channels_pk PRIMARY KEY (sub_channel_id)
);
CREATE TABLE Sub_channel_messages (
    sub_channel_id serial NOT NULL,
    user_id int NOT NULL,
    messages TEXT NOT NULL,
    date_posted TEXT NOT NULL,
    CONSTRAINT Sub_channel_messages_pk PRIMARY KEY (sub_channel_id)
);
CREATE TABLE User_channels (
    user_channels_id serial NOT NULL,
    user_id int NOT NULL,
    channel_id int NOT NULL,
    CONSTRAINT User_channels_pk PRIMARY KEY (user_channels_id)
);
CREATE TABLE Sub_channel_group (
    channel_id int NOT NULL,
    sub_channel_id int NOT NULL,
    sub_channel_group_name varchar(80) NOT NULL,
    CONSTRAINT Sub_channel_group_pk PRIMARY KEY (channel_id)
);
ALTER TABLE Friends ADD CONSTRAINT Friends_fk0 FOREIGN KEY (user_id) REFERENCES Users(user_id);
ALTER TABLE Friends ADD CONSTRAINT Friends_fk1 FOREIGN KEY (friend_id) REFERENCES Users(user_id);
ALTER TABLE Friends_messages ADD CONSTRAINT Friends_messages_fk0 FOREIGN KEY (friends_id) REFERENCES Friends(friends_id);
ALTER TABLE Friends_messages ADD CONSTRAINT Friends_messages_fk1 FOREIGN KEY (user_id) REFERENCES Users(user_id);
ALTER TABLE Channels ADD CONSTRAINT Channels_fk0 FOREIGN KEY (channel_creator) REFERENCES Users(user_id);
ALTER TABLE Sub_channels ADD CONSTRAINT Sub_channels_fk0 FOREIGN KEY (channel_id) REFERENCES Channels(channel_id);
ALTER TABLE Sub_channel_messages ADD CONSTRAINT Sub_channel_messages_fk0 FOREIGN KEY (sub_channel_id) REFERENCES Sub_channels(sub_channel_id);
ALTER TABLE Sub_channel_messages ADD CONSTRAINT Sub_channel_messages_fk1 FOREIGN KEY (user_id) REFERENCES Users(user_id);
ALTER TABLE User_channels ADD CONSTRAINT User_channels_fk0 FOREIGN KEY (user_id) REFERENCES Users(user_id);
ALTER TABLE User_channels ADD CONSTRAINT User_channels_fk1 FOREIGN KEY (channel_id) REFERENCES Channels(channel_id);
ALTER TABLE Sub_channel_group ADD CONSTRAINT Sub_channel_group_fk0 FOREIGN KEY (channel_id) REFERENCES Channels(channel_id);
ALTER TABLE Sub_channel_group ADD CONSTRAINT Sub_channel_group_fk1 FOREIGN KEY (sub_channel_id) REFERENCES Sub_channels(sub_channel_id); 
