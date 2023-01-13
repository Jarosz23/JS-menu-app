(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();const m=[{name:"Pizza",ingredients:["pepperoni","mushrom","mozarella"],id:0,price:14,emoji:"\u{1F355}"},{name:"Hamburger",ingredients:["beef","cheese","lettuce"],price:12,emoji:"\u{1F354}",id:1},{name:"Beer",ingredients:["grain, hops, yeast, water"],price:12,emoji:"\u{1F37A}",id:2}],d=[],a=document.querySelector(".modal");let o=!1;document.addEventListener("click",e=>{if(e.target.dataset.add&&!o)p(Number(e.target.dataset.add));else if(e.target.dataset.remove&&!o)f(Number(e.target.dataset.remove));else if(e.target.id==="complete-btn")a.style.display="flex",o=!o;else if(e.target.id==="pay-btn"){e.preventDefault();const r=document.getElementById("name");document.querySelector("#order-section").innerHTML=`
            <div class = "form-message">
                <h3>Thanks, ${r.value}! Your orders is on its way!</h3>
            </div>
        `,a.style.display="none",e.target.value=""}});const u=()=>{let e="";return l()==0?e="":e=`<p>Total price: <span class = "price-value">$${l()}</span></p>`,e},p=e=>{const r=m.find(t=>t.id===e);d.push({...r,placeInOrder:d.length+1,isInOrder:!0}),g(d),document.getElementById("total-price").innerHTML=u()},f=e=>{const r=d.find(t=>t.placeInOrder===e);r.isInOrder=!r.isInOrder,document.querySelector(`.order-item-${r.placeInOrder} `).classList.add("hidden"),document.getElementById("total-price").innerHTML=u()},l=()=>{const e=d.reduce((r,t)=>t.isInOrder?t.price+r:r,0);return e==0?(document.querySelector(".user-order-title").classList.add("hidden-order"),document.getElementById("complete-btn").classList.add("hidden-order"),document.querySelector(".order-line").classList.add("hidden-order"),""):e},v=()=>{let e="";return m.forEach(r=>{const t=r.ingredients.map(s=>`<span class = "ingrident" > ${s}</span > `).join(" ");e+=`
            <div class="menu-item" >
                <div class = "item-info">
                    <div class="item-image">
                        <span class = "item-emoji">${r.emoji}</span>
                    </div>
                    <div class="item-desccription">
                        <h3 class = "item-name">${r.name}</h3>
                        <div>${t}</div>
                        <p class = "item-price">$${r.price}</p>
                    </div>
                </div>
                <div class = "add-btn">
                    <button class="add-item-btn" data-add="${r.id}">+</button>
                </div>
            </div>
            <hr></hr>`}),e},g=e=>{let r="";e.map(t=>{if(t.isInOrder)return r=`
                <div class = "order-item-${t.placeInOrder}" >
                    <div class="single-order-item">
                        <div class="order-item-info">
                            <h3 class="order-item-title">${t.name}</h3>
                            <button class="remove-item" id = "remove-item" data-remove="${t.placeInOrder}">remove</button>
                        </div>
                        <div class="order-item-price">
                            <p>$${t.price}</p>
                        </div>
                    </div>
                </div> `}),document.querySelector("#single-order").innerHTML+=r,document.querySelector(".user-order-title").classList.remove("hidden-order"),document.getElementById("complete-btn").classList.remove("hidden-order"),document.querySelector(".order-line").classList.remove("hidden-order")},y=()=>{document.querySelector("#menu-section").innerHTML=v()};y();
