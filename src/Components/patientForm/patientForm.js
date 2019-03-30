import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css'
import './signup.css'
import './Form.css'
import {FormFunctions} from './FormFunctions'
import {Loader} from '../_Loader/Loader'

class PatientForm extends Component {

  constructor(){
    super();
    this.state={
      questions: [
      {question:"What's your name?", pattern: /^(\w|\s){3,30}$/},
      {question:"What's your email?",type: "emaill", pattern: /^(?=[A-Za-z0-9][A-Za-z0-9@._%+-]{5,253}$)[A-Za-z0-9._%+-]{1,64}@(?:(?=[A-Za-z0-9-]{1,63}\.)[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*\.){1,8}[A-Za-z]{2,5}$/},
      {question:"Create your password", type: "password", pattern: /^.{3,36}$/},
      {question:"What's your phone number?", type:'tel', pattern: /^[6-9]\d{9}$/},
      {question:"", type: "sellect", pattern: /^(male|female|other)$/},
      {question:"", type:"date"},
      {question:"Address?", pattern: /^[^*`~<>]{10,1500}$/}
      ],
      questions1: [
      {question:"What's your email?", type: "emaill", pattern: /^(?=[A-Za-z0-9][A-Za-z0-9@._%+-]{5,253}$)[A-Za-z0-9._%+-]{1,64}@(?:(?=[A-Za-z0-9-]{1,63}\.)[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*\.){1,8}[A-Za-z]{2,5}$/},
      {question:"What's your password?", type: "password", pattern: /^.{3,36}$/}
      ],
      gotData: false,
      responseMessage: '',
      receivedError: false,
      loading: false
    };
    this.patientSignupData= {
        name: '',
        email: '',
        password:'',
        phone: '',
        gender: '',
        date: '',
        address: ''
    };
    this.patientLoginData = {
      email: '',
      password: ''
    };
  }

  componentWillMount(){
  }

  componentDidMount(){
    FormFunctions(this);
  }

  requestPatientSignup = (patientSignupData) =>{
    let err = false;
  fetch('/api/register', {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({patientSignupData})
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
  .catch(err => {this.setState({receivedError: true, responseMessage: err})});
  }

  requestPatientLogin = (patientLoginData) =>{
    let err = false;
  fetch('/api/signinPatient', {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(patientLoginData)
  })
  .then(response => {
    if(response.status !== 200)
      err = true;
    console.log(response);
    return response.json()
  })
  .then((user) => {
    if(err)
      throw(user);
    this.props.updateReports(user.userReports);
    this.props.updateUser(user.userInfo);
    this.props.history.push('/patient');
  })
  .catch(err => { 
    console.log(err);
    // this.setState({receivedError: true, responseMessage: err})
  });
  }

  updatePatientSignupData = () =>{
    this.patientSignupData = {
    name: this.state.questions[0].value,
    email: this.state.questions[1].value,
    password:this.state.questions[2].value,
    phone: this.state.questions[3].value,
    gender: this.state.questions[4].value,
    dob: this.state.questions[5].value,
    address: this.state.questions[6].value
    };
    if(this.state.gotData && !this.state.responseMessage){
      this.requestPatientSignup(this.patientSignupData);
    }
  }

  updatePatientLoginData = () =>{
    this.patientLoginData = {
    email: this.state.questions1[0].value,
    password:this.state.questions1[1].value
    };
    if(this.state.gotData && !this.state.responseMessage){
      this.requestPatientLogin(this.patientLoginData);
    }
  }

  render() {
    
    const { loading } = this.state;
    if(this.state.questions[0].value && !this.state.responseMessage)
      this.updatePatientSignupData();
    if(this.state.questions1[0].value && !this.state.responseMessage)
      this.updatePatientLoginData();

    // if(this.state.receivedError){
    //   setTimeout(()=>{
    //     window.location.reload();
    //   }, 1200);
    // }

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
            <div className='f3 white'>
              {this.state.responseMessage}
            </div>
          :
            <div className='f3 white'>
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
                    <div className="inputContainer inputContainer0">
                      <input type="text" name="name" className="inputField inputField0" required />
                      <label className="inputLabel inputLabel0"></label>
                    </div>
                    <div className="inputContainer inputContainer0">
                      <input type="text" name="email" className="inputField inputField0" required />
                      <label className="inputLabel inputLabel0"></label>
                    </div>
                    <div className="inputContainer inputContainer0">
                      <input type="password" name="password" className="inputField inputField0" required />
                      <label className="inputLabel inputLabel0"></label>
                    </div>
                    <div className="inputContainer inputContainer0">
                      <input type="text" name="phone" className="inputField inputField0" required />
                      <label className="inputLabel inputLabel0"></label>
                    </div>
                    <div className="inputContainer inputContainer0">
                      <label className="inputLabel inputLabel0"></label>
                      <select name="gender" id="selectBox" className="inputField inputField0">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="inputContainer inputContainer0">
                      <input type="date" name="dob" className="inputField inputField0" required />
                      <label className="inputLabel inputLabel0"></label>
                    </div>
                    <div className="inputContainer inputContainer0">
                      <textarea name="address" className="inputField inputField0" rows="4" cols="40"></textarea>
                      <label className="inputLabel inputLabel0"></label>
                    </div>
                    <div className="buttonContainer dim pointer">
                      <button id="submitButton0" className="pointer">Submit</button>
                    </div>
                  </div>
              </TabPanel>
              <TabPanel tabId="two">                
                  <div id="contact">
                    <div className="inputContainer inputContainer1">
                      <input type="text" name="email" className="inputField inputField1" required />
                      <label className="inputLabel1 inputLabel"></label>
                    </div>
                    <div className="inputContainer inputContainer1">
                      <input type="password" name="password" className="inputField inputField1" required />
                      <label className="inputLabel1 inputLabel"></label>
                    </div>
                    <div className="buttonContainer dim pointer">
                      <button id="loginButton1" className="pointer">Login</button>
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

export default PatientForm;