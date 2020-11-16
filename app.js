/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'In which state was the constitution signed?',
      answers: [
        'Massachusettes',
        'Vermont',
        'Connecticut',
        'New York'
      ],
      correctAnswer: 'Connecticut'
    },
    {
      question: 'During which season does New England see the most tourism?',
      answers: [
        'Fall',
        'Spring',
        'Summer',
        'Winter'
      ],
      correctAnswer: 'Fall'
    },
    {
      question: 'Which of these foods is New England known for?',
      answers: [
        'Milk',
        'Maple Syrup',
        'Pumpkin Pie',
        'Corn'
      ],
      correctAnswer: 'Maple Syrup'
    },
    {
      question: 'Which of these states is *not* in New England?',
      answers: [
        'Rhode Island',
        'New Hampshire',
        'New York',
        'Massachusettes'
      ],
      correctAnswer: 'New York'
    },
    {
      question: 'What is the largest city in New England?',
      answers: [
        'Providence',
        'Portland',
        'Hartford',
        'Boston'
      ],
      correctAnswer: 'Boston'
    },
    {
      question: 'Which state is Ben & Jerrys ice cream from?',
      answers: [
        'Maine',
        'Vermont',
        'New Hampshire',
        'Massachusettes'
      ],
      correctAnswer: 'Vermont'
    },
    {
      question: 'What hiking trail starts in Maine and runs south through New England?',
      answers: [
        'Green Mountain Trail',
        'Atlantic Crest Trail',
        'Appalachian Trail',
        'White Mountain Trail'
      ],
      correctAnswer: 'Appalachian Trail'
    },
    {
      question: 'What is the smallest state in New England?',
      answers: [
        'Rhode Island',
        'New Hampshire',
        'Vermont',
        'Connecticut'
      ],
      correctAnswer: 'Rhode Island'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

// Generate the HTML for the start screen
function generateStartScreen() {
  return `
  <div class="start-screen">
    <h3>Test your knowledge about New England!</h3>
    <button type="button" id="start">Start</button>
  </div>
  `;
}

// Generate the HTML for the question counter and score counter
function generateQuestionCounterAndScoreCounter() {
  return `
  <ul class="question-and-score">
    <li id="question-counter">
      Question: ${store.currentQuestion + 1}/${store.questions.length}
    </li>
    <li id="score-counter">
      Score: ${store.score}/${store.questions.length}
    </li>
  </ul>    
  `;
}

// Generate the HTML to display answers
function generateAnswers() {
  const answersArray = store.questions[store.currentQuestion].answers
  let answers = '';
  let i = 0;

  answersArray.forEach(answer => {
    answers += `
      <div id="option-container-${i}">
        <input type="radio" name="options" id="option${i + 1}" value="${answer}" required>
        <label for="option${i + 1}"> ${answer}</label>
      </div>  
    `;
    i ++;    
  });
  return answers;
}

// Generate the HTML to display a question
function generateQuestion() {
  let currentQuestion = store.questions[store.currentQuestion];
  return `
    <form id="question-form" class="question-form">
      <fieldset>
        <div class="question">
          <legend>${currentQuestion.question}</legend>
        </div>
        <div class="options">
          <div class="answers">
            ${generateAnswers()}
          </div>
        </div>
        <button type="submit" id="submit-button">Submit</button>
        <button class="hidden" type="button" id="next-question-button">Next</button>
      </fieldset>
    </form>         
  `;
}

// Generate the HTML for the results screen
function generateFinalScreen() {
  return `
    <div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div class="row">
            <legend>You scored ${store.score}/${store.questions.length}. Great job!</legend>
          </div>
          <div class="row">
            <button type="button" id="restart">Restart</button>
          </div>
        </fieldset>
    </form>
    </div>
  `;
}

function generatePopup(answerStatus) {
  let correctAnswer = store.questions[store.currentQuestion].correctAnswer;
  let string = '';
  if (answerStatus === 'correct') {
    string = `
    <div class="correct">  Correct!</div>
    `;
  }
  else if (answerStatus === 'incorrect') {
    string = `
      <div class="incorrect">  Incorrect. The correct answer is ${correctAnswer}.</div>
    `;
  }
  return string;
  $('button').removeClass('hidden');
}
/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function render() {
  let html = '';

  if (store.quizStarted === false) {
    $('main').html(generateStartScreen());
    return;
  }
  else if (store.currentQuestion >= 0 && store.currentQuestion < store.questions.length) {
    html = generateQuestionCounterAndScoreCounter();
    html += generateQuestion();
    $('main').html(html);
  }
  else {
    $('main').html(generateFinalScreen());
  }
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

// Handles clicking "Start" button to start the quiz
function handleStartClick() {
  $('main').on('click', '#start', function (event) {
    store.currentQuestion = 0
    store.quizStarted = true;
    render();
  });
}

// Handles clicking "Next" button after answering & receiving pop-up 
function handleNextClick() {
  $('body').on('click', '#next-question-button', (event) => {
    render();
  });
}

// Handles clicking "Submit" to submit an answer
function handleSubmitClick() {
  $('body').on('submit', '#question-form', function (event) {
    event.preventDefault();
    const currentQuestion = store.questions[store.currentQuestion];

    let selectedOption = $('input[name=options]:checked').val();
 
    let optionContainerId = `#option-container-${currentQuestion.answers.findIndex(i => i === selectedOption)}`;

    if (selectedOption === currentQuestion.correctAnswer) {
      store.score++;
      $(optionContainerId).append(generatePopup('correct'));
    }
    else {
      $(optionContainerId).append(generatePopup('incorrect'));
    }
    store.currentQuestion++;
    // hide the submit button
    $('#submit-button').hide();
    // disable all inputs
    $('input[type=radio]').each(() => {
      $('input[type=radio]').attr('disabled', true);
    });
    // show the next button
    $('#next-question-button').show();

  });
}

// Resets & restarts quiz
function restartQuiz() {
  store.quizStarted = false;
  store.currentQuestion = 0;
  store.score = 0;
}

function handleRestartClick() {
  $('body').on('click', '#restart', () => {
    restartQuiz();
    render();
  });
}

function handleQuizApp() {
  render();
  handleStartClick();
  handleNextClick();
  handleSubmitClick();
  handleRestartClick();
}

$(handleQuizApp);