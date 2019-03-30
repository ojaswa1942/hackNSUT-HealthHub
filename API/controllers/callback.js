const paytmIndex = require("./paytm/services/index");
//const fetch = require('node-fetch');

const handleCallback = (req,res, db) =>{
	console.log('-------req------------');
	console.log(req.body);
	paytmIndex.responsePayment(req.body).then(
        success => {
            // console.log('-----------------responseData----------');
            // console.log(success);
            var jsonData = {
            	MID: success.MID,
            	ORDERID: success.ORDERID,
            	CHECKSUMHASH: success.CHECKSUMHASH
            };
            console.log('-----------------JsonData----------');
            console.log(jsonData);
            function fetch_retry(url, options, n) {
			    return fetch(url, options).catch(function(error) {
			        if (n === 1) throw error;
			        return fetch_retry(url, options, n - 1);
			    });
			}
            fetch_retry('https://securegw.paytm.in/merchant-status/getTxnStatus', {
				method: 'post',
				headers: {'Content-type': 'application/json'},
				body: JSON.stringify(jsonData),
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
								checksum: jsonData.CHECKSUMHASH
							})
							.where({orderid: user.ORDERID})
							.then(() =>{
								res.status(302).redirect('http://www.infotsav.in/profile');
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
								checksum: jsonData.CHECKSUMHASH
							})
							.where({orderid: user.ORDERID})
							.then(() =>{
								res.status(302).redirect('http://www.infotsav.in/profile');
							})
							.then(trx.commit)
						}).catch(trx.rollback)
					}).catch(err => {console.log(err); res.status(400).json('Something went wrong!')});
				}else {
					db.transaction(trx=>{
						return trx.select('*').from('paytm').where({orderid: user.ORDERID})
						.then(() =>{
							return trx('paytm').update({
								txnid: user.TXNID,
								fee: user.TXNAMOUNT,
								txndate: user.TXNDATE,
								status: "FAILURE",
								checksum: jsonData.CHECKSUMHASH
							})
							.where({orderid: user.ORDERID})
							.then(() =>{
								res.status(302).redirect('http://www.infotsav.in/profile');
							})
							.then(trx.commit)
						}).catch(trx.rollback)
					}).catch(err => {console.log(err); res.status(400).json('Something went wrong!')});
				}
			})
			.catch(err => {console.log('error in dverify: '+err)});
        },
        error => {
        	console.log('-----------------shit----------');
            res.send(error);
        }
    );
}
module.exports = {
	handleCallback: handleCallback
};