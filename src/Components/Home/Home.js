import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Home.css';
import PatientForm from "../patientForm/patientForm";
import DoctorForm from "../doctorForm/doctorForm";
import patient from '../../assets/photos/pat.png';
import doctor from '../../assets/photos/doc.png';
import icon from '../../assets/photos/icon.png';
import Modal from 'react-awesome-modal';

class Home extends Component {

  constructor(props){
    super(props);
    this.state={
    	visibleModal: false,
      visibleModal1: false
    }
  }

  componentDidMount(){
 }

  componentWillUnmount(){
 }

 clickAction = () => {
    this.setState({visibleModal: true});
  }
  clickAction1 = () => {
    this.setState({visibleModal1: true});
  }

  render() {
    return (
	   	<div class="home_container">

        <Modal 
                visible={this.state.visibleModal}
                effect="fadeInDown"
                onClickAway={() => this.setState({visibleModal: false})}
            >
                <PatientForm {...this.props} />
            </Modal>

        <Modal 
                visible={this.state.visibleModal1}
                effect="fadeInDown"
                onClickAway={() => this.setState({visibleModal1: false})}
            >
                <DoctorForm {...this.props} />
            </Modal>

        <section>
            <div className="logo">
              <img alt="icon" src={icon}/>
            </div>

            <div class="nav">
              <li>Home</li>
              <li>About</li>
            </div>

            <div class="pat" onClick={this.clickAction}>
              <img class="pat_icon grow" alt="patient" src={patient}/>
              <span class="pat_back"></span>
              <span class="pat_back1"></span>
            </div>

            
            
            <div class="doc" onClick={this.clickAction1}>
                <img class="doc_icon grow" alt="doctor" src={doctor}/>
              <span class="doc_back"></span>
              <span class="doc_back1"></span>
            </div>

            <div class="title">
              <h1>Health Hub</h1>
              <h2>Click <a href="#">Here</a> to know more about us</h2>
            </div>

            <span class="pat_back"></span>

        </section>

        <section>

             { /*<div className="about">
              <p>
                Medicalchain uses blockchain technology to securely store health records and maintain a single version of the truth. The different organisations such as doctors, hospitals, laboratories, pharmacists and health insurers can request permission to access a patient’s record to serve their purpose and record transactions on the distributed ledger.
                Medicalchain provides solutions to today’s health record problems. The platform is built to securely store and share electronic health records. By digitizing health records and empowering users we can leverage countless industry synergies.
              </p>
            </div> */}
        </section> 
        
      </div>
    );
  }
}

export default Home;
