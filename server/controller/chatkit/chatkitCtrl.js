module.exports = {
	createroom(req,res){
		chatkit.createRoom({
			creatorId: 'userId',
			name: 'my room',
			customData: { foo: 42 },
		  })
			.then(() => {
			  console.log('Room created successfully');
			}).catch((err) => {
			  console.log(err);
			});
	}
}