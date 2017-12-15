var Letter = function(ltr) {
// store letter
  this.letter = ltr;

  this.appear = false;

  this.letterRender = function() {
    if(this.letter == ' '){ 
      this.appear = true;
      return '  ';
    }if(this.appear === false){ 
      /*if wnot there returns a  _ */
      return ' _ ';
    } else{ 
      /*otherwise it just appears as itself*/
      return this.letter;
    }

  };
};

// exportto word.js
module.exports = Letter;