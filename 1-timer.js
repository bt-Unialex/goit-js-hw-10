import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{i,f as C}from"./assets/vendor-njWUcVeN.js";function k(e){const c=Math.floor(e/864e5),y=Math.floor(e%864e5/36e5),g=Math.floor(e%864e5%36e5/6e4),v=Math.floor(e%864e5%36e5%6e4/1e3);return{days:c,hours:y,minutes:g,seconds:v}}i.settings({position:"topRight",iconColor:"#fff",messageColor:"#fff"});const T={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){console.log(e[0]),e[0]<=Date.now()?(o.disabled=!0,i.error({backgroundColor:"#EF4040",iconUrl:"img/error.svg",message:"Please choose a date in the future"})):(o.disabled=!1,l=e[0],i.destroy())}},p=C("#datetime-picker",T);let l,a,f=1e3;const t=document.querySelector(".timer"),x=t.children[0].firstElementChild,S=t.children[1].firstElementChild,E=t.children[2].firstElementChild,M=t.children[3].firstElementChild,o=document.querySelector("[data-start]");o.addEventListener("click",w);function w(){o.disabled=!0,p.input.disabled=!0,d(l),a=setInterval(d,f,l),setTimeout(I,3e3)}function d(e){const n=e-Date.now();if(n<=0){clearInterval(a),o.disabled=!1,p.input.disabled=!1,i.success({iconUrl:"public/img/Ok.svg",message:"Done!"}),t.style.cssText="";return}const{days:m,hours:h,minutes:b,seconds:c}=k(n);x.textContent=s(m),S.textContent=s(h),E.textContent=s(b),M.textContent=s(c)}function s(e){return(e??"00").toString().padStart(2,"0")}const r=document.querySelector("#datetime-picker+button+button");r.addEventListener("click",D);let u=0;function D(){console.log("click"),clearInterval(a),a=setInterval(F,Math.round(f/10),l),t.style.cssText=" animation: shake 40ms infinite linear;",r.style.cssText="",r.disabled=!0}function I(){u=0,r.disabled=!1,r.style.cssText="color: #fff; background-color: #4e75ff; pointer-events: all;"}function F(e){const n=e-.9*f*u;u+=1,d(n)}
//# sourceMappingURL=1-timer.js.map
