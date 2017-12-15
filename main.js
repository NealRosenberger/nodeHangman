//requireD
var inquirer = require('inquirer');
var isLetter = require('is-letter');

var Word = require('./word.js');
var Game = require('./game.js');

var hangManDisplay = Game.newWord.hangman;

require('events').EventEmitter.prototype._maxListeners = 100;


var hangman = {
  wordBank: Game.newWord.wordList,
  guessesRemaining: 10,
  //empty array to hold guessed letter
  guessedLetters: [],
  //index to display graphic
  display: 0,
  currentWord: null,
  //asks user if they are ready to play
  startGame: function() {
    var that = this;
    //clears guessed letters
    if(this.guessedLetters.length > 0){
      this.guessedLetters = [];
    }

    inquirer.prompt([{
      name: "play",
      type: "confirm",
      message: "Ready for a drink?"
    }]).then(function(answer) {
      if(answer.play){
        that.newGame();
      } else{
        console.log("Fine, you seem like you already had to many.");
      }
    })},
  //starts new game.
  newGame: function() {
    if(this.guessesRemaining === 10) {
      console.log("What will you have?");
      console.log('*****************');
      //generates random number/word
      var randNum = Math.floor(Math.random()*this.wordBank.length);
      this.currentWord = new Word(this.wordBank[randNum]);
      this.currentWord.getLets();
      //displays blanks.
      console.log(this.currentWord.wordRender());
      this.keepPromptingUser();
    } else{
      this.resetGuessesRemaining();
      this.newGame();
    }
  },
  resetGuessesRemaining: function() {
    this.guessesRemaining = 10;
  },
  keepPromptingUser : function(){
    var that = this;
    //letter prompt
    inquirer.prompt([{
      name: "chosenLtr",
      type: "input",
      message: "Choose a letter:",
      validate: function(value) {
        if(isLetter(value)){
          return true;
        } else{
          return false;
        }
      }
    }]).then(function(ltr) {
 
      var letterReturned = (ltr.chosenLtr).toUpperCase();
      //adds to the guessedLetters array
      var guessedAlready = false;
        for(var i = 0; i<that.guessedLetters.length; i++){
          if(letterReturned === that.guessedLetters[i]){
            guessedAlready = true;
          }
        }
        //if the letter wasn't guessed already run through entire function, else reprompt user
        if(guessedAlready === false){
          that.guessedLetters.push(letterReturned);

          var found = that.currentWord.checkIfLetterFound(letterReturned);
          //wrong letter
          if(found === 0){
            console.log('Sorry, no dice on that.');
            that.guessesRemaining--;
            that.display++;
            console.log('Guesses remaining: ' + that.guessesRemaining);
            console.log(hangManDisplay[(that.display)-1]);

            console.log('\n*******************');
            console.log(that.currentWord.wordRender());
            console.log('\n*******************');

            console.log("Letters guessed: " + that.guessedLetters);
          } else{
            console.log('OK');
              //checks for win
              if(that.currentWord.didWeFindTheWord() === true){
                console.log(that.currentWord.wordRender());
                console.log('Congratulations! You won the game!!!');
                // that.startGame();
              } else{
                // guess left
                console.log('Guesses remaining: ' + that.guessesRemaining);
                console.log(that.currentWord.wordRender());
                console.log('\n*******************');
                console.log("Letters guessed: " + that.guessedLetters);
              }
          }
          if(that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
            that.keepPromptingUser();
          }else if(that.guessesRemaining === 0){
            console.log('Game over!');
            console.log('The drink you wanted was: ' + that.currentWord.word);
          }
        } else{
            console.log("You said that one already.")
            that.keepPromptingUser();
          }
    });
  }
}

hangman.startGame();