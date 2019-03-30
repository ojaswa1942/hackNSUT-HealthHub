import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
//import {Footer} from '../Footer/Footer';
import '../../assets/css/dashboard.css';
//import '../../assets/css/fontawesome.min.css';
//import '../../assets/css/signup.css';
//import headers from "../../assets/logo/headers.png";
import {Loader} from '../_Loader/Loader';
import ReportCard from '../Patient/ReportCard';
import Modal from 'react-awesome-modal';

class Doctor extends Component {

  constructor(props){
    super(props);
    this.state={
    	loading: true,
	    redirect: false,
	    error: false,
	    errorMessage: '',
        visibleModal: false,
        visibleSuccessModal: false,
        hash: ''
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

  toggleModal = () =>{
  	this.setState({
  		visibleModal: true
  	});
  }

  handleUpload = () =>{
  	var formData = new FormData();
  	formData.append("email", document.getElementById("up_email").value);
  	formData.append("file", document.getElementById("up_file").files[0]);

  	let err = false;
	fetch('/api/upload', {
		method: 'post',
		//headers: {'Content-type': 'application/json'},
		body: formData
	})
	.then(response => {
		if(response.status !== 200)
			err = true;
		return response.json()
	})
	.then((user) => {
		if(err)
			throw(user);
		console.log(user);
		this.setState({
			hash: user.hash,
			visibleSuccessModal: true
		});
	})
	.catch(err => {this.setState({receivedError: true, responseMessage: err})});
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
	  					<Modal 
			                visible={this.state.visibleModal}
			                effect="fadeInDown"
			                onClickAway={() => this.setState({visibleModal: false})}
			            >
			                <div id="contact">
						      <div className="inputContainer">
						        <input type="text" name="email" className="inputField" id="up_email" required />
						        <label className="inputLabel">Email</label>
						      </div>
						      <div className="inputContainer">
						        <input type="file" name="file" className="inputField" id="up_file" required />
						        <label className="inputLabel">Report</label>
						      </div>
						      <div className="buttonContainer dim pointer">
						        <button id="submitButton" className="pointer" onClick={this.handleUpload}>Submit</button>
						      </div>
			                </div>
			            </Modal>
			            <Modal 
			                visible={this.state.visibleSuccessModal}
			                effect="fadeInDown"
			                onClickAway={() => this.setState({visibleSuccessModal: false})}
			            >
			                <div className='black f5 flex flex-column items-center pa3 bg-near-gray'>
			                    <div className='mb2'>Success!</div><div className='t mh2'> Hash: <b>{this.state.hash}</b></div>
			                </div>
			            </Modal>
					    <div className="profile-headin">
					    	<h2 className='mv'>DOCTOR PROFILE</h2>
			  				<h3 className='mv3 wellc'>Welcome {userInfo.name},</h3>
			  				<div className='profileDetails'>
			  					<div className="detailsCard">
			  						<div className="detailsD"><b>Mobile:</b> {userInfo.mobile}</div>
			  						<div className="detailsD"><b>Email:</b> {userInfo.email}</div>
			  					</div>
			  					<div className="detailsCard">
			  						<div className="uploadD" onClick={this.toggleModal}>Upload new report.</div>
			  					</div>
			  					<div className="detailsD">
			  						<br />
		  						</div>
			  				</div>
			  			</div>
			  			<div className="eventTableDiv">
			  				<h3 className='mv3 urevt'>Uploaded Reports</h3>
			  				{(reportsLen)?
			  					<ReportList reports={userReports} />
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

export default Doctor;