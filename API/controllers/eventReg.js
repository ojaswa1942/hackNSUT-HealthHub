const randomstring = require("randomstring");

const handleEventReg = (req, res, db, xss) =>{
	const xssOptions = {
		whiteList: [],
		stripIgnoreTag: [],
		stripIgnoreTagBody: ['script']
	};

	const init = req.body.init;
	const eid = req.body.eid;
	const ifid = xss(req.body.ifid);
	let teamid, ifidUser;
	const email = req.email;

	if(init){
		teamid = ifid+'-'+eid+randomstring.generate(2);
	}
	else {
		teamid = req.body.teamid;
	}
	
	if(!ifid || !eid.toString().length || !teamid){
		return res.status(400).json('Incorrect form submission');
	}
	
	db.transaction(trx => {
		trx.select('*').from('users').where({email})
		.then(authUser => {
			if(!authUser.length)
				return res.status(400).json('What the fuck?');
			else{
				ifidUser = authUser[0].ifid;				
				trx.select('*').from('event_reg').where({ifid, eid})
				.then(reges =>{
					if(reges.length)
						return res.status(400).json('Already registered!');
					else{
						trx('users').select('*').where({ifid})
						.then(data => {
							if(!data.length)
								return res.status(400).json('User does not exist!');
							else{
								return trx('event_reg').insert({
									ifid: ifid,
									eid: eid,
									teamid: teamid
								})
								.then(() => {
									if(init){
										return trx('payment')
										.insert({
											teamid: teamid,
											status: 0
										})
										.then(() =>{
											trx('event_reg')
											.join('payment', 'event_reg.teamid', '=', 'payment.teamid')
											.join('events', 'events.eid', '=', 'event_reg.eid')
											.select('event_reg.eid', 'events.ename', 'events.category', 'payment.teamid', 'events.fee', 'payment.status')
											.where('event_reg.ifid', '=', ifidUser)
											.then(registrations =>{
												var subquery = trx('event_reg').where({ifid: ifidUser}).select('teamid');
												trx('event_reg')
												.join('users','users.ifid', '=', 'event_reg.ifid')
												.select('event_reg.eid', 'users.ifid', 'users.name', 'event_reg.teamid')
												.where('event_reg.teamid', 'in', subquery)
												.then(teamData =>{
													let eventData = {
														userEventReg: registrations,
														userTeams: teamData,
													}
													res.status(200).json(eventData);
												})
												.then(trx.commit)
											})
										})
									}
									else {
										trx('event_reg')
										.join('payment', 'event_reg.teamid', '=', 'payment.teamid')
										.join('events', 'events.eid', '=', 'event_reg.eid')
										.select('event_reg.eid', 'events.ename', 'events.category', 'payment.teamid', 'events.fee', 'payment.status')
										.where('event_reg.ifid', '=', ifidUser)
										.then(registrations =>{
											var subquery = trx('event_reg').where({ifid: ifidUser}).select('teamid');
											trx('event_reg')
											.join('users','users.ifid', '=', 'event_reg.ifid')
											.select('event_reg.eid', 'users.ifid', 'users.name', 'event_reg.teamid')
											.where('event_reg.teamid', 'in', subquery)
											.then(teamData =>{
												let eventData = {
													userEventReg: registrations,
													userTeams: teamData,
												}
												res.status(200).json(eventData);
											})
											.then(trx.commit)
										})
									}
								})
								.catch(trx.rollback)
							}
						})
					}
				})
				.catch(trx.rollback)
			}
		})
		.catch(trx.rollback)
	})
	.catch(err => {console.log(err); res.status(400).json('Something is wrong');})
}

module.exports = {
	handleEventReg: handleEventReg
};