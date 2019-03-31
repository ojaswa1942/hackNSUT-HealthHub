import React, { Component } from 'react';
import { Widget, addResponseMessage, addLinkSnippet, toggleInputDisabled } from 'react-chat-widget';
import arcreactor from '../../assets/photos/icon.png'
import 'react-chat-widget/lib/styles.css';
import './JMPSBot.css';

class JMPSBot extends Component {

  constructor(props){
    super(props);
    this.state={
      endGame: false,
      reqEnd: false
    }
  }
  componentWillMount(){
  }
  componentDidMount(){
    addResponseMessage(`Hi, I'm Baymax, your personal healthcare assistant`)
  }

  handleMessage = (message) =>{
    if(message.toLowerCase().includes('fuck'))
      setTimeout(() => {addResponseMessage('What the fuck?');}, 1000);
    else if(message.toLowerCase().includes('sex'))
      setTimeout(() => {addResponseMessage('I need to get laid!');}, 1000);
    else if(message.toLowerCase().includes('healthhub'))
      setTimeout(() => {
        addResponseMessage('Health Hub is a website made during HackNSUT');
      }, 1000);
    else if(message.toLowerCase().includes('hey') || message.toLowerCase().includes('hello') | message.toLowerCase().includes('hi'))
      setTimeout(() => {addResponseMessage(`Hello, please specify your problem`);}, 1000);
    else {
      this.requestMessageResponse(message);
    }
  }

  requestMessageResponse = (message) => {
    let error = false;
    fetch('/api/chatbot', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({message})
    })
    .then(response => {
      if(response.status!==200)
        error = true;
      return response.json();
    })
    .then((userData) => {
      if(error)
        throw(userData);
      addResponseMessage(userData);
    })
    .catch(err => {
        addResponseMessage(`Mr. ${this.props.userInfo.name}, I don't feel so good! `)
        addResponseMessage(`I am experiencing technical problems, please try again.`)
      this.setState({error: true, errorMessage: err});
    })
  }
  render() {
    return (
      <div>
        <Widget 
          handleNewUserMessage={this.handleMessage}
          title='Baymax'
          subtitle=''
          profileAvatar={arcreactor}
         />
      </div>
    );
  }
}

export default JMPSBot;
