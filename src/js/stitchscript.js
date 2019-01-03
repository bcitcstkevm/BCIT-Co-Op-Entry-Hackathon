/** randomizeBlocks Jquery Plugin.
* Simple jquery plugin to randomize block movements
* Divs must be first fixed to work.
* Call on an array of jquery object.
*/
(function($) {

  $.fn.randomizeBlocks = function() {
    return this.each(function() {
            animateDiv($(this));
    });
  };

  function makeNewPosition($container) {
      // Get viewport dimensions (remove the dimension of the div)
      var h = $container.height() - 10;
      var w = $container.width() - 10;

      var nh = Math.floor(Math.random() * h);
      var nw = Math.floor(Math.random() * w);

      return [nh, nw];

  }

  function animateDiv($target) {
      var newq = makeNewPosition($target.parent());
      var oldq = $target.offset();
      var speed = calcSpeed([oldq.top, oldq.left], newq);

      $target.animate({
          top: newq[0],
          left: newq[1]
      }, speed, function() {
          animateDiv($target);
      });

  };

  function calcSpeed(prev, next) {

      var x = Math.abs(prev[1] - next[1]);
      var y = Math.abs(prev[0] - next[0]);

      var greatest = x > y ? x : y;

      var speedModifier = 0.1;

      var speed = Math.ceil(greatest / speedModifier);

      return speed;

  }

}( jQuery ));

//----------------------------------------------
// DUMMY DATA______________


var dummy = "vocabulary";
const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;



//----------------------------------------------

// Function to get the Ultimate Json for audio links
function getUltimate(){
  return $.getJSON('../src/data/ultimate.json');
}




$('#test').on('click', function() {
  $(this).randomizeBlocks();
})



// DOCUMENT READY
$(document).ready(function() {

<<<<<<< HEAD:src/js/mainscript.js
  
  word_list = window.localStorage.getItem('word_data');

  console.log(word_list[0])
=======
  //Incrementing through a list of words stored in storage
  // var counter = window.localStorage.getItem('counter');
  var loWords = JSON.parse(window.localStorage.getItem('word_data'));
  var word = "";
  // console.log("pre: " + counter);
  // if (counter < loWords.length) {
  //   word = loWords[counter];
  //   window.localStorage.setItem('counter', ++counter);
  // }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  var random = getRandomInt(loWords.length);
  console.log(random);
  console.log(loWords[random]);
  word = loWords[random];
  loWords.splice(random, 1);
  console.log(loWords);

  window.localStorage.setItem('word_data', JSON.stringify(loWords));


  //displaying syllables to html
  var listSyllables = [];
  listSyllables = syllabify(word);

  console.log(listSyllables);
  console.log(syllabify(word));
  console.log(listSyllables.length);

  var addedList = [];

  for (var i = 0; i < listSyllables.length; i++){
    var counter = 1;
    var clickedWord = "";
    var div = $(`<div class="syllable" id="${i}">${listSyllables[i]}</div>`);
    $('#mainContent').append(div);
    $('#mainContent div').on('click', function clickHandler(){
      console.log(div);
      if(div.attr('id') < counter){
        $(this).css('background-color', 'green');
        console.log("hello");
        clickedWord += div.innerHTML;
        checkCorrect(clickedWord);
        counter++;
      }else{
        div.style = "background-color: blue;"
        setTimeout(function () {
          div.style = "background-color: white;"
        }, 1000);
      }
    })
  }
<<<<<<< HEAD
  

>>>>>>> f94d2b401c854d58895a86b027c8e236a0945c54:src/js/stitchscript.js
=======
>>>>>>> a3cfaaac0b9b8472c121e916a6e3253c6017d534

  function checkCorrect(clickedWord) {
    if(clickedWord === word){
        setTimeout(function () {
            window.alert("You won the game.");
            location.reload();}, 0);
    }
}
  

  
  //Loading audio file
  var audio = document.getElementById('word-audio');

  $('.syllable').randomizeBlocks();


  $('#half-speed').on('click', function() {
    audio.playbackRate = 0.5;
  });

  $('#quarter-speed').on('click', function() {
    audio.playbackRate = 0.75;
  });

  $('#full-speed').on('click', function() {
    audio.playbackRate = 1.0;
  });

  $('#two-speed').on('click', function() {
    audio.playbackRate = 2.0;
  });

  getUltimate().done(function(json) {
    // console.log(json[dummy]);
    // console.log(parseaws(dummy, json));
    $('#word-audio').attr('src', parseaws(dummy, json))
  })

  var word = "vocabulary"
  var syllables = ["vo", "ca", "bu", "lary", "test", "test", "test", "test"]
  var addedList = [];
  var attempts = 0;
  var attemptsDOM = document.createElement("P");
  attemptsDOM.id = "attempts";
  attemptsDOM.innerHTML = "Attempt: 0"; 
  document.body.appendChild(attemptsDOM);
  

  
  function checkCorrect(clickedWord) {
      if(clickedWord === word){
          setTimeout(function () {
              window.alert("You won the game. Attempts: " + attempts);
              location.reload();}, 0);
      }
  }
  



})

//match:
//zero or more set of constant, then
//one or more set of set of vowels, then,
//either:
//consonant followed by end of word, or,
//consonant followed by another consonant

function syllabify(words) {
    //takes a string and returns a list
    return words.match(syllableRegex);
}


function parseaws(word, json) {
  var loLinks = json[word];
  for (var i = 0; i < loLinks.length; i++) {
    if (loLinks[i].startsWith("http://s3.amazonaws.com")) {
      return loLinks[i];
    }

  }
}

