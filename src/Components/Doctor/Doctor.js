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
  	this.setState({visibleModal: false });
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
			serial ={i}
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
                <th className="fw6-ns fw8 bb b--white-20 tc pb3 pr3">Patient</th>
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
	  					<Modal 
			                visible={this.state.visibleModal}
			                effect="fadeInDown"
			                onClickAway={() => this.setState({visibleModal: false})}
			            >
			                <div id="contact" className='pa4'>
						      <div className="inputContainer">
						        <input type="text" name="email" className="inputField" id="up_email" required />
						        <label className="inputLabel">Email</label>
						      </div>
						      <div className="inputContainer">
						        <input type="file" name="file" className="inputField" id="up_file" required />
						        <label className="inputLabel"></label>
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
					    	<span className="logoutBtn" onClick={this.props.logOut}>LOGOUT</span>
					    	<h2 className='mv'>DOCTOR PROFILE</h2>
			  				<h3 className='mv3 wellc'>Welcome {userInfo.name},</h3>
			  				<div className='profileDetails'>
			  					<div className="detailsCard">
			  						<div className="detailsD"><b>Email:</b> {userInfo.email}</div>
			  						<div className="uploadD mt2 ba br4 pointer dim pa2 ml5" onClick={this.toggleModal}>Upload new report.</div>
			  					</div>
			  					<div className="detailsCard">
			  					</div>
			  					<div className="detailsD">
			  						<br />
		  						</div>
			  				</div>
			  			</div>
			  			<div className="eventTableDiv">
			  				<h3 className='mv3 urevt'>Uploaded Reports</h3>
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

export default Doctor;