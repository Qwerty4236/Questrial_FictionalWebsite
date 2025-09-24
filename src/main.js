import { animate, utils, createDraggable, createSpring } from 'animejs';
import './style.css';

// window.addEventListener('load', () => {
//   const resources = performance.getEntriesByType('resource');
//   console.log(`Total files loaded: ${resources.length}`);
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const loadingScreen = document.querySelector('.div');
//   const loadingText = document.querySelector('.thetext');

//   const localResources = document.querySelectorAll('img, script, link');
//   const totalResources = localResources.length;
//   let loadedCount = 0;
//   let loadingFinished = false;

//   if (totalResources === 0) {
//     completeLoading();
//     return;
//   }

//   function updateProgress() {
//     loadedCount++;
//     const percentage = Math.min(100, Math.round((loadedCount / totalResources) * 100));
//     loadingText.innerText = `${percentage}%`;

//     if (loadedCount === totalResources) {
//       completeLoading();
//     }
//   }

//   function completeLoading() {
//     if (loadingFinished) return;
//     loadingFinished = true;

//     loadingText.innerText = '100%';
//     setTimeout(() => {
//       loadingScreen.style.opacity = '0';
//       loadingScreen.addEventListener('transitionend', () => {
//         loadingScreen.style.display = 'none';
//       }, { once: true });
//     }, 200);
//   }

//   localResources.forEach(resource => {
//     if (resource.tagName === 'IMG' && resource.complete) {
//       updateProgress();
//     } else {
//       resource.addEventListener('load', updateProgress, { once: true });
//       resource.addEventListener('error', updateProgress, { once: true });
//     }
//   });

//   window.addEventListener('load', completeLoading, { once: true });
// });



//Fucking Variables
let turn=0 //<-- Image turn and alt text turn
let TextTurn=1 //<-- Text turn
const alt=["women standing in the snow","man poring chmapagne in a glass pyramid","dancer standing in a dark room"] //<-- alt text for images
const h2=["WE ARE THE BEST","we are the best music","we Make great design","we are the best Art"] //<-- h2 text
const track=document.querySelector('.track'); //<-- image track
const headtext=document.querySelector('.headtext .track');//<-- h2 text track
let size=document.querySelector(".headtext h2").clientHeight//<-- height of h2 text

//The fucking function and logic

let size_width_fonc=()=>{ //<-- to make sure the height is always correct on load
  size=document.querySelector(".headtext h2").clientHeight
  document.querySelector(".headtext").style.height=`${size}px`
}
window.addEventListener("load",()=>size_width_fonc())//<-- to make sure the height is always correct on load
window.addEventListener("resize",()=>size_width_fonc())//<-- to make sure the height is always correct on resize

function animateText(){
  animate(headtext,{
    y:{from:0,to:-size,duration:1700,delay:1000,},
    ease:createSpring({ stiffness: 2497, damping: 108, mass:9 }),
    onComplete:()=>{
      const text=document.createElement('h2');
      text.innerText=h2[TextTurn%4];
      headtext.appendChild(text)
      headtext.removeChild(headtext.children[0])
      TextTurn++;
      animateText()
    },
  })
}//<-- recursive function to animate the h2 text

function animateImage(){
  animate(track,{
    x:{to:"-=100%",duration:1700,delay:1000,},
    ease:createSpring({ stiffness: 2497, damping: 108, mass:9 }),
    loop: true,
    loopDelay:1000,
    onLoop:()=>{
      const img=document.createElement('img');
      img.src=`./img/img${turn%3+1}.png`;
      img.alt=alt[turn%3];
      track.appendChild(img)
      track.removeChild(track.children[0])
      turn++;
    }
  })
}//<-- recursive function with built in fonction Loop of AnimeJs to animate the images


animateImage();//<-- call the image animation function
animateText();//<-- call the text animation function