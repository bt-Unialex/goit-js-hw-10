import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{f,i as d}from"./assets/vendor-DHwbnsIA.js";function h(t){const c=Math.floor(t/864e5),u=Math.floor(t%864e5/36e5),l=Math.floor(t%864e5%36e5/6e4),m=Math.floor(t%864e5%36e5%6e4/1e3);return{days:c,hours:u,minutes:l,seconds:m}}const y={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){console.log(t[0]),t[0]<=Date.now()?(o.disabled=!0,d.error({backgroundColor:"#EF4040",position:"topRight",iconUrl:"./img/error.svg",message:p})):(o.disabled=!1,i=t[0]-Date.now(),d.destroy())}};let i;const p="Please choose a date in the future",n=f("#datetime-picker",y);n.input.disabled=!1;const S=document.querySelector("[data-days]"),g=document.querySelector("[data-hours]"),b=document.querySelector("[data-minutes]"),C=document.querySelector("[data-seconds]"),o=document.querySelector("[data-start]");o.addEventListener("click",M);function M(){o.disabled=!0,n.input.disabled=!0,console.log(" startTimer input:",n.input);const{day:t,hours:r,minutes:s,seconds:a}=h(i);S.textContent=e(t),g.textContent=e(r),b.textContent=e(s),C.textContent=e(a)}function e(t){return(t??"00").toString().padStart(2,"0")}
//# sourceMappingURL=1-timer.js.map
