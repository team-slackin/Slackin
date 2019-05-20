-- NOT ADDED TO THE DB YET

CREATE TABLE user_sub_channels (
	user_sub_channels_id serial NOT NULL,
	user_id int NOT NULL,
	sub_channel_id int NOT NULL,
	CONSTRAINT User_channels_pk PRIMARY KEY (user_channels_id)
) WITH (
  OIDS=FALSE
);