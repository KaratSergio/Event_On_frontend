import{a as E,C as w}from"./vendor-3660d78a.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();const u=E.create({baseURL:"https://event-on-backend.onrender.com",headers:{"Content-Type":"application/json"}}),C=async(t=1,e=8)=>{try{return(await u.get(`/events?page=${t}&limit=${e}`)).data}catch(a){throw console.error("Error fetching events:",a),a}},I=(t,e,a)=>{const i=document.querySelector(".pagination");let n="";if(n+=`<button class="pagination-btn" ${t===1?"disabled":""} data-page="1">&laquo;</button>`,n+=`<button class="pagination-btn" ${t===1?"disabled":""} data-page="${t-1}">&lt;</button>`,e<=5)for(let r=1;r<=e;r++)n+=`<button class="pagination-btn ${r===t?"active":""}" data-page="${r}">${r}</button>`;else if(t<=2){for(let r=1;r<=3;r++)n+=`<button class="pagination-btn ${r===t?"active":""}" data-page="${r}">${r}</button>`;n+='<span class="pagination-dots">...</span>',n+=`<button class="pagination-btn" data-page="${e}">${e}</button>`}else if(t>e-2){n+='<button class="pagination-btn" data-page="1">1</button>',n+='<span class="pagination-dots">...</span>';for(let r=e-2;r<=e;r++)n+=`<button class="pagination-btn ${r===t?"active":""}" data-page="${r}">${r}</button>`}else{n+='<button class="pagination-btn" data-page="1">1</button>',n+='<span class="pagination-dots">...</span>';for(let r=t-1;r<=t+1;r++)n+=`<button class="pagination-btn ${r===t?"active":""}" data-page="${r}">${r}</button>`;n+='<span class="pagination-dots">...</span>',n+=`<button class="pagination-btn" data-page="${e}">${e}</button>`}n+=`<button class="pagination-btn" ${t===e?"disabled":""} data-page="${t+1}">&gt;</button>`,n+=`<button class="pagination-btn" ${t===e?"disabled":""} data-page="${e}">&raquo;</button>`,i.innerHTML=n,document.querySelectorAll(".pagination-btn").forEach(r=>{r.addEventListener("click",s=>{const l=Number(s.target.getAttribute("data-page"));l!==t&&(sessionStorage.setItem("currentPage",l),a(l))})})},$=(t,e={})=>t.filter(a=>{const i=e.title?a.title.toLowerCase().includes(e.title.toLowerCase()):!0,n=e.organizer?a.organizer.toLowerCase().includes(e.organizer.toLowerCase()):!0;let o=!0;return e.date&&(o=new Date(a.eventDate).toISOString().split("T")[0]===e.date),i&&n&&o}),D=(t,e)=>{const{fullName:a,email:i}=e;return t.filter(n=>{const o=a?n.fullName.toLowerCase().includes(a.toLowerCase()):!0,r=i?n.email.toLowerCase().includes(i.toLowerCase()):!0;return o&&r})},v=()=>({titleInput:document.querySelector("#titleFilter"),organizerInput:document.querySelector("#organizerFilter"),dateInput:document.querySelector("#dateFilter"),fullNameInput:document.getElementById("fullNameFilter"),emailInput:document.getElementById("emailFilter")}),S=(t,e)=>{t.innerHTML=e},T=(t,e)=>{t.innerHTML=e},d=(t,e)=>{t.innerHTML=e},F=t=>{t.innerHTML=""},N=(t,e)=>{t&&(t.textContent=e)},M=t=>{t.innerHTML+='<a class="back-to-link list-link" href="index.html">back to events</a>'},q=()=>{const t=document.getElementById("loader");t&&(t.style.display="block")},O=()=>{const t=document.getElementById("loader");t&&(t.style.display="none")};let p=1,m=1,f=!1;const k=(t={},e=1)=>{g(e,t)},R=()=>{const{titleInput:t,organizerInput:e,dateInput:a}=v();if(t&&e&&a&&!f){const i=()=>{const n={title:t.value,organizer:e.value,date:a.value};k(n,p)};t.addEventListener("input",i),e.addEventListener("input",i),a.addEventListener("input",i),f=!0}else console.error("Filter input elements not found.")},g=async(t=1,e={})=>{const a=document.querySelector(".events");if(!a){console.error("Events container not found.");return}const i=sessionStorage.getItem("currentPage"),n=i?Number(i):t;q();try{const{events:o,totalPages:r}=await C(n);m=r;const s=$(o,e);if(s.length===0){d(a,"<p>No events available.</p>");return}const l=s.map(c=>`
      <li class="event-item">
        <div class="event-content">
          <div>
            <h3>${c.title}</h3>
            <p class="event-description">${c.description}</p>
          </div>
          <div>
            <p>Organizer: ${c.organizer}</p>
            <p>Date of the event: ${new Date(c.eventDate).toLocaleDateString()}</p>
          </div>
        </div>
        <div class="event-link-container">
          <a class="link-register" href="registration-page.html?eventId=${c._id}">Register</a>
          <a class="link-view" href="participants-page.html?eventId=${c._id}&title=${encodeURIComponent(c.title)}">View</a>
        </div>
      </li>
    `).join("");S(a,l),I(n,m,c=>{p=c,sessionStorage.setItem("currentPage",c),g(p,e)})}catch(o){d(a,"<p>Error loading events. Please try again later.</p>"),console.error("Error fetching events:",o)}finally{O()}};document.addEventListener("DOMContentLoaded",()=>{const t=setInterval(()=>{document.querySelector(".events")&&(clearInterval(t),g(),R())},100)});const y=async t=>{try{return(await u.get(`/participants/${t}`)).data||null}catch(e){if(e.response&&e.response.status===404)return[];throw e}},P=async t=>{try{return(await u.post("/participants/register",t)).data}catch(e){throw console.error("Error registering participant:",e),e}},z=t=>{const e=document.getElementById("registrationsChart").getContext("2d"),a=t.map(n=>n.date),i=t.map(n=>n.count);new w(e,{type:"bar",data:{labels:a,datasets:[{label:"Registrations per Day",data:i,backgroundColor:"rgba(75, 192, 192, 0.5)",borderColor:"rgba(75, 192, 192, 1)",borderWidth:1}]},options:{responsive:!0,plugins:{legend:{display:!0,position:"top"},title:{display:!0,text:"Daily Registrations"}},scales:{x:{title:{display:!0,text:"Date"},ticks:{autoSkip:!0,maxTicksLimit:10}},y:{title:{display:!0,text:"Registrations"},beginAtZero:!0}}}})},x=async()=>{const t=new URLSearchParams(window.location.search).get("eventId");if(!t){console.error("Event ID not found in URL.");return}try{const e=await y(t);if(e.length===0){console.warn("No participants found for this event.");const o=document.getElementById("chartContainer");o&&(o.style.display="none");return}const a={};e.forEach(o=>{if(o.registrationDate){const r=new Date(o.registrationDate);if(isNaN(r.getTime()))console.warn(`Invalid registration date for participant: ${o.fullName}`);else{const s=r.toISOString().split("T")[0];a[s]?a[s]+=1:a[s]=1}}else console.warn(`Missing registration date for participant: ${o.fullName}`)});const i=Object.keys(a).map(o=>({date:o,count:a[o]})).sort((o,r)=>new Date(o.date)-new Date(r.date));z(i);const n=document.getElementById("chartContainer");n&&(n.style.display="block")}catch(e){console.error("Error fetching participants for chart:",e)}};document.addEventListener("DOMContentLoaded",()=>{document.getElementById("chartContainer")&&x()});const h=t=>new URLSearchParams(window.location.search).get(t),b=window.location.hostname.includes("github.io"),B=b?"/Event_On_frontend/assets/":"./img/",H=t=>`${B}icon${b?"-24fcadf5":""}.svg#${t}`,U=t=>t.map(e=>`
    <li class="participant-item">
      <svg class="participant-icon" width="44" height="44">
        <use href="${H("icon-user")}"></use>
      </svg>
      <div>
        <h3>${e.fullName}</h3>
        <p>Email: ${e.email}</p>
      </div>
    </li>
  `).join(""),L=async(t={})=>{const e=document.querySelector(".participants-list-container"),a=document.querySelector(".participants-list"),i=document.querySelector(".event-title");if(!e||!a){console.error("Participants container or list not found.");return}const n=h("eventId"),o=h("title");if(F(a),N(i,o||"Event Participants"),!n){d(a,"<p>Event ID not provided.</p>");return}try{const r=await y(n),s=D(r,t);if(s.length===0)d(a,'<p class="message">There are no participants.</p>');else{const l=U(s);T(a,l)}M(a)}catch(r){d(a,"<p>Error loading participants. Please try again later.</p>"),console.error("Error fetching participants:",r)}},A=()=>{const{fullNameInput:t,emailInput:e}=v();if(!t||!e){console.error("Filter input elements not found.");return}const a=()=>{const i={fullName:t.value,email:e.value};L(i)};t.addEventListener("input",a),e.addEventListener("input",a)},j=()=>{document.querySelector(".participants-list-container")&&(L(),A())};document.addEventListener("DOMContentLoaded",()=>{const t=setInterval(()=>{document.querySelector(".participants-list-container")&&(clearInterval(t),j())},100)});const _=t=>{const e=new Date(t),a=new Date;let i=a.getFullYear()-e.getFullYear();const n=a.getMonth()-e.getMonth();return(n<0||n===0&&a.getDate()<e.getDate())&&i--,i},Y=()=>new URLSearchParams(window.location.search).get("eventId"),K=async t=>{t.preventDefault();const e=Y();if(!e){alert("Event ID is missing!");return}const a=new FormData(t.target),i=a.get("birthday"),n=_(i);if(n<18){alert("Participants must be at least 18 years old.");return}if(n>100){alert("Participants must be younger than 100 years old.");return}const o={fullName:a.get("fullName"),email:a.get("email"),birthday:i,source:a.get("source"),eventId:e};try{const r=await P(o);console.log("Participant registered successfully:",r),alert("The participant has been successfully registered!"),t.target.reset()}catch(r){console.error("Error registering participant:",r),alert("Error while registering participant. Please try again.")}};document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#registrationForm");t&&t.addEventListener("submit",K)});
//# sourceMappingURL=main-4f437afa.js.map
