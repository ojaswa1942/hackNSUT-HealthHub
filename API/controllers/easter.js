
const handleEasterRedeem = (req,res,db,xss)=>{
	const xssOptions = {
		whiteList: [],
		stripIgnoreTag: [],
		stripIgnoreTagBody: ['script']
	};
	const egg = xss(req.body.egg, xssOptions);	
	const email = req.email;

	if(!email || !egg)
		throw('Nani?');
	db.transaction(trx =>{
		console.log('Easter =>', egg, '<=');
	 	trx.select('*').from('easter').where({egg})
	 	.then(easterEgg => {
	 		if(easterEgg.length){
	 			trx('users').select('*').where({email})
	 			.then(userData => {
	 				const ifid = userData[0].ifid;
	 				trx('easter_redeem').select('*').where({ifid, egg})
	 				.then(userRedeem => {
	 					if(userRedeem.length){
	 						return res.status(400).json(`Egg already redeemed. Stop loading our servers!`);
	 					}
	 					else {
	 						trx('easter_redeem')
	 						.insert({
	 							ifid, egg,
	 							score: easterEgg[0].score
	 						})
	 						.then(() => {
	 							if(easterEgg[0].score > 200){
	 								trx('easter').where({egg}).decrement('score', 40)
	 								.then(() => {
	 									trx('easter_redeem')
										.join('users', 'users.ifid', '=', 'easter_redeem.ifid')
										.select('easter_redeem.ifid', 'name')
										.sum({total: 'score'})
										.groupBy('easter_redeem.ifid')
										.orderBy('total', 'desc')
										.limit(15)
										.then((leaderboard) => {
											trx('easter_redeem')
											.sum({total: 'score'})
											.where({ifid})
											.then(userScore => {
												const score = {userScore, leaderboard};
												return res.status(200).json(score);
											})
											.then(trx.commit)
										})
	 								})
	 							}
	 							else {
 									trx('easter_redeem')
									.join('users', 'users.ifid', '=', 'easter_redeem.ifid')
									.select('easter_redeem.ifid', 'name')
									.sum({total: 'score'})
									.groupBy('easter_redeem.ifid')
									.orderBy('total', 'desc')
									.limit(15)
									.then((leaderboard) => {
										trx('easter_redeem')
										.sum({total: 'score'})
										.where({ifid})
										.then(userScore => {
											const score = {userScore, leaderboard};
											return res.status(200).json(score);
										})
										.then(trx.commit)
									})
	 							}
	 						})
							.catch(trx.rollback)
	 					}
	 				})
	 			})
	 		}
	 		else{
	 			return res.status(400).json(`You got the wrong egg! Try again?`);
	 		}
	 	})
	})
	.catch(err => res.status(400).json('Something is wrong'));
}

const fetchScore = (req,res,db)=>{
	const {ifid, isLoggedIn} = req.body;
	if(isLoggedIn){
		return db('easter_redeem')
		.join('users', 'users.ifid', '=', 'easter_redeem.ifid')
		.select('easter_redeem.ifid', 'name')
		.sum({total: 'score'})
		.groupBy('easter_redeem.ifid')
		.orderBy('total', 'desc')
		.limit(15)
		.then((leaderboard) => {
			db('easter_redeem')
			.sum({total: 'score'})
			.where({ifid})
			.then(userScore => {
				const score = {userScore, leaderboard};
				return res.status(200).json(score);
			})
		})
		.catch(err => {console.log(err); return res.status(400).json('Something is wrong');});
	}
	else {
		return db('easter_redeem')
		.join('users', 'users.ifid', '=', 'easter_redeem.ifid')
		.select('easter_redeem.ifid', 'name')
		.sum({total: 'score'})
		.groupBy('easter_redeem.ifid')
		.orderBy('total', 'desc')
		.limit(15)
		.then((leaderboard) => {
			return res.status(200).json(leaderboard);
		})
		.catch(err => {console.log(err); return res.status(400).json('Something is wrong');});
	}
}

module.exports={
	handleEasterRedeem: handleEasterRedeem,
	fetchScore: fetchScore
};