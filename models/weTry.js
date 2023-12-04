exports.getIt = (schema) => {
	schema.pre('findOneAndRemove', (next) => {
		this.model('User').update(
			{ $pull: { meetings: this._id } },
			{ multi: true }
		)
		console.log('EHEGFJFD')
		next()
	})
}
