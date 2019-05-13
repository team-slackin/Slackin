module.exports = {
	async addDummy(db,message){
		console.log('FROM CTRL',message)
		await db.add_dummy(message.inputText)
	},

	async getDummy(db){
		let messages = await db.get_dummy()
		return messages
	}
}