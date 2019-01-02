var word = "vocabulary"
var syllables = ["vo", "ca", "bu", "lary", "test", "test", "test", "test"]
var addedList = [];
var attempts = 0;
var attemptsDOM = document.createElement("P");
attemptsDOM.id = "attempts";
attemptsDOM.innerHTML = "Attempt: 0"; 
document.body.appendChild(attemptsDOM);


for(var i=0; i < syllables.length; i++){
    let btns = document.createElement("BUTTON");
    var counter = 1;
    var clickedWord = "";
    btns.id = i;
    btns.innerHTML = syllables[i];
    btns.addEventListener('click', function clickHandler(event){
        if(btns.id < counter){
            btns.style = "background: green; outline: none; font-weight: 600;"
            clickedWord += btns.innerHTML;
            checkCorrect(clickedWord);
            counter++;
        }else{
            btns.style = "background: red; outline: none;"
            setTimeout(function () {
                btns.style = "background: white; outline: none;"
            }, 1000);
            attempts++;
            document.getElementById("attempts").innerHTML = "Attempts: " + attempts;
        }
    });
    addedList.push(btns);
}

for(var j=0; j < addedList.length; j++){
    document.body.appendChild(addedList[j]);
}

function checkCorrect(clickedWord) {
    if(clickedWord === word){
        setTimeout(function () {
            window.alert("You won the game. Attempts: " + attempts);
            location.reload();}, 0);
    }
}
