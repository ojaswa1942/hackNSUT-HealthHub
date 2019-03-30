export const FormFunctions = (last) => {
  // Variables
  var questions = last.state.questions;
  var questions1 = last.state.questions1;
  //var questions2 = last.state.questions2;
  //var questions3 = last.state.questions3;
  var submitButton = document.getElementById('submitButton0');
  var loginButton1 = document.getElementById('loginButton1');
  var contact = document.getElementById('contact');
  var inputContainers = document.getElementsByClassName('inputContainer0');
  var inputContainers1 = document.getElementsByClassName('inputContainer1');
  var inputFields = document.getElementsByClassName('inputField0');
  var inputFields1 = document.getElementsByClassName('inputField1');
  var inputLabels = document.getElementsByClassName('inputLabel0');
  var inputLabels1 = document.getElementsByClassName('inputLabel1');
  //var inputLabels2 = document.getElementsByClassName('inputLabel2');
  //var inputLabels3 = document.getElementsByClassName('inputLabel3');
  //
  var tTime = 100  // transition transform time from #register in ms
  var wTime = 200  // transition width time from #register in ms

  // init
  var i = 0

  putQuestion()
  putQuestion1()
  // putQuestion2()
  // putQuestion3()

  submitButton.addEventListener('click', validate);
  loginButton1.addEventListener('click', validate1);
  // inputField.addEventListener('keyup', function(e){
  //   transform(0, 0) // ie hack to redraw
  //   if(e.keyCode === 13) validate()
  // })

  // functions
  // --------------

  // load the next question
  function putQuestion() {
    for (i = 0; i < inputLabels.length; i++) {
        inputLabels[i].innerHTML = questions[i].question;
    }
  }

   function putQuestion1() {
    for (i = 0; i < inputLabels1.length; i++) {
        inputLabels1[i].innerHTML = questions1[i].question;
    }
  }

  //  function putQuestion2() {
  //   for (i = 0; i < inputLabels2.length; i++) {
  //       inputLabels2[i].innerHTML = questions2[i].question;
  //   }
  // }

  //  function putQuestion3() {
  //   for (i = 0; i < inputLabels3.length; i++) {
  //       inputLabels3[i].innerHTML = questions3[i].question;
  //   }
  // }
  
  // when all the questions have been answered
  function done() {    
    // remove the box if there is no next question
    contact.className = 'close'
    last.setState({questions, gotData: true});
    // window.location.href = '/events';
    
  }

  // when submitting the current question
  function validate() {
    var flag = true;
    for (i = 0; i < inputFields.length; i++) {
      if (questions[i].type === 'emaill'){
        questions[i].value = inputFields[i].value.toLowerCase();
      }
      else
        questions[i].value = inputFields[i].value
      // check if the pattern matches
      if (!inputFields[i].value.match(questions[i].pattern || /.+/)) {
        flag = false;
        wrong(inputContainers[i]);
      }
    }
    if (flag){
      ok(function() {
        hideCurrent(done)              
      })
    }
  }

    function validate1() {
    var flag = true;
    for (i = 0; i < inputFields1.length; i++) {
      if (questions1[i].type === 'emaill'){
        questions1[i].value = inputFields1[i].value.toLowerCase();
      }
      else
        questions1[i].value = inputFields1[i].value
      // check if the pattern matches
      if (!inputFields1[i].value.match(questions1[i].pattern || /.+/)) {
        flag = false;
        wrong(inputContainers1[i]);
      }
    }
    if (flag){
      ok(function() {
        hideCurrent1(done)              
      })
    }
  }

  // helper
  // --------------

  function hideCurrent(callback) {
    for (i = 0; i < inputContainers.length; i++) {
      inputContainers[i].style.opacity = 0;
    }
    setTimeout(callback, wTime)
  }
  function hideCurrent1(callback) {
    for (i = 0; i < inputContainers1.length; i++) {
      inputContainers1[i].style.opacity = 0;
    }
    setTimeout(callback, wTime)
  }
  function transform(x, y, container) {
    container.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
  }

  function ok(callback) {
    contact.className = ''
    setTimeout(callback,  tTime * 2)
  }

  function wrong(container) {
    container.classList.add('wrong');
    for(var i = 0; i < 6; i++) // shaking motion
      setTimeout(transform, tTime * i, (i%2*2-1)*20, 0, container)
    setTimeout(transform, tTime * 6, 0, 0, container)
  }
}