const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");


let currQuestion = {}
let answers = true
let score = 0
let quesCounter = 0
let avaQuestions = []

// my array of objects (trivia questions)
let questions = [
      {
        question: "In terms of its total area, which is the largest New York City borough?",
        choice1: "Queens",
        choice2: "Brooklyn",
        choice3: "Bronx",
        choice4: "Manhattan",
        
        answer: "Queens"
      }, 
      
      {
        question: "How many acres is Central Park?",
        choice1: "900",
        choice2: "357",
        choice3: "843",
        choice4: "215",
        
        answer: 843
      },
      
      {
        question: "What was the original name of New York City?",
        choice1: "New Paris",
        choice2: "Niew Dutch",
        choice3: "New London",
        choice4: "Nieu Amsterdam",
        
        answer: "Nieu Amsterdam"
      },
     
      {
        question: "When did the New York Subway open?",
        choice1: "1856",
        choice2: "1984",
        choice3: "1904",
        choice4: "2015",
        
        answer: 1904
      },
      
      {
        question: "How many items are there in the New York Public Library?",
        choice1: "27 million",
        choice2: "10 million",
        choice3: "9 million",
        choice4: "53 million",
        
        answer: "53 million"
      }
]

const score_points  = 100
const max_questions = 5

startGame = () => {
  quesCounter = 0;
  score = 0;
  avaQuestions = [...questions];
  
  getNewQuestion()
}


  let getNewQuestion = () => {
  if(avaQuestions.length === 0 || quesCounter > max_questions) {
    localStorage.setItem('recentScore', score)

    return window.location.assign("/end.html")
  }

// keep track of questions
  quesCounter++
  progressText.innerText = `Question ${quesCounter} of ${max_questions}`
  progressBarFull.style.width = `${(quesCounter/max_questions) * 100}%`
// randomize quesions
  const questionsIndex= Math.floor(Math.random() * avaQuestions.length)
// keeping track of which question we are on and which question to ask
  currQuestion = avaQuestions[questionsIndex]
  question.innerText = currQuestion.question

  choices.forEach((choices) =>{
    const number = choices.dataset['number']
    choices.innerText = currQuestion['choice' + number]
  })  
// changes the  array content by removing or replacing element
  avaQuestions.splice(questionsIndex, 1)

  answers = true

}

choices.forEach((choices) => {
  choices.addEventListener('click', e=> {
    if(!answers) return

     answers = false
     const selectedChoice = e.target
     const selectedAnswer = selectedChoice.innerHTML;
     let classToApp = selectedAnswer == currQuestion.answer ? 'correct': 'incorrect'
      if(classToApp === 'correct' ) {
        score+=score_points
        scoreText.innerHTML = score
      }
      
      selectedChoice.parentElement.classList.add(classToApp)
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApp)
        getNewQuestion()
      
      }, 1000)

  })
})


incrementScore = num => {
}
 startGame()  



