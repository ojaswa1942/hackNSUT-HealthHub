const fetch = require('node-fetch');

const handleDverify = (req,res, db) =>{
	const payload = req.body;
	function fetch_retry(url, options, n) {
	    return fetch(url, options).catch(function(error) {
	        if (n === 1) throw error;
	        return fetch_retry(url, options, n - 1);
	    });
	}
    fetch_retry('https://securegw.paytm.in/merchant-status/getTxnStatus', {
		method: 'post',
		headers: {'Content-type': 'application/json'},
		body: JSON.stringify(payload),
		timeout: 15000
	}, 2)
	.then(response => {
		return response.json()
	})
	.then((user) => {
		console.log('-----------------doubleverify----------');
		console.log(user);
		//res.send(user.STATUS);
		if (user.STATUS === 'TXN_SUCCESS') {
			db.transaction(trx=>{
				return trx.select('*').from('paytm').where({orderid: user.ORDERID})
				.then(oid => {
					return trx('payment').update({
						status: 1
					})
					.where({teamid: oid[0].teamid})
				})
				.then(() =>{
					return trx('paytm').update({
						txnid: user.TXNID,
						fee: user.TXNAMOUNT,
						txndate: user.TXNDATE,
						status: "SUCCESS",
						checksum: payload.CHECKSUMHASH
					})
					.where({orderid: user.ORDERID})
					.then(() =>{
						res.status(200).json('SUCCESS');
					})
					.then(trx.commit)
				}).catch(trx.rollback)
			}).catch(err => {console.log(err); res.status(400).json('Something went wrong!')});

		} else if(user.STATUS === 'PENDING'){
			db.transaction(trx=>{
				return trx.select('*').from('paytm').where({orderid: user.ORDERID})
				.then(oid => {
					return trx('payment').update({
						status: 2
					})
					.where({teamid: oid[0].teamid})
				})
				.then(() =>{
					return trx('paytm').update({
						txnid: user.TXNID,
						fee: user.TXNAMOUNT,
						txndate: user.TXNDATE,
						status: user.STATUS,
						checksum: payload.CHECKSUMHASH
					})
					.where({orderid: user.ORDERID})
					.then(() =>{
						res.status(200).json('PENDING');
					})
					.then(trx.commit)
				}).catch(trx.rollback)
			}).catch(err => {console.log(err); res.status(400).json('Something went wrong!')});
		}else {
			db.transaction(trx=>{
				return trx.select('*').from('paytm').where({orderid: user.ORDERID})
				.then(oid => {
					return trx('payment').update({
						status: 0
					})
					.where({teamid: oid[0].teamid})
				})
				.then(() =>{
					return trx('paytm').update({
						txnid: user.TXNID,
						fee: user.TXNAMOUNT,
						txndate: user.TXNDATE,
						status: "FAILURE",
						checksum: payload.CHECKSUMHASH
					})
					.where({orderid: user.ORDERID})
					.then(() =>{
						res.status(200).json('FAILURE');
					})
					.then(trx.commit)
				}).catch(trx.rollback)
			}).catch(err => {console.log(err); res.status(400).json('Something went wrong!')});
		}
	})
	.catch(err => {console.log('error in dverify: '+err)});
}
module.exports = {
	handleDverify: handleDverify
};