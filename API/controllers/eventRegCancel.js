
const handleEventRegCancel = (req, res, db, xss) =>{
	const xssOptions = {
		whiteList: [],
		stripIgnoreTag: [],
		stripIgnoreTagBody: ['script']
	};

	const {ifid, eid} = req.body;
	const email = req.email;

	if(!ifid || !eid.toString().length){
		return res.status(400).json('Incomplete request!');
	}
	
	db.transaction(trx =>{
		trx.select('*').from('users').where({email})
		.then(authUser => {
			if(!authUser.length)
				return res.status(400).json('What the fuck?');
			else{
				ifidUser = authUser[0].ifid;
			 	trx.select('*').from('event_reg').where({ifid, eid})
				.then(regs => {
					if(!regs.length){
						return res.status(400).json('Never registered!');
					}
					else {
						const tid = regs[0].teamid;
						return trx('event_reg').where({ifid, eid}).del()
							.then(() =>{
								return trx('event_reg').select('*')
								.where({teamid: tid})
								.then((entries) => {
									if(entries.length){
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
									else {
										trx('payment')
										.where({teamid: tid})
										.del()
										.then(() => {
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
								})
								.catch(trx.rollback)
							})
							.catch(trx.rollback)
					}
				})
				.catch(trx.rollback)
			}
		})
		.catch(trx.rollback)
	})
	.catch(err => {console.log(err); res.status(400).json('Something is wrong')});
}

module.exports = {
	handleEventRegCancel: handleEventRegCancel
};