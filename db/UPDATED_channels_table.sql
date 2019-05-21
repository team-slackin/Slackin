CREATE TABLE Channels (
	channel_id serial NOT NULL,
	channel_creator int NOT NULL,
    channel_is_private boolean,
	channel_name varchar(80) NOT NULL,
	channel_image TEXT NOT NULL,
	CONSTRAINT Channels_pk PRIMARY KEY (channel_id)
) WITH (
  OIDS=FALSE
);