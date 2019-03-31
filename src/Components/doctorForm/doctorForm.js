import React, { Component } from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css'
import '../patientForm/signup.css'
import '../patientForm/Form.css'
import {FormFunctions} from './FormFunctions'
import {Loader} from '../_Loader/Loader'

class DoctorForm extends Component {

  constructor(){
    super();
    this.state={
      questions2: [
      {question:"What's your name?", pattern: /^(\w|\s){3,30}$/},
      {question:"What's your email?",type: "emaill", pattern: /^(?=[A-Za-z0-9][A-Za-z0-9@._%+-]{5,253}$)[A-Za-z0-9._%+-]{1,64}@(?:(?=[A-Za-z0-9-]{1,63}\.)[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*\.){1,8}[A-Za-z]{2,5}$/},
      {question:"Create your password", type: "password", pattern: /^.{3,36}$/},
      {question:"Specialization?", type:'text', pattern: /^.{2,100}$/},
      {question:"Why do you want to join?", pattern: /^[^*`~<>]{10,1500}$/}
      ],
      questions3: [
      {question:"What's your email?", type: "emaill", pattern: /^(?=[A-Za-z0-9][A-Za-z0-9@._%+-]{5,253}$)[A-Za-z0-9._%+-]{1,64}@(?:(?=[A-Za-z0-9-]{1,63}\.)[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*\.){1,8}[A-Za-z]{2,5}$/},
      {question:"What's your password?", type: "password", pattern: /^.{3,36}$/}
      ],
      gotData: false,
      responseMessage: '',
      receivedError: false,
      loading: false
    }
    this.doctorData= {
        name: '',
        email: '',
        password:'',
        specilization: '',
        purpose: ''
      }
    this.doctorLoginData = {
      email: '',
      password: ''
    }
  }

  componentWillMount(){
  }

  componentDidMount(){
    FormFunctions(this);
  }

  requestDoctor = (doctorData) =>{
    let err = false;
    fetch('/api/contact', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(doctorData)
    })
    .then(response => {
      if(response.status !== 200)
        err = true;
      return response.json()
    })
    .then((user) => {
      if(err)
        throw(user);
      this.setState({responseMessage: user});
    })
    .catch(err => {
      this.setState({receivedError: true, responseMessage: err})
    });
  }

  requestLoginDoctor = (doctorLoginData) =>{
    let err = false;
  fetch('/api/signinDoc', {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(doctorLoginData)
  })
  .then(response => {
    if(response.status !== 200)
      err = true;
    return response.json()
  })
  .then((user) => {
    if(err)
      throw(user);
    this.props.updateDoctor(user.userInfo);
    this.props.updateReports(user.userReports);
    this.props.updateLoginState(true);
    this.props.history.push('/doctor');
  })
  .catch(err => {this.setState({receivedError: true, responseMessage: err})});
  }

  updateDoctorData = () =>{
    this.doctorData = {
    name: this.state.questions2[0].value,
    email: this.state.questions2[1].value,
    password:this.state.questions2[2].value,
    specilization: this.state.questions2[3].value,
    purpose: this.state.questions2[4].value,
    };
    if(this.state.gotData && !this.state.responseMessage){
      this.requestDoctor(this.doctorData);
    }
  }
  updateDoctorLoginData = () =>{
    this.doctorLoginData = {
    email: this.state.questions3[0].value,
    password: this.state.questions3[1].value,
    };
    if(this.state.gotData && !this.state.responseMessage){
      this.requestLoginDoctor(this.doctorLoginData);
    }
  }

  render() {
    
    const { loading } = this.state;
    if(this.state.questions2[0].value && !this.state.responseMessage)
      this.updateDoctorData();
    if(this.state.questions3[0].value && !this.state.responseMessage)
      this.updateDoctorLoginData();

    if(this.state.receivedError){
      setTimeout(()=>{
        window.location.reload();
      }, 1200);
    }

    return (
      <div className='register-container'>
        <div id="progress"></div>
      <div className="center">
        {
        (loading)?
          <Loader />
        :
          (this.state.responseMessage)?
            (this.state.receivedError)?
            <div className='f3 black'>
              {this.state.responseMessage}
            </div>
          :
            <div className='f3 black'>
              {this.state.responseMessage} <br />
              Sign Up Successfull !!
            </div>
        :
          <div className='white tabs'>
          <Tabs defaultTab="one" className='tab-content mv2'>
            <TabList className='mv2'>
              <Tab autoFocus tabFor="one">Sign Up</Tab>
              <Tab tabFor="two">Sign In</Tab>
            </TabList>
              <TabPanel tabId="one">
                  <div id="contact">
                    <div className="inputContainer inputContainer2">
                      <input type="text" name="name" className="inputField inputField2" required />
                      <label className="inputLabel inputLabel2"></label>
                    </div>
                    <div className="inputContainer inputContainer2">
                      <input type="text" name="email" className="inputField inputField2" required />
                      <label className="inputLabel inputLabel2"></label>
                    </div>
                    <div className="inputContainer inputContainer2">
                      <input type="password" name="password" className="inputField inputField2" required />
                      <label className="inputLabel inputLabel2"></label>
                    </div>
                    <div className="inputContainer inputContainer2">
                      <input type="text" name="specilization" className="inputField inputField2" required />
                      <label className="inputLabel inputLabel2"></label>
                    </div>
                    <div className="inputContainer inputContainer2">
                      <textarea name="purpose" className="inputField inputField2" rows="4" cols="40"></textarea>
                      <label className="inputLabel inputLabel2"></label>
                    </div>
                    <div className="buttonContainer dim pointer">
                      <button id="submitButton2" className="pointer">Submit</button>
                    </div>
                  </div>
              </TabPanel>
              <TabPanel tabId="two">                
                  <div id="contact">
                    <div className="inputContainer inputContainer3">
                      <input type="text" name="email" className="inputField inputField3" required />
                      <label className="inputLabel inputLabel3"></label>
                    </div>
                    <div className="inputContainer inputContainer3">
                      <input type="password" name="password" className="inputField inputField3" required />
                      <label className="inputLabel inputLabel3"></label>
                    </div>
                    <div className="buttonContainer dim pointer">
                      <button id="loginButton3" className="pointer">Login</button>
                    </div>
                  </div>
              </TabPanel>
          </Tabs>
        </div>
      }
        </div>
    </div>
    );
  }
}

export default DoctorForm;