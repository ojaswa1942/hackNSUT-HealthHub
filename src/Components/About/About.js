import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import icon from '../../assets/photos/icon.png';
import './About.css';


class About extends Component {

  componentDidMount(){
 }

  componentWillUnmount(){
 }


  render() {
    return (
	   	<div class="about_container"> 
          <div className="logo">
              <Link to="/"><img alt="icon" src={icon}/></Link>
            </div>
          <div className="title1">
            <h1>Health Hub</h1>
          </div>
          <div className="content">
            <p className="about">Health Hub uses blockchain technology to securely store health records and maintain a single version of the truth. The different organisations such as doctors, hospitals, laboratories, pharmacists and health insurers can request permission to access a patient’s record to serve their purpose and record transactions on the distributed ledger.</p>
            <p className="about">Health Hub provides the patient full access and control over their data, they will have the capability to provide differing levels of access to various users, by assigning a set of access permissions and designating who can query and write data to their blockchain. The patient, being the owner of their own medical records, will be able to fully control who accesses their data and which information they access.</p>
            <p className="about">Health Hub provides solutions to today’s health record problems. The platform is built to securely store and share electronic health records. By digitizing health records and empowering users we can leverage countless industry synergies.</p>
            <p className="about">Health Hub will provide immediate utilisation of health records by allowing patients to communicate directly with doctors and share their health records - for online consultations. </p>
          </div>
          <span class="circle1"></span>
          <span class="circle2"></span>
          <span class="circle3"></span>
          <span class="circle4"></span>
      </div>
    );
  }
}

export default About;
