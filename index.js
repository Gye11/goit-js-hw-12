/* empty css                      */import{a as m}from"./assets/vendor-CLb_lYsF.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&d(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function d(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const y="https://pixabay.com/api/",h="54460001-4340b48267dd4c07393208eaa";async function u(r,o=1){return(await m.get(y,{params:{key:h,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:40}})).data}const g=document.querySelector(".search-form"),f=document.querySelector(".gallery"),c=document.querySelector(".load-more"),l=document.querySelector(".loading-text");let i=1,n="";g.addEventListener("submit",L);c.addEventListener("click",v);async function L(r){if(r.preventDefault(),n=r.target.elements[0].value.trim(),i=1,f.innerHTML="",c.classList.add("is-hidden"),!n)return;l.classList.remove("is-hidden");const o=await u(n,i);l.classList.add("is-hidden"),p(o.hits),o.totalHits>40&&c.classList.remove("is-hidden")}async function v(){i+=1;const r=await u(n,i);p(r.hits)}function p(r){const o=r.map(s=>`
      <div class="photo-card">
        <img src="${s.webformatURL}" alt="${s.tags}" loading="lazy" />
        <div class="info">
          <p>Likes ${s.likes}</p>
          <p>Views ${s.views}</p>
          <p>Comments ${s.comments}</p>
          <p>Downloads ${s.downloads}</p>
        </div>
      </div>`).join("");f.insertAdjacentHTML("beforeend",o)}
//# sourceMappingURL=index.js.map
