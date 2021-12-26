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

/**
 * CLOSE POPUP MENU
*/
document.querySelectorAll('.fa-times-circle').forEach(item => {
   item.addEventListener('click', e => {
      e.target.parentElement.parentElement.style.display = 'none';
   })
})