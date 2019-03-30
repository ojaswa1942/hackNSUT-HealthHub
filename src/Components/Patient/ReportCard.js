import React from 'react';
import {Link} from 'react-router-dom';

const ReportCard = ({key, title, hash, doctor, email, date}) => {
	const linkTo = 'https://ipfs.premsarswat.me/ipfs/'+hash;
	const mailTo = 'mailto:'+email;
	return(
		<tr className='hover-bg-black-10'>
	        <td className="pv2 pl2 pr2 pr3 bb b--white-20">{key}.</td>
	        <td className="pv2 pr3 bb b--white-20">{title}</td>
	        <td className="pv2 pr3 bb b--white-20"><Link to={linkTo}>{hash}</Link></td>
	        <td className="pv2 pr3 bb b--white-20"><Link to={mailTo}>{doctor}</Link></td>
	        <td className="pv2 pr3 bb b--white-20">{date}</td>
	    </tr>
	);
}

export default ReportCard;