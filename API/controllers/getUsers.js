const returnUsers=(req,res,db)=>{
 	db.select('*').from('users').orderBy('timest', 'desc')
	.then(allUsers => {
		let userData = {
			users: allUsers
		}
		res.status(200).json(userData);
	})
	.catch(err => {console.log('Users: ', err); res.status(400).json('Something is wrong');});
}

module.exports={
	returnUsers: returnUsers
}