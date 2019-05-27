window.addEventListener('load', init);
let time;
let score = 0;
var localStorageName="savedScore";
let hs;
if(localStorage.getItem(localStorageName) == null) {
    hs = 0;
} else {
    hs = Number(localStorage.getItem(localStorageName));
}
high.innerHTML=hs;

let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const currentLevel=document.querySelector('#level');

time=Number(currentLevel.value);

const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition'
];

// Initialize Game
function init() {
    //whenever user selects level it will call the set level function
    currentLevel.addEventListener('select',setLevel);
  // Show number of seconds in UI
  seconds.innerHTML = time;
  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;         //game chal rhi hai
    time = Number(currentLevel.value) + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
if(isPlaying==true)
    {
  // Make sure time is not run out   
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
    }
  // Show time
  timeDisplay.innerHTML = time; 
  
}

// Check game status
function checkStatus() 
{
  if (time === 0 && isPlaying===false) 
  {
    message.innerHTML = 'Game Over!!!';
            hs=Math.max(score,hs);
            storeHighScore();
    //restart.innerHTML ='Reset';
    score = -1;
      
  }
}


//restart of game
/*function restartGame()
{
    location.reload();
}
*/
function setLevel()
{
    isPlaying=false;
    time=Number(currentLevel.value);
    init();
}
function storeHighScore()
{
    if (typeof(Storage) !== "undefined") 
    {
    hs_string=hs.toString();
    localStorage.setItem(localStorageName,hs_string);
    hs_history=Number(localStorage.getItem(localStorageName));
    high.innerHTML=hs_history;
    }
    else 
    {
            console.log("No local Storage");
    }
}

