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
      console.log("h: " + h);
      console.log("w: " + w);

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

      var speedModifier = 0.05;

      var speed = Math.ceil(greatest / speedModifier);

      return speed;

  }

}( jQuery ));

//----------------------------------------------
// DUMMY DATA______________


var word = "vocabulary";
const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;



//----------------------------------------------

// Function to get the Ultimate Json for audio links
function getUltimate(){
  return $.getJSON('../src/data/ultimate.json');
}




$('#test').on('click', function() {
  $(this).randomizeBlocks();
})


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// DOCUMENT READY
$(document).ready(function() {

  // if statemenet for if it's a new game
  // TODO: set the localstorage 'score' as zero once game ends

  if (window.localStorage.getItem('score') != null) {
    $('#score').text("Score: " + window.localStorage.getItem('score'));
  } else {
    window.localStorage.setItem('score', 0);
  }
  console.log(window.localStorage.getItem('score'));

  //Incrementing through a list of words stored in storage
  // var counter = window.localStorage.getItem('counter');
  var loWords = JSON.parse(window.localStorage.getItem('word_data'));
  // var word = "";
  // console.log("pre: " + counter);
  // if (counter < loWords.length) {
  //   word = loWords[counter];
  //   window.localStorage.setItem('counter', ++counter);
  // }



  var random = getRandomInt(loWords.length);
  console.log("random Number: " + random);
  console.log("loWords here: " + loWords[random]);
  word = loWords[random];

  loWords.splice(random, 1);
  // console.log(loWords);

  window.localStorage.setItem('word_data', JSON.stringify(loWords));


  //displaying syllables to html
  var listSyllables = [];
  listSyllables = syllabify(word);
  console.log(word)

  // console.log(listSyllables);
  // console.log(syllabify(word));
  // console.log(listSyllables.length);

  var addedList = [];

  let counter = 1;
  let clickedWord = "";
  let to_be_hooked = [];

  for (var i = 0; i < listSyllables.length; i++){
    //
    let div = document.createElement("div")
    div.className = "syllable";
    div.id = i + "";
    div.innerHTML = listSyllables[i];
    div.style.top = getRandomInt(window.innerHeight) / 1.5 + "px";
    div.style.left = getRandomInt(window.innerWidth) / 1.5 + "px";

    div.onclick = ()=>{
      if (div.getAttribute('id') < counter && div.style.backgroundColor != 'green'){
        div.style.backgroundColor = 'green';
        clickedWord += div.innerHTML;
        setTimeout(function() {
          checkCorrect(clickedWord);
        }, 100);

        console.log("yes")
        counter++;

      } else if (div.style.backgroundColor == 'green') {
        console.log("already selected syllable");
      } else {
        console.log ("no")
        div.style.backgroundColor = 'blue';
        setTimeout(function () {
          div.style.backgroundColor = 'white';
        }, 1500);
      }
    }

    // var div = $(`<div class="syllable" id="${i}">${listSyllables[i]}</div>`);

    // div.innerHTML = "hello";

    to_be_hooked.push(div);
    console.log(to_be_hooked)

  }

  to_be_hooked.forEach(element => {
    $('#mainContent').append(element);
  });




  //Loading audio file
  var audio = document.getElementById('word-audio');

  $('.syllable').randomizeBlocks();


  $('#half-speed').on('click', function() {
    audio.playbackRate = 0.5;
    document.getElementById("half-speed").style = "background-color:#FFD972";
    document.getElementById("quarter-speed").style = "background-color:#FCBCB8";
    document.getElementById("full-speed").style = "background-color:#FCBCB8";
    document.getElementById("two-speed").style = "background-color:#FCBCB8";
    

  });

  $('#quarter-speed').on('click', function() {
    audio.playbackRate = 0.75;
    document.getElementById("half-speed").style = "background-color:#FCBCB8";
    document.getElementById("quarter-speed").style = "background-color:#FFD972";
    document.getElementById("full-speed").style = "background-color:#FCBCB8";
    document.getElementById("two-speed").style = "background-color:#FCBCB8";
  });

  $('#full-speed').on('click', function() {
    audio.playbackRate = 1.0;
    document.getElementById("half-speed").style = "background-color:#FCBCB8";
    document.getElementById("quarter-speed").style = "background-color:#FCBCB8";
    document.getElementById("full-speed").style = "background-color:#FFD972";
    document.getElementById("two-speed").style = "background-color:#FCBCB8";
  });

  $('#two-speed').on('click', function() {
    audio.playbackRate = 2.0;
    document.getElementById("half-speed").style = "background-color:#FCBCB8";
    document.getElementById("quarter-speed").style = "background-color:#FCBCB8";
    document.getElementById("full-speed").style = "background-color:#FCBCB8";
    document.getElementById("two-speed").style = "background-color:#FFD972";
  });

  getUltimate().done(function(json) {
    console.log(json[word]);
    console.log(parseaws(word, json));
    $('#word-audio').attr('src', parseaws(word, json))
  })

  // var word = "vocabulary"
  // var syllables = ["vo", "ca", "bu", "lary", "test", "test", "test", "test"]
  var addedList = [];
  var attempts = 0;
  var attemptsDOM = document.createElement("P");
  attemptsDOM.id = "attempts";
  attemptsDOM.innerHTML = "Attempt: 0";
  document.body.appendChild(attemptsDOM);


  //
  // function checkCorrect(clickedWord) {
  //     if(clickedWord == word){
  //         setTimeout(function () {
  //             // window.alert("You won the game. Attempts: " + attempts);
  //             displayWin();
  //             location.reload();}, 5000);
  //     }
  // }



  // WIN EVENT FUNCTION
  function win() {
    window.localStorage.setItem('score', parseInt(window.localStorage.getItem('score')) + 1);
    console.log(window.localStorage.getItem('score'));
  }


  win();
  function checkCorrect(clickedWord) {
    if(clickedWord == word){
      displayWin();
        setTimeout(function () {
            // window.alert("You won the game.");

            location.reload();}, 3000);
    }
  }
  // Testing displaying win popup
  $(document).on('click', '#skip', function() {
    displayWin();
    setTimeout(function() {
      //TODO: check if all games are won if so go to this page:
      // "./"
      if (JSON.parse(window.localStorage.getItem('word_data')).length <= 0) {
        window.location.href = "./win/index.html";
      } else {
        window.location.href = window.location.href;
      }

    }, 5000);
  })


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

function displayWin() {
  $('#overlay-con').css('display', 'flex');
}
