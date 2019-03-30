 const eventRegList=(req,res,db)=>{
 	const tokenid = req.body.tokenid;
 	db.select('*').from('event_admin').where({tokenid}).
 	then((eids) => {
 		if(eids.length){
 			const {eid} = eids[0];
 			db.raw(`SELECT u.ifid, u.name, u.college, u.mobile, u.email, es.ename, e.teamid FROM users u INNER JOIN event_reg e ON u.ifid=e.ifid INNER JOIN events es ON es.eid=e.eid INNER JOIN payment pay ON pay.teamid=e.teamid && pay.status="1" WHERE e.eid = ${eid} ORDER BY e.teamid ASC`)
 			.then((regs) => {
 				return res.status(200).json(regs[0]);
 			})
 		}
 		else
 			return res.status(301).json('What the fuck?');
 	})
 	.catch(err => {
 		console.log(err);
 		res.status(400).json('Something is wrong');
 	})
}

module.exports={
	eventRegList: eventRegList
}