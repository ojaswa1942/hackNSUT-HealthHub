import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
//import {Footer} from '../Footer/Footer';
import '../../assets/css/dashboard.css';
//import '../../assets/css/fontawesome.min.css';
//import '../../assets/css/signup.css';
//import headers from "../../assets/logo/headers.png";
import {Loader} from '../_Loader/Loader';
import ReportCard from './ReportCard';

class Patient extends Component {

  constructor(props){
    super(props);
    this.state={
    	loading: true,
	    redirect: false,
	    error: false,
	    errorMessage: '',
        visibleModal: false
	};
  }

  componentWillMount(){
  	if(!this.props.isLoggedIn){
		fetch('/api/checkToken')
		.then(response => {
			if(response.status!==200)
				throw(response);
		    this.setState({ loading: false });
		    this.props.updateLoginState(true);
		})
		.catch(() => {this.setState({ loading: false, redirect: true });});
	} else this.setState({loading: false});
  }


  render() {
  	const { loading, redirect } = this.state;
  	const { userInfo, userReports } = this.props;
  	const reportsLen = userReports.length;
  	const ReportList = ({ report }) => {
		const repComponent = report.map((rep, i) => {
			return <ReportCard 
			key={i} 
			title={report[i].title}
			hash = {report[i].hash}
			doctor={report[i].name}
			email={report[i].email} 
			date={report[i].date} 
	 		/> 
		});
		return (
			<div>
				{repComponent}
			</div>
		);
	}
    return (
    	<div className='Profile'>
	   	<div className='register-container'>
	   	  <div>{
			//<Link to='/'><img src={headers} className="headim" alt="infotsav logo" /></Link>
		  }
		  </div>
		  <div className="center">
        {(!loading)?
		  		(redirect)?
		  			<Redirect to='/login' />
	  			:
	  				<div className="profile-content">
					    <div className="profile-headin">
					    	<h2 className='mv'>PROFILE</h2>
			  				<h3 className='mv3 wellc'>Welcome {userInfo.name},</h3>
			  				<div className='profileDetails'>
			  					<div className="detailsCard">
			  						<div className="detailsD"><b>PID:</b> {userInfo.id}</div>
			  						<div className="detailsD"><b>Email:</b> {userInfo.email}</div>
			  					</div>
			  					<div className="detailsCard">
			  						<div className="detailsD"><b>Mobile:</b> {userInfo.mobile}</div>
			  						<div className="detailsD"><b>Date of Birth:</b> {userInfo.dob}</div>
			  					</div>
			  					<div className="detailsD">
			  						<br />
		  						</div>
			  				</div>
			  			</div>
			  			<div className="eventTableDiv">
			  				<h3 className='mv3 urevt'>Your Events</h3>
			  				{(reportsLen)?
			  					<ReportList report={userReports} />
			  				  :
			  				  	"You don't have any reports yet."
			  				}
			  			</div>
			  		</div>
  			:
  				<Loader />
  			}

		    
	  	  </div>
  		  {//<Footer />
  		  }
		</div>
		</div>
    );
  }
}

export default Patient;