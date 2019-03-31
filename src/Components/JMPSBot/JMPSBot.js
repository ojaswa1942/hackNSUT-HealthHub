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
  }

  handleMessage = (message) =>{
    if(message.toLowerCase().includes('fuck'))
      setTimeout(() => {addResponseMessage('What the fuck?');}, 1000);
    else if(message.toLowerCase().includes('sex'))
      setTimeout(() => {addResponseMessage('I need to get laid!');}, 1000);
    else if(message.toLowerCase().includes('infotsav'))
      setTimeout(() => {
        addResponseMessage('Infotsav is the techno-managerial fest of ABV-IIITM, Gwalior. You can know more about Infotsav here:');
        addLinkSnippet({title: `Infotsav'19`, link: `https://www.infotsav.in`, target: `_blank`})
      }, 1000);
    else if(message.toLowerCase().includes('score'))
      setTimeout(() => {addResponseMessage(`Your score is ${this.props.userGameInfo.score}`);}, 1000);
    else if(message.toLowerCase().includes('help'))
      setTimeout(() => {addResponseMessage(`You can always use the hint if you need help.`);}, 1000);
    else if(message.toLowerCase().includes('hey') || message.toLowerCase().includes('hello') | message.toLowerCase().includes('hi'))
      setTimeout(() => {addResponseMessage(`Just play the game already!`);}, 1000);
    else {
      this.requestMessageResponse(message);
    }
  }

  successList = [
    `Wohooo! You made it to the next question!`,
    `YOU ARE SO SMART!!`,
    `Success! Success! Success!`,
    `I repeat, mission successful!`,
    `I knew you'd do it.. Congratulations!`,
    `Was the question lame?.. or was it your brain? Celebrations!`,
    `You are awesome! Cheers!!`,
    `Enemy Down! Wonderful performance!`
  ];

  failureList = [
    `Ah! That's the wrong answer.. Try again?`,
    `Such a failure..`,
    `Is the question tough? ..or is it your brain?`,
    `HAHAHAH! WRONG ANSWER!!`,
    `Nice try buddy, you can accept your defeat!`,
    `Time to give up!`,
    `I don't get it.. Try again`,
    `Time for a hint?`,
    `Quick fact: These questions were framed by extremely intelligent beings..  
    Try Again!`,
    `Awww! So cute.. try again!`,
    `Well, you can always give up`,
    `You can always contact my creators,
    they will never help you`,
    `You are as fast as a turtle, don't give up!`
  ];

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
      if(userData.successHint){
        addResponseMessage(userData.message);
      }
      else if(userData.success){
        this.props.updateUserGameInfo(userData);
        addResponseMessage(this.successList[Math.floor(Math.random()*(this.successList.length))]);
        if(userData.end){
          this.setState({endGame: true});
          addResponseMessage(`That's the end, my friend!  
            *Plays See You Again*`);
          toggleInputDisabled();
        }
      }
      else{
        addResponseMessage(this.failureList[Math.floor(Math.random()*(this.failureList.length))]);
        // this.props.history.push('/play/awsfewhfv/value');
      }
    })
    .catch(err => {
      console.log(err);
      var now = new Date();
      var startTime = new Date('09/02/2019 01:00:00 AM');
      var endTime = new Date('09/02/2019 03:00:00 AM');
      if(now<startTime || now>endTime){
        addResponseMessage(`TIME UP!!`)
      }
      else{
        addResponseMessage(`Mr. ${this.props.userInfo.name}, I don't feel so good! `)
        addResponseMessage(`I am experiencing technical problems, please try again.`)
      }
      this.setState({error: true, errorMessage: err});
    })
  }
  render() {
    if(this.props.updated3Res && !this.state.reqEnd){
      this.setState({reqEnd: true});
      this.requestMessageResponse('smartverysmart');
    }
    // let {badge} = this.props;
    return (
      <div>
        <Widget 
          handleNewUserMessage={this.handleMessage}
          title='JMPS'
          subtitle=''
          profileAvatar={arcreactor}
         />
      </div>
    );
  }
}

export default JMPSBot;
