const jwt = require('jsonwebtoken');
const secret = 'iAmVeryBadAtThis';

const handleSignin = (req,res,db,bcrypt,xss)=>{
	const xssOptions = {
		whiteList: [],
		stripIgnoreTag: [],
		stripIgnoreTagBody: ['script']
	};
	const {password} = req.body;
	const email = xss(req.body.username, xssOptions);
	// const email = req.body.username;
		if(!email || !password)
	{
		return res.status(400).json('Incorrect form submission');
	}

	db.select('email', 'password').from('credentials')
	.where({email})
	.then(data => {
		if(data.length){
			bcrypt.compare(password, data[0].password, function(err, result) {
				if(result)
					{
						return db.select('*').from('users')
						.where({email})
						.then(user =>{
							const {ifid} = user[0];
							db('event_reg')
							.join('payment', 'event_reg.teamid', '=', 'payment.teamid')
							.join('events', 'events.eid', '=', 'event_reg.eid')
							.select('event_reg.eid', 'events.ename', 'events.category', 'payment.teamid', 'events.fee', 'payment.status')
							.where('event_reg.ifid', '=', ifid)
							.then(registrations => {
								var subquery = db('event_reg').where({ifid}).select('teamid');
								db('event_reg')
								.join('users','users.ifid', '=', 'event_reg.ifid')
								.select('event_reg.eid', 'users.ifid', 'users.name', 'event_reg.teamid')
								.where('event_reg.teamid', 'in', subquery)
								.then(teamData =>{
									db('easter_redeem')
									.sum({total: 'score'})
									.where({ifid})
									.then(userScore => {
										let userData = {
											userEventReg: registrations,
											userTeams: teamData,
											user: user[0],
											userScore: userScore[0].total
										}
									// Issue token
								        const payload = {email};
								        const token = jwt.sign(payload, secret, {
								        	expiresIn: '30d'
								        });
								        res.status(200).cookie('token', token, { maxAge: 2419200000, httpOnly: true }).json(userData)
								    })
							    })
							})
						})
						.catch(err => res.status(400).json('Invalid User'))
					}
				else
					return res.status(400).json("Invalid Credentials");
			 })
		}
		else res.status(400).json("Invalid Credentials");
	})
	.catch(err=> {console.log(err); res.status(400).json('Some error occurred')})	
}

module.exports={
	handleSignin: handleSignin
};