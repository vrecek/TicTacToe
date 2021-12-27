const crossp = document.querySelector('.crossp');
const circlep = document.querySelector('.circlep');
const check = document.querySelector('#check');
const resetBtn = document.querySelector('.resetStorage');

let crossPlayer = JSON.parse(localStorage.getItem('crossPlr'));
if(!crossPlayer) crossPlayer = 'Cross';

let circlePlayer = JSON.parse(localStorage.getItem('circlePlr'));
if(!circlePlayer) circlePlayer = 'Circle';

let checkValue = JSON.parse(localStorage.getItem('save'));
if(!checkValue){
   checkValue = false;
   resetBtn.style.display = 'none';
}else resetBtn.style.display = 'block';

crossp.textContent = crossPlayer;
circlep.textContent = circlePlayer;
check.checked = checkValue;

check.addEventListener('click', e => {
   e.target.checked ? resetBtn.style.display = 'block' : resetBtn.style.display = 'none';
})

/**
 * START GAME
*/
document.querySelector('.play').addEventListener('click', () => window.location.href = './game.html');

/**
 * CLICK CREDITS and OPTIONS
*/
const cont = [document.querySelector('.options'), document.querySelector('.credits')];
const child = [document.querySelector('.options section'), document.querySelector('.credits section')];

document.querySelectorAll('.menuBtn').forEach((item, ind) => {
   item.addEventListener('click', () => {
      child[ind].style.transform = 'translate(-50%,-50%) scale(.2)';
      setTimeout(() => {
         child[ind].style.transform = 'translate(-50%,-50%) scale(1)';
      }, 0);
      cont[ind].style.display = 'block';
   })
})

/**
 * OPTIONS
*/
const circleInp = document.querySelector('.oname');
const crossInp = document.querySelector('.xname');

document.querySelector('.savebtn').addEventListener('click', saveChanges);

function saveChanges(){
   let crossPl = JSON.parse(localStorage.getItem('crossPlr'));
   if(!crossPl) crossPl = 'Cross';
   let circlePl = JSON.parse(localStorage.getItem('circlePlr'));
   if(!circlePl) circlePl = 'Circle';
   let checkVal = JSON.parse(localStorage.getItem('save'));
   if(!checkVal) checkVal = false;


   if(circleInp.value !== '' && circleInp.value !== circlePl){
      localStorage.setItem('circlePlr', JSON.stringify(circleInp.value));
      circlep.textContent = circleInp.value;
      circleInp.value = ''
   }

   if(crossInp.value !== '' && crossInp.value !== crossPl){
      localStorage.setItem('crossPlr', JSON.stringify(crossInp.value));
      crossp.textContent = crossInp.value;
      crossInp.value = '';
   }

   if(check.checked !== checkVal){
      localStorage.setItem('save', JSON.stringify(check.checked));
   }
}

resetBtn.addEventListener('click', () => {
   localStorage.setItem('CircleScore', JSON.stringify(0));
   localStorage.setItem('CrossScore', JSON.stringify(0));
})

//////////

document.querySelectorAll('.defbtn').forEach((item, ind) => {
   item.addEventListener('click', () => defaultChanges(ind))
});

function defaultChanges(nr){
   switch(nr){
      case 0:
         localStorage.removeItem('circlePlr');
         circlep.textContent = 'Circle';
      break;

      case 1:
         localStorage.removeItem('crossPlr');
         crossp.textContent = 'Cross';
      break;
   }
}

/**
 * CLOSE POPUP MENU
*/
document.querySelectorAll('.fa-times-circle').forEach(item => {
   item.addEventListener('click', e => {
      e.target.parentElement.parentElement.style.display = 'none';
   })
})