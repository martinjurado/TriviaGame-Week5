// Question Set

var questions = [{

q: "When did the first episode of 'Friends' air?", 
answers: ["1994", "1992", "1996", "1991"],
image: "assets/Images/gif1.gif",
correctAnswer: "1994"
},

{

q: "Who was Phoebe Buffay's alter ego?",
answers: ["Elizabeth Stevens", "Mona", "Janice Litman-Goralnik", "Regina Phalange"],
image: "assets/Images/gif2.gif",
correctAnswer: "Regina Phalange"
},

{
  q: "Which part of New York is Rachel from?",
  answers: ["Manhattan", "Staten Island", "Long Island", "Albany"],
  image: "assets/Images/gif3.gif",
  correctAnswer: "Long Island"
},

{
  q: "Who sings the theme-song 'I'll be there for you'?",
  answers: ["Goo-Goo Dolls", "The Rembrandts", "Smash Mouth", "R.E.M"],
  image: "assets/Images/gif4.gif",
  correctAnswer: "The Rembrandts"
},

{
  q: "What is the name of Ross Geller's monkey?",
  answers: ["Fred", "Marcel", "Bob", "Gina"],
  image: "assets/Images/gif5.gif",
  correctAnswer: "Marcel"
},

{
  q: "What year did Friends end their final season?",
  answers: ["2004", "2001", "2005", "2002"],
  image: "assets/Images/gif6.gif",
  correctAnswer: "2004"
},

{
  q: "What is the name of Phoebe's twin sister?",
  answers: ["Regina Phalange", "Mary Angela", "Ursula Buffay", "Monica Geller"],
  image: "assets/Images/gif7.gif",
  correctAnswer: "Ursula Buffay"
}];

var questionCard = $("#currentQuestion");
var countNumber = 15;
var timer;

var game = {

    // counters
    questions: questions,
    currentQuestion: 0,
    counter: countNumber,
    correct: 0,
    incorrect: 0,

    // countdown
    countdown: function() { //DISPLAYS THE TIME YOU HAVE TO ANSWER IT 

    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() { // DISPLAYS THE CURRENT QUESTION AND CURRENT ANSWERS

    timer = setInterval(game.countdown, 1000); // 1 second
    questionCard.html("<h3>" + questions[this.currentQuestion].q + "</h3>");
   
    // loop through the array of questions
    for( var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      
      // answer buttons
      questionCard.append("<button class='answer-button btn btn-info' data-name = '" + questions[this.currentQuestion].answers[i] 
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() { // DISPLAYS THE NEXT QUESTION
  
    game.counter = countNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() { // DISPLAYS TIME-UP 
 
  clearInterval(timer);
  $("#counter-number").html(game.counter);
  questionCard.html("<h3>Out of Time! </h3>");
  questionCard.append("<h4>The correct answer was " + questions[this.currentQuestion].correctAnswer);
  questionCard.append("<img src='" + questions[this.currentQuestion].image + "' />");

  if (game.currentQuestion === questions.length - 1){
    
    setTimeout(game.results, 3 * 1000);
  } 
  else {
  
    setTimeout(game.nextQuestion, 3 * 1000);
  }
  
  }, 

results: function() { // DISPLAYS RESULTS

  clearInterval(timer);
  
  questionCard.html("<h2> All done here's how you did!</h2>");
  
  $("#counter-number").text(game.counter);

  questionCard.append("<h3> Correct Answers: " + game.correct + "</h3>");
  questionCard.append("<h3> Incorrect Answers: " + game.incorrect + "</h3>");
  questionCard.append("<h3> Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
  questionCard.append("<br><button id='start-over' class='btn btn-warning'>Play Again?</button>");

  },

clicked: function(e) { // DETERMINES IF BUTTON CLICKED IS THE RIGHT/WRONG ANSWER

  clearInterval(timer);

  if ($(e.target).attr("data-name") ===  questions[this.currentQuestion].correctAnswer) {
    
    this.answeredCorrectly();
    
  }

  else {
    
    this.answeredIncorrectly();
    console.log(e.target); 
    console.log(questions[this.currentQuestion].correctAnswer)
  }
  
  },

answeredIncorrectly: function() { // DISPLAYS WRONG ANSWER PAGE
  
  game.incorrect++;

  clearInterval(timer);

  questionCard.html("<h3>Could you be anymore wrong?</h3>");
  questionCard.append("<h4>The right answer is: " + questions[game.currentQuestion].correctAnswer + "</h4>");
  questionCard.append("<img src='" + questions[game.currentQuestion].image + "' />");

  if(game.currentQuestion === questions.length - 1) {
    setTimeout(game.results, 3 * 1000);
  }
  else {
    setTimeout(game.nextQuestion, 3 * 1000);
  }
  
  }, 

answeredCorrectly: function() { // DISPLAYS RIGHT ANSWER

  clearInterval(timer);
  
  game.correct++;

  questionCard.html("<h3> Correct! Yeah Baby!</h3>");
  questionCard.append("<img src='" + questions[game.currentQuestion].image + "' />");

  if (game.currentQuestion === questions.length - 1 ){
    setTimeout(game.results, 3 * 1000);
  }
  else {
    setTimeout(game.nextQuestion, 3 * 1000);
  }

  },

reset: function() {

  this.currentQuestion = 0;
  this.counter = countNumber;
  this.correct = 0;
  this.incorrect = 0;
  this.loadQuestion();
  }

};

// On Click Events 

$(document).on("click", "#start-over", function(){
game.reset();
});

$(document).on("click", ".answer-button", function(e) {
game.clicked(e);
});

$(document).on("click", ".startlink", function(){
  $(".startlink").hide();
  $(".intro").hide();
  $(".happy").hide();
  $("#timeLeft").prepend("<h4> Time Remaining: <span id='counter-number'>15</span> Seconds </h4>");
  game.loadQuestion();
});