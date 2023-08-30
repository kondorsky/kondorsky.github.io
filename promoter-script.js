import "./style.css";

document.addEventListener("DOMContentLoaded", function () {
const container = document.querySelector(".product-details");

	// Create the "Promoter" button
	const promoterButton = document.createElement("button");
	promoterButton.type = "button";
	promoterButton.className = "tc-btn";
	promoterButton.textContent = "Recommend to a friend and earn commission!";
	promoterButton.style.marginTop = "16px";

	// Append the button to the container
	container.appendChild(promoterButton);

	promoterButton.addEventListener("click", function () {
		const modal = document.createElement("div");
		modal.className = "tc-promoter-modal";
		modal.innerHTML = `
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
			`;

		document.body.appendChild(modal);

		const overlay = modal.querySelector(".tc-promoter-modal__overlay");

		overlay.addEventListener("click", function () {
			document.body.removeChild(modal);
		});

		modal.addEventListener("click", function (event) {
			if (event.target === modal) {
				document.body.removeChild(modal);
			}
		});

		const emailForm = modal.querySelector(".tc-promoter-modal__form");

		emailForm.addEventListener("submit", function (event) {
			event.preventDefault();
			const emailInput = emailForm.querySelector("#email").value;
			console.log("Email submitted:", emailInput);
			// You can add your email handling logic here
			// For example, sending the email to a server
			// or performing any other desired action
			document.body.removeChild(modal);
		});
	});
});
