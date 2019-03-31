import React from 'react';
const ReportCard = ({key, title, hash, doctor, email, date, serial}) => {
	const linkTo = 'https://ipfs.premsarswat.me/ipfs/'+hash;
	const mailTo = 'mailto:'+email;
	return(
		<tr className='hover-bg-black-10'>
	        <td className="pv2 pl2 pr2 pr3 bb b--black-20">{serial+1}.</td>
	        <td className="pv2 pr3 bb b--black-20">{title}</td>
	        <td className="pv2 pr3 bb b--black-20"><a href={linkTo}>{hash}</a></td>
	        <td className="pv2 pr3 bb b--black-20"><a href={mailTo}>{doctor}</a></td>
	        <td className="pv2 pr3 bb b--black-20">{date.toString().substr(0,10)}</td>
	    </tr>
	);
}

export default ReportCard;