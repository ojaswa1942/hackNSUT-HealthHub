import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import Doctor from './Components/Doctor/Doctor';
import Patient from './Components/Patient/Patient';
import Lost from './Components/Lost/Lost';
import {Loader} from './Components/_Loader/Loader'
import './App.css';

const initialState = {
  isLoggedIn: false,
  isDoc: false,
  isUser: true,
  userReports: [],
  userInfo: {
    id: '',
    name: '',
    email: '',
    dob: '',
    phone: ''
  }
};

class App extends Component {
  constructor(){
    super();
    this.state={
      isLoggedIn: false,
      isDoc: false,
      isUser: true,
      userReports: [],
      userInfo: {
        id: '',
        name: '',
        email: '',
        dob: '',
        number: '',
      }
    }
  }
  componentDidMount(){
    this.requestData();
    // setTimeout(this.logOut, 3000);
  }
  requestData = () =>{
    let err=false;
    fetch('/api/profilex')
    .then(response => {
      if(response.status!==200)
        err=true;
      console.log(response);
      return response.json();
    })
    .then(res => {
      if(err)
        throw res;
      if(res.isDoc){
        this.setState({isDoc: true});
        this.updateDoctor(res.userInfo)
      }
      else{
        this.setState({isUser: true});
        this.updateUser(res.userInfo);
      }
      this.updateLoginState(true);
      this.updateReports(res.userReports);
    })
    .catch(console.log);
  }
  updateLoginState = (value) =>{
    this.setState({isLoggedIn: value});
  }
  logOut = () =>{
    if(this.state.isLoggedIn){
      fetch('/api/logout')
      .then(res=>{
        if(res.redirected){
          this.setState(initialState);
          window.location.reload();
        }
        throw(res.error)
      })
      .catch(console.log)
    }
  }
  updateDoctor = (user) =>{
    this.setState({
      userInfo: {
        id: user.docid,
        name: user.name,
        email: user.email,
        field: user.field,
      }
    });
  }
  updateUser = (user) =>{
    this.setState({
      userInfo: {
        id: user.pid,
        name: user.name,
        email: user.email,
        number: user.number,
        dob: user.dob
      }
    });
  }
  updateReports = (reports) =>{
    this.setState({userReports: reports});
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Nav />
          <Switch>
            <Route path="/" exact render={(props) =>
              <Home {...props} 
                isLoggedIn={this.state.isLoggedIn}
                logOut={this.logOut}
                updateReports={this.updateReports}
                updateLoginState={this.updateLoginState} 
                updateUser={this.updateUser}
                updateDoctor={this.updateDoctor}
              />}
            />
            <Route path="/doctor" exact render={(props) =>
              <Doctor {...props} 
                isLoggedIn={this.state.isLoggedIn}
                logOut={this.logOut}
                updateReports={this.updateReports}
                updateLoginState={this.updateLoginState} 
                userInfo={this.state.userInfo}
                userReports={this.state.userReports}
              />}
            />
            <Route path="/patient" exact render={(props) =>
              <Patient {...props} 
                isLoggedIn={this.state.isLoggedIn}
                logOut={this.logOut}
                updateLoginState={this.updateLoginState} 
                userInfo={this.state.userInfo}
                userReports={this.state.userReports}
              />}
            />  
            <Route component={Lost} />
          </Switch>
      </div>
    );
  }
}

export default App;
