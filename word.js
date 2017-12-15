// require letter objects
var Letter = require('./letter.js');

function Word(wrd) {
  var that = this;
  //string wrd
  this.word = wrd;
  //letter objects
  this.letters = [];
  this.wordFound = false;

  this.getLets = function() {
    //populate new Letter objects
    for(var i = 0; i<that.word.length; i++){
      var newLetter = new Letter(that.word[i]);
      this.letters.push(newLetter);
    }
  };

  //found the current word
  this.didWeFindTheWord = function() {
    if(this.letters.every(function(lttr){
      return lttr.appear === true;
    })){
      this.wordFound = true;
      return true;
    }

  };

  this.checkIfLetterFound = function(guessedLetter) {
    var whatToReturn = 0;
    //run to check for letter
    this.letters.forEach(function(lttr){
      if(lttr.letter === guessedLetter){
        lttr.appear = true;
        whatToReturn++;
      }
    })
    //if letter matches show letter
    return whatToReturn;
  };

  this.wordRender = function() {
    var display = '';
    //render the word based on  guess
    that.letters.forEach(function(lttr){
      var currentLetter = lttr.letterRender();
      display+= currentLetter;
    });

    return display;
  };
}

module.exports = Word;