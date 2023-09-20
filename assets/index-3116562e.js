(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const p="/assets/smart-f7e1cb05.webp";document.querySelector("#app").innerHTML=`
<div class="container">
        <div class="product">
            <div class="product-image">
                <img src="${p}" alt="Product Image">
            </div>
            <div class="product-details">
                <h1 class="product-title">Smartphone XYZ</h1>
                <p class="product-price">$499.99</p>
                <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor justo at ex pellentesque, eu bibendum urna aliquet.</p>
                <a href="#" data-attr="add-to-cart" class="btn">Add to Cart</a>
            </div>
        </div>
    </div>
`;const m="https://staging.targetcircle.com",f={backgroundColor:"#007bff",color:"#fff",marginTop:"16px"},y=739;document.addEventListener("DOMContentLoaded",function(){const c=document.querySelector(".product-details"),e=document.createElement("button");e.type="button",e.className="tc-btn",e.textContent="Share & Earn",Object.assign(e.style,f),c.appendChild(e),e.addEventListener("click",function(){const r=document.createElement("div");r.className="tc-promoter-modal",r.innerHTML=`
					<div class="tc-promoter-modal__overlay"></div>
					<div class="tc-promoter-modal__container">
						<div class="tc-promoter-modal__content">
							<h2>Share & Earn!</h2>
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
								<div class="form-group" id="tc_tracking_code">
								
									<div class="form-group__row">
										<button type="submit" class="tc-btn">Generate Tracking Code</button>
									</div>
								</div>
							</form>
						</div>
					</div>
			`,document.body.appendChild(r),r.querySelector(".tc-promoter-modal__overlay").addEventListener("click",function(){document.body.removeChild(r)});const t=r.querySelector("#tc_tracking_code"),o=r.querySelector(".tc-promoter-modal__form");o.addEventListener("submit",async function(n){n.preventDefault(),t.innerHTML=`
			<div class="form-group__row">
				<button class="tc-btn">Loading...</button>
			</div>
			`;const d=document.querySelector("link[rel='canonical']").href,l=await s.createPromoter(o.email.value);t.innerHTML=`
			<label for="tracking_code">Your Tracking Link</label>
			<div class="form-group__row">
				<input value="${l}?deeplink=${d}" disabled type="input" id="tc_tracking_code" name="tracking_code">
				<button id="tc_copy_tracking_code" type="button" class="tc-btn">Copy</button>
			</div>
			`;const i=t.querySelector("#tc_copy_tracking_code");i.addEventListener("click",function(){const u=t.querySelector("#tc_tracking_code");s.copyToClipboard(u.value),i.textContent="Copied",i.style.backgroundColor="#4CAF50",setTimeout(()=>{i.textContent="Copy",i.style.backgroundColor="#007bff"},2e3)})})})});const s={copyToClipboard:function(c){const e=document.createElement("textarea");e.value=c,e.style.position="fixed",e.style.opacity=0,document.body.appendChild(e),e.select(),navigator.clipboard.writeText(e.value).then(()=>{console.info("Text copied to clipboard: ",e.value)}).catch(r=>{console.error("Failed to copy text: ",r)}),document.body.removeChild(e)},createPromoter:async function(c){try{const e=await fetch(`${m}/api/pl/pub/promoter/add`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:c,offerId:y})}),{trackingLink:r}=await e.json();return r}catch(e){return console.error(e),e}}};
