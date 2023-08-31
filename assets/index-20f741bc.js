(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const s="/assets/smart-f7e1cb05.webp";document.querySelector("#app").innerHTML=`
<div class="container">
        <div class="product">
            <div class="product-image">
                <img src="${s}" alt="Product Image">
            </div>
            <div class="product-details">
                <h1 class="product-title">Smartphone XYZ</h1>
                <p class="product-price">$499.99</p>
                <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor justo at ex pellentesque, eu bibendum urna aliquet.</p>
                <a href="#" data-attr="add-to-cart" class="btn">Add to Cart</a>
            </div>
        </div>
    </div>
`;document.addEventListener("DOMContentLoaded",function(){const i=document.querySelector(".product-details"),t=document.createElement("button");t.type="button",t.className="tc-btn",t.textContent="Share & Earn",t.style.marginTop="16px",i.appendChild(t),t.addEventListener("click",function(){const r=document.createElement("div");r.className="tc-promoter-modal",r.innerHTML=`
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
			`,document.body.appendChild(r),r.querySelector(".tc-promoter-modal__overlay").addEventListener("click",function(){document.body.removeChild(r)});const e=r.querySelector("#tc_tracking_code");r.querySelector(".tc-promoter-modal__form").addEventListener("submit",function(c){c.preventDefault(),e.innerHTML=`
			<label for="tracking_code">Your Tracking Link</label>
			<div class="form-group__row">
				<input value="https://c.staging.trackmytarget.com/?a=ug85il&i=faadd4" disabled type="input" id="tc_tracking_code" name="tracking_code">
				<button id="tc_copy_tracking_code" type="button" class="tc-btn">Copy</button>
			</div>
			`;const n=e.querySelector("#tc_copy_tracking_code");n.addEventListener("click",function(){const d=e.querySelector("#tc_tracking_code");l.copyToClipboard(d.value),n.textContent="Copied",n.style.backgroundColor="#4CAF50",setTimeout(()=>{n.textContent="Copy",n.style.backgroundColor="#007bff"},2e3)})})})});const l={copyToClipboard:function(i){const t=document.createElement("textarea");t.value=i,t.style.position="fixed",t.style.opacity=0,document.body.appendChild(t),t.select(),navigator.clipboard.writeText(t.value).then(()=>{log("Text copied to clipboard")}).catch(r=>{console.error("Failed to copy text: ",r)}),document.body.removeChild(t)}};
