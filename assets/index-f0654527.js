(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const v="/assets/smart-f7e1cb05.webp";document.querySelector("#app").innerHTML=`
<div class="container">
        <div class="product">
            <div class="product-image">
                <img src="${v}" alt="Product Image">
            </div>
            <div class="product-details">
                <h1 class="product-title">Smartphone XYZ</h1>
                <p class="product-price">$499.99</p>
                <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor justo at ex pellentesque, eu bibendum urna aliquet.</p>
                <a href="#" data-attr="add-to-cart" class="tc-btn">Add to Cart</a>
            </div>
        </div>
    </div>
`;const g="https://staging.targetcircle.com",a={BUTTON:"tc-btn",INPUT:"tc-input"},b="#008fff",_=739;document.addEventListener("DOMContentLoaded",function(){const c=document.querySelector(".product-details");document.documentElement.style.setProperty("--primary-color",b);const e=document.createElement("button");e.type="button",e.className=a.BUTTON,e.textContent="Share & Earn",e.style.marginTop="16px",c.appendChild(e),e.addEventListener("click",function(){const o=document.createElement("div");o.className="tc-promoter-modal",o.innerHTML=`
					<div class="tc-promoter-modal__overlay"></div>
					<div class="tc-promoter-modal__container">
						<div class="tc-promoter-modal__content">
							<h2>Share & Earn!</h2>
							<h3>Earn up to <b>PLN 94,95 (5%)!</b></h3>
							<form class="tc-promoter-modal__form">
								<div class="form-group">
									<label for="email">Enter your email, we will contact you when you receive your commission</label>
									<input class="${a.INPUT}" type="email" id="email" name="email" required>	
								</div>
								<div class="terms-group">
									<input type="checkbox" id="terms" name="terms" required>
									<label class="clickable" for="terms">I agree to the <a href="#">Terms and Conditions</a></label>
								</div>
								<div class="form-group" id="tc_tracking_code">
								
									<div class="form-group__row">
										<button type="submit" class="${a.BUTTON}">Generate Tracking Code</button>
									</div>
								</div>
							</form>
						</div>
					</div>
			`,document.body.appendChild(o),o.querySelector(".tc-promoter-modal__overlay").addEventListener("click",function(){document.body.removeChild(o)});const t=o.querySelector("#tc_tracking_code"),r=o.querySelector(".tc-promoter-modal__form");r.addEventListener("submit",async function(s){var p;s.preventDefault(),t.innerHTML=`
			<div class="form-group__row">
				<button class="${a.BUTTON}">Loading...</button>
			</div>
			`;const d=(p=document.querySelector("link[rel='canonical']"))==null?void 0:p.href,{message:u,success:f}=await m.createPromoter(r.email.value);let n=u;f&&(n=new URL(u),d&&n.searchParams.append("deeplink",encodeURIComponent(d)),n.searchParams.append("p","p"),n=n.toString()),t.innerHTML=`
			<label for="tracking_code">Your Tracking Link</label>
			<div class="form-group__row">
				<input class="${a.INPUT}" value="${n}" disabled type="input" id="tc_tracking_code" name="tracking_code">
				<button id="tc_copy_tracking_code" type="button" class="${a.BUTTON}">Copy</button>
			</div>
			`;const l=t.querySelector("#tc_copy_tracking_code");l.addEventListener("click",function(){const y=t.querySelector("#tc_tracking_code");m.copyToClipboard(y.value),l.textContent="Copied",l.style.backgroundColor="#4CAF50",setTimeout(()=>{l.textContent="Copy",l.style.backgroundColor="#007bff"},2e3)})})})});const m={copyToClipboard:function(c){const e=document.createElement("textarea");e.value=c,e.style.position="fixed",e.style.opacity=0,document.body.appendChild(e),e.select(),navigator.clipboard.writeText(e.value).then(()=>{console.info("Text copied to clipboard: ",e.value)}).catch(o=>{console.error("Failed to copy text: ",o)}),document.body.removeChild(e)},createPromoter:async function(c){try{const e=await fetch(`${g}/api/pl/pub/promoter/add`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:c,offerId:_})}),{error:o,trackingLink:i}=await e.json();return{message:o||i,success:!o}}catch(e){return console.error(e),{message:"Could not create tracking link",success:!1}}}};
