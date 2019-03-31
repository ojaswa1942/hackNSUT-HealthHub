import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
//import {Footer} from '../Footer/Footer';
import '../../assets/css/dashboard.css';
//import '../../assets/css/fontawesome.min.css';
//import '../../assets/css/signup.css';
//import headers from "../../assets/logo/headers.png";
import {Loader} from '../_Loader/Loader';
import ReportCard from './ReportCard';
import JMPSBot from '../JMPSBot/JMPSBot';

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
			serial={i} 
			title={report[i].title}
			hash = {report[i].hash}
			doctor={report[i].name}
			email={report[i].email} 
			date={report[i].date} 
	 		/> 
		});
		return (
        <div className='black flex flex-column items-center w-100 mh4-ns mh1'>
          <table className="f4 w-100" cellSpacing="0">
            <thead>
              <tr>
                <th className="fw6-ns fw8 bb b--white-20 tc pb3 pr3">No.</th>
                <th className="fw6-ns fw8 bb b--white-20 tc pb3 pr3">Title</th>
                <th className="fw6-ns fw8 bb b--white-20 tc pb3 pr3">Download</th>
                <th className="fw6-ns fw8 bb b--white-20 tc pb3 pr3">Doctor</th>
                <th className="fw6-ns fw8 bb b--white-20 tc pb3 pr3">Date</th>
              </tr>
            </thead>
            <tbody className="lh-copy" id='leader-body'>
              {repComponent}
            </tbody>
          </table>
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
		  			<Redirect to='/' />
	  			:
	  				<div className="profile-content">
	  				<JMPSBot {...this.props} />
	  					<span className="logoutBtn" onClick={this.props.logOut}>LOGOUT</span>
					    <div className="profile-headin">
					    	<h2 className='mv'>PROFILE</h2>
			  				<h3 className='mv3 wellc'>Welcome {userInfo.name},</h3>
			  				<div className='profileDetails'>
			  					<div className="detailsCard">
			  						<div className="detailsD"><b>PID:</b> {userInfo.id}</div>
			  						<div className="detailsD"><b>Email:</b> {userInfo.email}</div>
			  					</div>
			  					<div className="detailsCard">
			  						<div className="detailsD"><b>Mobile:</b> {userInfo.number}</div>
			  						<div className="detailsD"><b>Date of Birth:</b> {userInfo.dob.toString().substr(0,10)}</div>
			  					</div>
			  					<div className="detailsD">
			  						<br />
		  						</div>
			  				</div>
			  			</div>
			  			<div className="eventTableDiv">
			  				<h3 className='mv3 urevt'>Your Reports</h3>
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