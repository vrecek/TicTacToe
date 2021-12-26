/**
 * CONST
*/
const fields = document.querySelectorAll('.board div');
const winHeader = document.querySelector('.info h1');
const turnText = document.querySelector('.info h2 span');
const restartBtn = document.querySelector('.info button');
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
turnText.textContent = "CROSS'S";
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

   turnText.textContent = whosMove ? "CROSS'S" : "CIRCLE'S";
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
      if(item.every(it => moves['far fa-circle'].indexOf(it) > -1)) winner = 'CIRCLE'
      if(item.every(it => moves['fas fa-times'].indexOf(it) > -1)) winner = 'CROSS'
   })
   
   if(winner) victory();
}

function victory(){
   const plrWin = winner.includes('CROSS') ? 'fas fa-times' : 'far fa-circle';

   turnText.parentElement.style.display = 'none';

   winHeader.innerHTML = `<i class='${plrWin}'></i> <span>${winner}</span> HAVE WON! <i class='${plrWin}'></i>`;
   winHeader.style.display = 'block';

   restartBtn.style.display = 'block';
}

/**
 * RESTART BUTTON
*/
restartBtn.addEventListener('click', () => {
   move = 1;
   turnText.textContent = "CROSS'S";
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
})