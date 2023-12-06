(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const i="/assets/smart-f7e1cb05.webp";document.querySelector("#app").innerHTML=`
<div class="container">
        <div class="product">
            <div class="product-image">
                <img src="${i}" alt="Product Image">
            </div>
            <div class="product-details">
                <h1 class="product-title">Smartphone XYZ</h1>
                <p class="product-price">$499.99</p>
                <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor justo at ex pellentesque, eu bibendum urna aliquet.</p>
                <a href="#" data-attr="add-to-cart" class="tc-btn">Add to Cart</a>
            </div>
        </div>
    </div>
`;
