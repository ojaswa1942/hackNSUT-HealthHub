const nodemailer = require('nodemailer');

const sendEmail = (sname, semail, sphone, ssubject, smessage) => {
	console.log("----------Campus Ass--------");
	var msgbasic = smessage.replace(/\n/g, " ");
	var msg = smessage.replace(/\n/g, "<br />");
	var transporter = nodemailer.createTransport({
        host: 'infotsav.in',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'admin', // generated ethereal user
            pass: 'igtsea6am' // generated ethereal password
        }
    });
    transporter.verify(function(error, success) {
	   if (error) {
	        console.log('miserable', error);
	   } else {
	        console.log('Server is ready to take our messages');

	        let mailOptions = {
		        from: '"Infotsav" <admin@infotsav.in>', // sender address
		        to: 'contact@infotsav.in, ubuntu@infotsav.in', // list of receivers
		        subject: 'CAMPUS AMBASSADOR: by email '+semail, // Subject line,
		        text: 'Name: '+sname+' Email: '+semail+' Phone:'+sphone+' Subject: '+ssubject+' Message: '+msgbasic, // plain text body
		        html: '<b>Name: </b>'+sname+'<br><br><b>Email: </b>'+semail+'<br><br><b>Phone: </b>'+sphone+'<br><br><b>Subject: </b>'+ssubject+'<br><br><b>Message: </b><br><br><div>'+msg+'</div>'// html body
		    };
		    transporter.sendMail(mailOptions, (error, info) => {
		        if (error) {
		            return console.log(error);
		        }
		        console.log('Message sent for Contact Us: %s', info.messageId);
		        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
		    });
	   }
	});
	
}

const handleCampusAss = (req,res, db, xss) =>{
	const xssOptions = {
		whiteList: [],
		stripIgnoreTag: [],
		stripIgnoreTagBody: ['script']
	};
	const email = xss(req.body.contactData.email, xssOptions);
	const name = xss(req.body.contactData.name, xssOptions);
	const subject = xss(req.body.contactData.subject, xssOptions);
	const message = xss(req.body.contactData.message, xssOptions);
	const phone = xss(req.body.contactData.phone, xssOptions);
	console.log(req.body.contactData);

	if(!email || !name || !subject || !message || !phone )
	{
		return res.status(400).json('Incorrect form submission');
	}
	res.status(200).json('Your message has been sucessfully submitted.');
	sendEmail(name, email, phone, subject, message);
}

module.exports = {
	handleCampusAss: handleCampusAss
};