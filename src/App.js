import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import Lost from './Components/Lost/Lost';
import {Loader} from './Components/_Loader/Loader'
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      isLoggedIn: false,
      isAdmin: false,
      userEventReg: [],
      userTeams: [],
      user: {
        id: '',
        name: '',
        email: '',
        college: '',
        mobile: '',
      },
      userScore: 0
    }
  }
  render() {
    return (
      <div className="App">
        <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route component={Lost} />
          </Switch>
      </div>
    );
  }
}

export default App;
