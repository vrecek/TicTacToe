
/**
 * LOCALSTORAGE 
*/
let xscore = 0, oscore = 0;
const [X_score, O_score] = document.querySelectorAll('.score h4');
if(JSON.parse(localStorage.getItem('save'))){
   xscore = JSON.parse(localStorage.getItem('CrossScore'));
   oscore = JSON.parse(localStorage.getItem('CircleScore'));
   X_score.textContent = xscore;
   O_score.textContent = oscore;
}else{
   xscore = 0;
   oscore = 0;
}

let crossPlayer = JSON.parse(localStorage.getItem('crossPlr'));
if(!crossPlayer) crossPlayer = 'Cross';

let circlePlayer = JSON.parse(localStorage.getItem('circlePlr'));
if(!circlePlayer) circlePlayer = 'Circle';

document.querySelector('.cross h3 span').textContent = crossPlayer;
document.querySelector('.circle h3 span').textContent = circlePlayer;


/**
 * CONST
*/
const fields = document.querySelectorAll('#b-field');
const winHeader = document.querySelector('.info h1');
const turnText = document.querySelector('.info h2 span');
const restartBtn = document.querySelector('.info button');

const soundBtn = document.querySelector('.sound i');
const sound = new Audio('./music.mp3');

const combos = [
   [0,1,2], [3,4,5], [6,7,8],
   [0,3,6], [1,4,7], [2,5,8],
   [0,4,8], [2,4,6]
]
/* -------------------------------------------------------- */

/**
 * RESET EVERY WIN 
*/
let move = 1;
turnText.textContent = crossPlayer;
turnText.style.color = 'rgb(0, 190, 0)';
let winner = null;
let board = [
   ['','',''],
   ['','',''],
   ['','','']
]
/* -------------------------------------------------------- */


fields.forEach(item => item.addEventListener('click', clicked));
function clicked(e){
   e.target.className = 'disabled';

   const whosMove = move % 2 === 0 ? true : false;

   const plr = whosMove ? 'far fa-circle' : 'fas fa-times'; 
   const i = document.createElement('i');
   i.className = plr;
   e.target.appendChild(i);

   const {col, row} = e.target.dataset;
   board[row][col] = plr;

   check();

   move++;

   turnText.textContent = whosMove ? crossPlayer : circlePlayer;
   turnText.style.color = whosMove ? 'rgb(0, 190, 0)' : 'red';
}

function check(){
   const reduced = board.reduce((prev, curr) => prev.concat(curr));

   const moves = {
      'far fa-circle': [],
      'fas fa-times': [],
   }

   reduced.forEach((item,index) => {
      moves[item] ? moves[item].push(index) : null;
   })
   
   combos.forEach(item => {
      if(item.every(it => moves['far fa-circle'].indexOf(it) > -1)) winner = circlePlayer
      if(item.every(it => moves['fas fa-times'].indexOf(it) > -1)) winner = crossPlayer
   })
   
   if(winner) victory();
}


/**
 * VICTORY
*/
function victory(){
   const plrWin = winner.includes(crossPlayer) ? 'fas fa-times' : 'far fa-circle';

   fields.forEach(it => it.className = 'disabled');

   setScore(plrWin);
   
   turnText.parentElement.style.display = 'none';

   winHeader.innerHTML = `<i class='${plrWin}'></i> <span>${winner}</span> HAVE WON! <i class='${plrWin}'></i>`;
   winHeader.style.display = 'block';

   restartBtn.style.display = 'block';
}

function setScore(plr){
   if(JSON.parse(localStorage.getItem('save'))){
      if(plr === 'fas fa-times'){
         xscore++;
         X_score.textContent = xscore;
         localStorage.setItem('CrossScore', JSON.stringify(xscore));
      }else{
         oscore++;
         O_score.textContent = oscore;
         localStorage.setItem('CircleScore', JSON.stringify(oscore));
      }
   }else{     
      if(plr === 'fas fa-times'){
         xscore++;
         X_score.textContent = xscore;
      }else{
         oscore++;
         O_score.textContent = oscore;
      }
   }
}

/**
 * RESTART BUTTON
*/
restartBtn.addEventListener('click', () => {
   move = 1;
   turnText.textContent = crossPlayer;
   turnText.style.color = 'rgb(0, 190, 0)';
   winner = null;
   board = [
      ['','',''],
      ['','',''],
      ['','','']
   ]

   fields.forEach(it => {
      it.textContent = '';
      it.className = '';
   });

   winHeader.style.display = 'none';

   turnText.parentElement.style.display = 'block';

   restartBtn.style.display = 'none';
})

/**
 * SOUND TOGGLE
*/
soundBtn.addEventListener('click', () => {
   if(sound.paused){
      soundBtn.className = 'fas fa-volume-down';
      sound.play();
   }else{
      soundBtn.className = 'fas fa-volume-mute';
      sound.pause();
   }
})

/**
 * BACK TO MENU
*/
document.querySelector('.home').addEventListener('click', () => window.location.href='./index.html');