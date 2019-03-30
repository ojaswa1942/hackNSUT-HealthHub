export const FormFunctions = (last) => {
  // Variables
  var questions = last.state.questions;
  //var questions1 = last.state.questions1;
  var questions2 = last.state.questions2;
  var questions3 = last.state.questions3;
  var submitButton2 = document.getElementById('submitButton2');
  var loginButton3 = document.getElementById('loginButton3');
  var contact = document.getElementById('contact');
  var inputContainers2 = document.getElementsByClassName('inputContainer2');
  var inputContainers3 = document.getElementsByClassName('inputContainer3');
  var inputFields2 = document.getElementsByClassName('inputField2');
  var inputFields3 = document.getElementsByClassName('inputField3');
  //var inputLabels = document.getElementsByClassName('inputLabel0');
  //var inputLabels1 = document.getElementsByClassName('inputLabel1');
  var inputLabels2 = document.getElementsByClassName('inputLabel2');
  var inputLabels3 = document.getElementsByClassName('inputLabel3');
  //
  var tTime = 100  // transition transform time from #register in ms
  var wTime = 200  // transition width time from #register in ms

  // init
  var i = 0

  // putQuestion()
  // putQuestion1()
  putQuestion2()
  putQuestion3()

  submitButton2.addEventListener('click', validate2);
  loginButton3.addEventListener('click', validate3);
  // inputField.addEventListener('keyup', function(e){
  //   transform(0, 0) // ie hack to redraw
  //   if(e.keyCode === 13) validate()
  // })

  // functions
  // --------------

  // load the next question
  // function putQuestion() {
  //   for (i = 0; i < inputLabels.length; i++) {
  //       inputLabels[i].innerHTML = questions[i].question;
  //   }
  // }

  //  function putQuestion1() {
  //   for (i = 0; i < inputLabels1.length; i++) {
  //       inputLabels1[i].innerHTML = questions1[i].question;
  //   }
  // }

   function putQuestion2() {
    for (i = 0; i < inputLabels2.length; i++) {
        inputLabels2[i].innerHTML = questions2[i].question;
    }
  }

   function putQuestion3() {
    for (i = 0; i < inputLabels3.length; i++) {
        inputLabels3[i].innerHTML = questions3[i].question;
    }
  }
  
  // when all the questions have been answered
  function done() {    
    // remove the box if there is no next question
    contact.className = 'close'
    last.setState({questions, gotData: true});
    // window.location.href = '/events';
    
  }

  // when submitting the current question
  function validate2() {
    var flag = true;
    for (i = 0; i < inputFields2.length; i++) {
      if (questions2[i].type === 'emaill'){
        questions2[i].value = inputFields2[i].value.toLowerCase();
      }
      else
        questions2[i].value = inputFields2[i].value
      // check if the pattern matches
      if (!inputFields2[i].value.match(questions2[i].pattern || /.+/)) {
        flag = false;
        wrong(inputContainers2[i]);
      }
    }
    if (flag){
      ok(function() {
        hideCurrent2(done)              
      })
    }
  }

    function validate3() {
    var flag = true;
    for (i = 0; i < inputFields3.length; i++) {
      if (questions3[i].type === 'emaill'){
        questions3[i].value = inputFields3[i].value.toLowerCase();
      }
      else
        questions3[i].value = inputFields3[i].value
      // check if the pattern matches
      if (!inputFields3[i].value.match(questions3[i].pattern || /.+/)) {
        flag = false;
        wrong(inputContainers3[i]);
      }
    }
    if (flag){
      ok(function() {
        hideCurrent3(done)              
      })
    }
  }

  // helper
  // --------------

  function hideCurrent2(callback) {
    for (i = 0; i < inputContainers2.length; i++) {
      inputContainers2[i].style.opacity = 0;
    }
    setTimeout(callback, wTime)
  }
  function hideCurrent3(callback) {
    for (i = 0; i < inputContainers3.length; i++) {
      inputContainers3[i].style.opacity = 0;
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