/* empty css                      */import{a as g,S as y,i}from"./assets/vendor-BPYGh_14.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))p(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&p(d)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function p(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const L="https://pixabay.com/api/",b="54460001-4340b48267dd4c07393208eaa";async function f(r,t=1){return(await g.get(L,{params:{key:b,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:40}})).data}const v=document.querySelector(".search-form"),a=document.querySelector(".gallery"),c=document.querySelector(".load-more"),u=document.querySelector(".loading-text");let l=1,n="",h=new y(".gallery a");v.addEventListener("submit",w);c.addEventListener("click",S);function w(r){if(r.preventDefault(),n=r.target.elements[0].value.trim(),!n){i.warning({message:"Please enter a search query!",position:"topRight"});return}l=1,a.innerHTML="",c.classList.add("is-hidden"),u.classList.remove("is-hidden"),f(n,l).then(t=>{if(t.hits.length===0){i.info({message:"Sorry, no images found.",position:"topRight"});return}m(t.hits),h.refresh(),t.totalHits>a.children.length&&c.classList.remove("is-hidden")}).catch(()=>{i.error({message:"Something went wrong. Try again later.",position:"topRight"})}).finally(()=>{u.classList.add("is-hidden")})}function S(){l+=1,f(n,l).then(r=>{m(r.hits),h.refresh(),a.children.length>=r.totalHits&&(c.classList.add("is-hidden"),i.info({message:"You've reached the end of search results.",position:"topRight"}))}).catch(()=>{i.error({message:"Error loading more images.",position:"topRight"})})}function m(r){const t=r.map(s=>`
      <a href="${s.largeImageURL}" class="photo-card">
        <img
          src="${s.webformatURL}"
          alt="${s.tags}"
          loading="lazy"
        />
        <div class="info">
          <p><b>Likes:</b> ${s.likes}</p>
          <p><b>Views:</b> ${s.views}</p>
          <p><b>Comments:</b> ${s.comments}</p>
          <p><b>Downloads:</b> ${s.downloads}</p>
        </div>
      </a>
    `).join("");a.insertAdjacentHTML("beforeend",t)}
//# sourceMappingURL=index.js.map
