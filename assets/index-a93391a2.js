(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const a="/assets/smart-f7e1cb05.webp";document.querySelector("#app").innerHTML=`
<div class="container">
        <div class="product">
            <div class="product-image">
                <img src="${a}" alt="Product Image">
            </div>
            <div class="product-details">
                <h1 class="product-title">Smartphone XYZ</h1>
                <p class="product-price">$499.99</p>
                <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor justo at ex pellentesque, eu bibendum urna aliquet.</p>
                <a href="#" data-attr="add-to-cart" class="btn">Add to Cart</a>
            </div>
        </div>
    </div>
`;document.addEventListener("DOMContentLoaded",function(){const c=document.querySelector(".product-details"),r=document.createElement("button");r.type="button",r.className="tc-btn",r.textContent="Recommend to a friend and earn commission!",r.style.marginTop="16px",c.appendChild(r),r.addEventListener("click",function(){const o=document.createElement("div");o.className="tc-promoter-modal",o.innerHTML=`
					<div class="tc-promoter-modal__overlay"></div>
					<div class="tc-promoter-modal__container">
						<div class="tc-promoter-modal__content">
							<h2>Recommend to a friend and earn commission!</h2>
							<h3>Earn up to <b>PLN 94,95 (5%)!</b></h3>
							<form class="tc-promoter-modal__form">
								<div class="form-group">
									<label for="email">Enter your email, we will contact you when you receive your commission</label>
									<input type="email" id="email" name="email" required>	
								</div>
								<div class="terms-group">
									<input type="checkbox" id="terms" name="terms" required>
									<label for="terms">I agree to the <a href="#">Terms and Conditions</a></label>
								</div>
								<div class="form-group">
									<label for="tracking_code">Email:</label>
									<div class="form-group__row">
										<input value="https://c.staging.trackmytarget.com/?a=ug85il&i=faadd4" disabled type="input" id="tracking_code" name="tracking_code">
										<button type="button" class="tc-btn">Copy</button>
									</div>
								</div>
							</form>
						</div>
					</div>
			`,document.body.appendChild(o),o.querySelector(".tc-promoter-modal__overlay").addEventListener("click",function(){document.body.removeChild(o)}),o.addEventListener("click",function(t){t.target===o&&document.body.removeChild(o)});const e=o.querySelector(".email-form");e.addEventListener("submit",function(t){t.preventDefault();const i=e.querySelector("#email").value;console.log("Email submitted:",i),document.body.removeChild(o)})})});
