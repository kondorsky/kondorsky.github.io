/* eslint-disable no-mixed-spaces-and-tabs */
(function () {
	let listeners = [];
	const fontsURL = 'fonts.googleapis.com/css2?family=';
	const API_URL = 'https://s.promoterly.io';
	const config = {
		debug: '1',
		init: Date.now(),
		widgets: [
			{
				id: '01J8PG4ZJZW1XHA2Z775TC2H2J',
				priority: 20,
				triggers: [
					{
						type: 'timer',
						value: '1',
						conditions: [
							[
								{
									conds: 'contains',
									group: 'pageURL',
									value: 'promoterly',
								},
							],
						],
					},
				],
				excludeTriggers: [{ type: 'timer', value: '', conditions: [] }],
				customCSS: '',
				showAgainIfDismissed: 120,
				trackingLink: '',
				styles: {
					trigger: {
						bgColor: 'black',
						borderRadius: '20px',
						fontColor: 'white',
					},
					button: {
						bgColor: '#1979c3',
						fontColor: 'white',
						fontFamily: 'Open Sans',
						fontWeight: '400',
						borderColor: '#1979c3',
						borderWidth: '',
						borderRadius: '6px',
					},
					header: {
						bgColor: 'black',
						fontSize: '24px',
						fontColor: 'white',
						fontFamily: 'Open Sans',
						fontWeight: '500',
					},
					text: {
						fontSize: '16px',
						fontColor: 'black',
						fontFamily: 'Open Sans',
						fontWeight: '500',
					},
					title: {
						fontSize: '22px',
						fontColor: 'black',
						fontFamily: 'Open Sans',
						fontWeight: '400',
					},
				},
				content: {
					widgetTitle: 'Promoterly Rewards',
					widgetIntroText: 'Welcome text',
					step1Text: 'Provide your email to get started',
					step3Text:
						'Copy the Tracking Link below',
					step1Title: 'Special Offer!',
					step2Title: 'Almost there!',
					step3Title: 'Thank You \ud83c\udf89',
					step3Button: {
						text: 'Copy Tracking Link',
						link: 'https://prod-magento.trackmytarget.com/en/scarpa-reflex-v.html',
						shareTitle: '',
						shareText: '',
						shareUrl: '',
					},
					step1ButtonText: 'Get Tracking Link',
					text: 'Promoterly',
					type: 'gift',
				},
			},
		],
	};

	// const IS_MOBILE = window.innerWidth < 768;
	const IS_COOKIE_BASED = parseInt('0');
	const URL_LOCATION = new URL(window.location.href);
	const SEARCH_PARAMS = URL_LOCATION.searchParams;
	const PREVIEW_ID = SEARCH_PARAMS.get('promoterly-preview-widget-id');
	let trackingLink = '';

	/**
	 * Logger methods
	 */
	const log = function () {
		Boolean(Number(config.debug)) && console.log.apply(this, arguments);
	};

	function getWidget(widgetConfig) {
		const container = document.createElement('div');

		const style = widgetConfig.styles?.button ?? {};

		container.id = widgetConfig.id;
		container.classList.add('promoterly-widget-button');

		const content = document.createElement('div');
		content.classList.add('promoterly-widget-button-content');

		container.appendChild(content);

		const rewardsIcon = document.createElement('svg');
		rewardsIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		rewardsIcon.setAttribute('viewBox', '0 0 16 16');
		rewardsIcon.setAttribute('x', '0px');
		rewardsIcon.setAttribute('y', '0px');
		rewardsIcon.setAttribute('fill', style.fontColor ?? '#fff');
		rewardsIcon.setAttribute('width', '24');
		rewardsIcon.setAttribute('height', '24');

		const rewardsIconGiftBox = `
				<g>
					<path d="M8.5,4h-2c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2V4z M6.5,1c-0.55,0-1,0.45-1,1s0.45,1,1,1h1V2C7.5,1.45,7.05,1,6.5,1z"/>
				</g>
				<g>
					<path d="M9.5,4h-2V2c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2S10.6,4,9.5,4z M8.5,3h1c0.55,0,1-0.45,1-1s-0.45-1-1-1c-0.55,0-1,0.45-1,1V3z
						"/>
				</g>
				<g>
					<path d="M11.5,16h-7C2.57,16,1,14.43,1,12.5v-6C1,4.57,2.57,3,4.5,3h7C13.43,3,15,4.57,15,6.5v6C15,14.43,13.43,16,11.5,16z M4.5,4
						C3.12,4,2,5.12,2,6.5v6C2,13.88,3.12,15,4.5,15h7c1.38,0,2.5-1.12,2.5-2.5v-6C14,5.12,12.88,4,11.5,4H4.5z"/>
				</g>
				<g>
					<rect x="7.5" y="3" width="1" height="12"/>
				</g>
				<g>
					<rect x="1.5" y="9" width="13" height="1"/>
				</g>
			`;
		const rewardsIconPercentage = `
			<g>
				<path d="M6,7.5C5.17,7.5,4.5,6.83,4.5,6S5.17,4.5,6,4.5S7.5,5.17,7.5,6S6.83,7.5,6,7.5z M6,5.5C5.72,5.5,5.5,5.72,5.5,6
					S5.72,6.5,6,6.5S6.5,6.28,6.5,6S6.28,5.5,6,5.5z"/>
			</g>
			<g>
				<path d="M10,11.5c-0.83,0-1.5-0.67-1.5-1.5S9.17,8.5,10,8.5s1.5,0.67,1.5,1.5S10.83,11.5,10,11.5z M10,9.5
					c-0.28,0-0.5,0.22-0.5,0.5s0.22,0.5,0.5,0.5s0.5-0.22,0.5-0.5S10.28,9.5,10,9.5z"/>
			</g>
			<g>
				<path d="M11.35,4.65c-0.19-0.19-0.51-0.19-0.71,0l-5.54,5.54l0,0l-0.47,0.47c-0.19,0.19-0.19,0.51,0,0.71
				c0.19,0.19,0.51,0.19,0.71,0l0.47-0.47l5.07-5.07l0.47-0.47C11.55,5.16,11.55,4.84,11.35,4.65z"/>
			</g>
			<g>
				<path d="M8,16c-0.59,0-1.14-0.23-1.56-0.64C5.87,14.79,4.71,14.3,3.9,14.3c-1.21,0-2.2-0.99-2.2-2.2c0-0.8-0.49-1.99-1.06-2.55
					c-0.86-0.86-0.86-2.25,0-3.11C1.21,5.87,1.7,4.71,1.7,3.9c0-1.21,0.99-2.2,2.2-2.2c0.81,0,1.98-0.48,2.55-1.06
					c0.86-0.86,2.25-0.86,3.11,0C10.12,1.2,11.31,1.7,12.1,1.7c1.21,0,2.2,0.99,2.2,2.2c0,0.81,0.48,1.98,1.05,2.55
					C15.77,6.86,16,7.41,16,8s-0.23,1.14-0.64,1.56c-0.56,0.56-1.05,1.75-1.05,2.55c0,1.21-0.99,2.2-2.2,2.2
					c-0.79,0-1.99,0.49-2.55,1.05C9.14,15.77,8.59,16,8,16z M8,1C7.69,1,7.39,1.12,7.15,1.35C6.4,2.1,4.97,2.7,3.9,2.7
					c-0.66,0-1.2,0.54-1.2,1.2c0,1.07-0.59,2.5-1.35,3.25c-0.47,0.47-0.47,1.23,0,1.7C2.1,9.6,2.7,11.03,2.7,12.1
					c0,0.66,0.54,1.2,1.2,1.2c1.07,0,2.5,0.59,3.25,1.35c0.45,0.45,1.25,0.45,1.7,0c0.76-0.76,2.18-1.35,3.25-1.35
					c0.66,0,1.2-0.54,1.2-1.2c0-1.07,0.59-2.5,1.35-3.25C14.88,8.62,15,8.32,15,8s-0.12-0.62-0.35-0.85C13.89,6.4,13.3,4.97,13.3,3.9
					c0-0.66-0.54-1.2-1.2-1.2c-1.07,0-2.5-0.59-3.25-1.35C8.61,1.12,8.31,1,8,1z"/>
			</g>`;

		rewardsIcon.innerHTML =
			widgetConfig.content.type === 'gift'
				? rewardsIconGiftBox
				: rewardsIconPercentage;

		content.innerHTML = rewardsIcon.outerHTML;

		const messageText = widgetConfig.content?.text;

		if (messageText) {
			const messageElement = document.createElement('span');
			messageElement.style.textWrap = 'nowrap';
			messageElement.textContent =
				messageText ?? 'No widget button message provided';

			content.appendChild(messageElement);
		}

		content.addEventListener('click', handleClick);

		function handleClick() {
			//unbind click event
			container.removeEventListener('click', handleClick);

			container.classList.add('promoterly-widget-button--expanded');

			if (!container.querySelector('.promoterly-button-rewards')) {
				renderButtonSecondStep(widgetConfig, container);
			}

			//ping stats for click
			utils.pingStats(2, widgetConfig.id);
		}

		document.body.appendChild(container);
	}

	function renderButtonSecondStep(widgetConfig, container) {
		// render rewards container
		const rewardsContainer = document.createElement('div');
		rewardsContainer.classList.add('promoterly-button-rewards');

		rewardsContainer.innerHTML = `
			<div class="promoterly-button-rewards__close">&#x2715;</div>
			<div class="promoterly-button-rewards__header expanded">
				<div class="subtitle">
					${widgetConfig.content?.widgetTitle}
				</div>
				<div class="title">
					${widgetConfig.content?.widgetIntroText}
				</div>
			</div>
			<div class="promoterly-button-rewards__card">
				<div class="promoterly-button-rewards__content-title">
					${widgetConfig.content?.step1Title}
				</div>
				<div class="promoterly-button-rewards__card-description">
					${widgetConfig.content?.step1Text}
				</div>
				<form class="promoterly-button-rewards__form">
					<div class="promoterly-button-rewards__input-container">
						<input 
							type="email" 
							class="promoterly-button-rewards__input" 
							placeholder="Email"
							required
						/>
					</div>
					<button type="submit" class="promoterly-button-rewards__card-button">
						${widgetConfig.content?.step1ButtonText}
					</button>
				</form>
			</div>
		`;

		container.append(rewardsContainer);

		const form = rewardsContainer.querySelector('.promoterly-button-rewards__form');

		const closeRewardsButton = rewardsContainer.querySelector(
			'.promoterly-button-rewards__close'
		);

		closeRewardsButton.addEventListener('click', () => {
			container.classList.remove('promoterly-widget-button--expanded');
		});

		form.addEventListener('submit', (event) => {
			event.preventDefault();
			const emailInput = form.querySelector('.promoterly-button-rewards__input');

			// Use native form validation
			if (emailInput.checkValidity()) {
				proceedToNextStep();
			} else {
				emailInput.reportValidity();
			}
		});

		async function proceedToNextStep() {
			const rewardsCard = rewardsContainer.querySelector(
				'.promoterly-button-rewards__card'
			);

			// Create loader overlay
			const loaderOverlay = document.createElement('div');
			loaderOverlay.className = 'promoterly-button-rewards__loader-overlay';
			loaderOverlay.innerHTML = `
				<div class="promoterly-button-rewards__spinner"></div>
				<div>Getting your tracking link...</div>
			`;
			rewardsCard.appendChild(loaderOverlay);

			await utils.getTrackingLink();

			// Remove loader overlay after fetching
			rewardsCard.removeChild(loaderOverlay);

			rewardsCard.innerHTML = `
				<div class="promoterly-button-rewards__content-title">
					${widgetConfig.content?.step3Title}
				</div>
				<div class="promoterly-button-rewards__card-description">
					${widgetConfig.content?.step3Text}
				</div>
				<div class="promoterly-button-rewards__card-tracking-link">
					${trackingLink}
				</div>
				<button class="promoterly-button-rewards__card-button">
					${widgetConfig.content?.step3Button?.text}
				</button>
			`;

			const copyButton = rewardsContainer.querySelector(
				'.promoterly-button-rewards__card-button'
			);

			copyButton.addEventListener('click', () => {
				copyButton.disabled = true;
				copyButton.textContent = 'Copied!';
				utils.copyToClipboard(trackingLink);

				setTimeout(() => {
					copyButton.disabled = false;
					copyButton.textContent = widgetConfig.content?.step3Button?.text;
				}, 1000);
			});
		}
	}

	/**
	 * Utils
	 */
	const utils = {
		setCSSVariables: function (styles) {
			const root = document.documentElement;

			root.style.setProperty(
				'--promoterly-button-border-radius',
				styles.trigger?.borderRadius
			);

			root.style.setProperty(
				'--promoterly-button-bg-color',
				styles.trigger.bgColor
			);

			root.style.setProperty(
				'--promoterly-button-font-color',
				styles.trigger.fontColor
			);

			root.style.setProperty(
				'--promoterly-popover-header-bg-color',
				styles.header?.bgColor
			);
			root.style.setProperty(
				'--promoterly-popover-header-font-color',
				styles.header?.fontColor
			);
			root.style.setProperty(
				'--promoterly-popover-header-font-size',
				styles.header?.fontSize
			);
			root.style.setProperty(
				'--promoterly-popover-header-font-weight',
				styles.header?.fontWeight
			);
			root.style.setProperty(
				'--promoterly-popover-header-font-family',
				styles.header?.fontFamily
			);

			root.style.setProperty(
				'--promoterly-popover-title-font-color',
				styles.title?.fontColor
			);
			root.style.setProperty(
				'--promoterly-popover-title-font-size',
				styles.title?.fontSize
			);
			root.style.setProperty(
				'--promoterly-popover-title-font-weight',
				styles.title?.fontWeight
			);
			root.style.setProperty(
				'--promoterly-popover-title-font-family',
				styles.title?.fontFamily
			);

			root.style.setProperty(
				'--promoterly-popover-button-bg-color',
				styles.button?.bgColor
			);
			root.style.setProperty(
				'--promoterly-popover-button-font-color',
				styles.button?.fontColor
			);
			root.style.setProperty(
				'--promoterly-popover-button-font-weight',
				styles.button?.fontWeight
			);
			root.style.setProperty(
				'--promoterly-popover-button-font-family',
				styles.button?.fontFamily
			);
			root.style.setProperty(
				'--promoterly-popover-button-border-color',
				styles.button?.borderColor
			);
			root.style.setProperty(
				'--promoterly-popover-button-border-radius',
				styles.button?.borderRadius
			);
			root.style.setProperty(
				'--promoterly-popover-button-border-width',
				styles.button?.borderWidth
			);

			root.style.setProperty(
				'--promoterly-popover-text-font-size',
				styles.text?.fontSize
			);
			root.style.setProperty(
				'--promoterly-popover-text-font-weight',
				styles.text?.fontWeight
			);
			root.style.setProperty(
				'--promoterly-popover-text-font-family',
				styles.text?.fontFamily
			);
			root.style.setProperty(
				'--promoterly-popover-text-font-color',
				styles.text?.fontColor
			);
		},
		includeCSS: function (cssText) {
			const style = document.createElement('style');
			style.id = 'promoterly-variables';
			style.textContent = cssText;
			document.head.appendChild(style);
		},
		copyToClipboard: function (text) {
			// Create a temporary textarea element
			const textarea = document.createElement('textarea');

			textarea.value = text;

			// Make the textarea hidden
			textarea.style.position = 'fixed';
			textarea.style.opacity = 0;

			// Append the textarea to the DOM
			document.body.appendChild(textarea);

			// Select the text in the textarea
			textarea.select();

			// Use the Clipboard API to write the selected text to the clipboard
			navigator.clipboard
				.writeText(textarea.value)
				.then(() => {
					log('Text copied to clipboard');
				})
				.catch((error) => {
					log('Error copying text to clipboard:', error);
				});

			// Remove the textarea from the DOM
			document.body.removeChild(textarea);
		},
		loadFont: function (fontName) {
			// check if font is already loaded
			const fonts = document.head.querySelectorAll(
				'link[href*="' + fontsURL + fontName + '"]'
			);

			// exit if font was already loaded
			if (fonts.length) return false;

			// proceed to loading font
			const link = document.createElement('link');
			link.href = 'https://' + fontsURL + fontName + '&display=swap';
			link.type = 'text/css';
			link.rel = 'stylesheet';
			document.head.appendChild(link);

			return true;
		},
		pingStats: async function (type, id) {
			// skip if preview id is set
			if (PREVIEW_ID) return;

			// check if type is valid 1 = IMPRESSION, 2 = CLICK, 3 = DISMISSED, 4 = CLICK URL
			if (![1, 2, 3, 4].includes(type)) {
				log('%cInvalid stats type', 'color: fireBrick');
				return;
			}

			if (!id) {
				log('%cNo id provided', 'color: fireBrick');
				return;
			}

			// if type is IMPRESSION set value in SESSION STORAGE to prevent multiple impressions
			if (type === 1) {
				if (sessionStorage.getItem('hp_impression')) return;
				sessionStorage.setItem('hp_impression', true);
			}

			try {
				const response = await fetch(
					`${API_URL}/api/stats/widget/${type}/${id}`,
					{
						method: 'POST',
					}
				);
				if (response.ok) {
					log('Stats sent successfully');
				} else {
					log('%cError sending stats', 'color: fireBrick');
				}
			} catch (error) {
				log(error);
			}
		},
		getTrackingLink: async function () {
			// fake delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			trackingLink = 'https://example.tracking.link';
		},
	};

	/**
	 * Popup
	 */
	const popup = {
		show: function (wgt) {
			if (!wgt.id) {
				log('%cNo id provided, popup disabled', 'color: fireBrick');
				return;
			}

			utils.setCSSVariables(wgt.styles);

			//check if there are any widgets currently displayed
			if (document.documentElement.classList.contains('promoterly-widget')) {
				// get current displayed widget ids
				let bars = Array.from(document.getElementsByClassName('promoterly-opt-in-bar'));
				let buttons = Array.from(
					document.getElementsByClassName('promoterly-widget-button')
				);
				let elements = bars.concat(buttons);
				let ids = [];
				for (let i = 0; i < elements.length; i++) {
					ids.push(elements[i].id);
				}

				// get current displayed widget
				let currentDisplayedWidgets = [];
				for (let widgetConfig of config.widgets) {
					if (ids.includes(widgetConfig.id)) {
						currentDisplayedWidgets.push(widgetConfig);
					}
				}

				for (let currentDisplayedWidget of currentDisplayedWidgets) {
					// check if current displayed widget is the same as the new one
					if (currentDisplayedWidget.id === wgt.id) {
						log(
							'current widgetID ' +
								currentDisplayedWidget.id +
								' is equal with new widgetID ' +
								wgt.id
						);
						log(
							'%cAnother widget is currently displayed with the same ID',
							'color: fireBrick'
						);
						return;
					}
				}
			}

			if (wgt.font) utils.loadFont(wgt.font.replace(/\s/g, '+'));

			utils.includeCSS(`
				:root {
	--promoterly-button-border-radius: 8px;
	--promoterly-button-bg-color: #fff;
	--promoterly-button-font-color: #000;

	--promoterly-popover-header-bg-color: #404040;
	--promoterly-popover-header-font-color: #fff;
	--promoterly-popover-header-font-size: 24px;
	--promoterly-popover-header-font-weight: 700;
	--promoterly-popover-header-font-family: system-ui, sans-serif;

	--promoterly-popover-title-font-color: #666;
	--promoterly-popover-title-font-size: 18px;
	--promoterly-popover-title-font-weight: 700;
	--promoterly-popover-title-font-family: system-ui, sans-serif;

	--promoterly-popover-button-bg-color: #404040;
	--promoterly-popover-button-font-color: #fff;
	--promoterly-popover-button-font-weight: 700;
	--promoterly-popover-button-font-size: 16px;
	--promoterly-popover-button-font-family: system-ui, sans-serif;
	--promoterly-popover-button-border-radius: 8px;
	--promoterly-popover-button-border-color: #404040;
	--promoterly-popover-button-border-width: 1px;

	--promoterly-popover-text-font-size: 16px;
	--promoterly-popover-text-font-weight: 400;
	--promoterly-popover-text-font-family: system-ui, sans-serif;
	--promoterly-popover-text-font-color: #666;

	--promoterly-easing-easeOutBack: cubic-bezier(0.34, 1.56, 0.64, 1);
	--promoterly-easing-easeInBack: cubic-bezier(0.36, 0, 0.66, -0.56);
}

@keyframes promoterly-widget-maximize {
	from {
		transform: translate(0, 30px);
		opacity: 0;
	}
}

@keyframes promoterly-widget-minimize {
	to {
		transform: translate(0, 60px);
		opacity: 0;
	}
}

@keyframes promoterly-widget-cards-maximize {
	from {
		transform: translate(0, 30px);
	}
}

@keyframes promoterly-widget-cards-minimize {
	to {
		transform: translate(0, 30px);
	}
}

@keyframes promoterly-button-slide-in {
	from {
		transform: translate(0, 30px);
		opacity: 0;
	}
}

@keyframes promoterly-button-slide-out {
	to {
		opacity: 0;
	}
}

.promoterly-widget-button {
	position: fixed;
	bottom: 20px;
	left: 20px;
	z-index: 99999;
	font-weight: 500;
	font-size: clamp(12px, 18px, 2vw);
	cursor: pointer;
	box-sizing: border-box;
	height: 48px;
	display: flex;
	align-items: center;
}

.promoterly-widget-button-content {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	padding: 12px 20px;
	box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
	border-radius: var(--promoterly-button-border-radius);
	background-color: var(--promoterly-button-bg-color);
	color: var(--promoterly-button-font-color);
	animation: promoterly-button-slide-in 0.4s var(--promoterly-easing-easeOutBack) 0.5s backwards;
}

.promoterly-widget-button--expanded .promoterly-button-rewards {
	height: auto;
	visibility: visible;
	animation: promoterly-widget-maximize 0.4s var(--promoterly-easing-easeOutBack);
	transition: visibility 0s;
}

.promoterly-widget-button--expanded .promoterly-button-rewards__card {
	animation: promoterly-widget-cards-maximize 0.4s var(--promoterly-easing-easeOutBack) 0.1s backwards; 
}

.promoterly-widget-button--expanded .promoterly-widget-button-content {
	pointer-events: none;
	animation: promoterly-button-slide-out 0.4s ease-out forwards;
}

.promoterly-button-rewards {
	display: flex;
	flex-direction: column;
	width: 340px;
	background-color: #f7f7f7;
	position: absolute;
	bottom: 0;
	left: 0;
	overflow: hidden;
	cursor: default;
	box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
	border-radius: 12px;
	height: auto;
	visibility: hidden;
	animation: promoterly-widget-minimize 0.4s var(--promoterly-easing-easeInBack) 0.1s forwards;
	transition: visibility 0s 1s;
}

.promoterly-button-rewards__header {
	display: flex;
	flex-direction: column;
	background: var(--promoterly-popover-header-bg-color);
	color: var(--promoterly-popover-header-font-color);
	width: 100%;
	box-sizing: border-box;
	gap: 20px;
	justify-content: center;
	font-family: var(--promoterly-popover-header-font-family);
	min-height: 56px;
	padding: 0 20px;
}

.promoterly-button-rewards__header.expanded {
	height: auto;
	padding: 12px 20px 20px 20px;
}

.promoterly-button-rewards__header .subtitle {
	font-weight: 300;
	font-size: 14px;
	line-height: 1;
	padding: 9px 0;
}

.promoterly-button-rewards__header .subtitle.collapsed {
	padding: 12px 0;
}

.promoterly-button-rewards__header .title {
	font-size: var(--promoterly-popover-header-font-size);
	font-weight: var(--promoterly-popover-header-font-weight);
	margin-bottom: 40px;
}

.promoterly-button-rewards__card {
	margin: 20px;
	border: 1px solid #ccc;
	border-radius: 8px;
	background: #fff;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	height: auto;
	margin-top: -40px;
	padding: 20px;
	gap: 20px;
	border-width: 0;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px -1.5px,
		rgba(0, 0, 0, 0.1) 0px 2px 2px -2px, rgba(0, 0, 0, 0.05) 0px 10px 9px -4px;
	animation: promoterly-widget-cards-minimize 0.4s var(--promoterly-easing-easeInBack) forwards;
}

.promoterly-button-close {
	display: flex;
	align-items: center;
	padding: 0 17px;
	width: 100%;
	height: 100%;
}

.promoterly-button-rewards__close {
	color: white;
	position: absolute;
	cursor: pointer;
	top: 12px;
	right: 20px;
	width: 32px;
	height: 32px;
	font-size: 16px;
	line-height: 32px;
	text-align: center;
	border-radius: 8px;
	transition: all 0.2s ease-out;
}

.promoterly-button-rewards__close:after {
	content: '';
	display: block;
	position: absolute;
	inset: 0;
	border-radius: inherit;
	opacity: 0;
	background-color: currentColor;
	transition: inherit;
}

.promoterly-button-rewards__close:hover:after {
	opacity: 0.15;
}

.promoterly-button-rewards__content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	padding: 20px;
	gap: 20px;
}

.promoterly-button-rewards__content-title {
	font-weight: var(--promoterly-popover-title-font-weight);
	font-size: var(--promoterly-popover-title-font-size);
	font-family: var(--promoterly-popover-title-font-family);
	color: var(--promoterly-popover-title-font-color);
	text-align: center;
	line-height: 1.2;
}

.promoterly-button-rewards__card-description,
.promoterly-button-rewards__content-description {
	font-size: var(--promoterly-popover-text-font-size);
	font-weight: var(--promoterly-popover-text-font-weight);
	color: var(--promoterly-popover-text-font-color);
	font-family: var(--promoterly-popover-text-font-family);
	line-height: 1.5;
	text-align: center;
}

.promoterly-button-rewards__card-button {
	display: block;
	box-sizing: border-box;
	width: 100%;
	padding: 12px 20px;
	line-height: 18px;
	font-size: var(--promoterly-popover-button-font-size);
	font-weight: var(--promoterly-popover-button-font-weight);
	font-family: var(--promoterly-popover-button-font-family);
	border-radius: var(--promoterly-popover-button-border-radius);
	border-width: var(--promoterly-popover-button-border-width);
	border-color: var(--promoterly-popover-button-border-color);
	background-color: var(--promoterly-popover-button-bg-color);
	color: var(--promoterly-popover-button-font-color);
	cursor: pointer;
}

.promoterly-button-rewards__code-button {
	border: 1px dashed #ccc;
	padding: 8px 16px;
	background-color: white;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 4px;
	cursor: pointer;
	font-size: 16px;
}

.promoterly-button-rewards__form {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	gap: 12px;
}

.promoterly-button-rewards__input-container {
	width: 100%;
}

.promoterly-button-rewards__input {
	width: 100%;
	padding: 12px 20px;
	line-height: 18px;
	font-size: var(--promoterly-popover-text-font-size);
	font-family: var(--promoterly-popover-text-font-family);
	border: 1px solid #ccc;
	border-radius: var(--promoterly-popover-button-border-radius);
	box-sizing: border-box;
}

.promoterly-button-rewards__input:focus {
	outline: none;
	border-color: var(--promoterly-popover-button-bg-color);
}

.promoterly-button-rewards__input::placeholder {
	color: #999;
}

.promoterly-button-rewards__loader-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(255, 255, 255, 0.8);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 10;
}

.promoterly-button-rewards__spinner {
	width: 40px;
	height: 40px;
	border: 3px solid #f3f3f3;
	border-top: 3px solid var(--promoterly-popover-button-bg-color);
	border-radius: 50%;
	animation: promoterly-spin 1s linear infinite;
}

@keyframes promoterly-spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
			`);

			//add custom CSS
			if (wgt.customCSS) {
				utils.includeCSS(wgt.customCSS);
			}

			getWidget(wgt);

			//add class to html
			document.documentElement.classList.remove('promoterly-widget');

			log('[POPUP] Show');

			//ping stats for impression
			utils.pingStats(1, wgt.id);
		},
		hide: function (id) {
			log('[POPUP] Hide', id);

			// get popup element
			const element = document.getElementById(id);

			// check if it exists
			if (!element) return false;

			// remove popup
			element.remove();

			//restore initial margin
			document.body.style.margin = config.initialMargin;

			//remove class from html
			document.documentElement.classList.remove('promoterly-widget');
		},
	};

	/**
	 * Conditions
	 */
	const conditions = {
		checkAll: function (list, event = null) {
			if (!list.length) {
				log('No conditions provided: ', list);
				return false;
			}

			// check if all (AND) groups of conditions are met
			const allConditionsMet = list.every(function (conditionsGroup) {
				// check if any (OR) condition in group is valid
				return conditionsGroup.some((condition) =>
					conditions.checkIfConditionIsValid(condition, event)
				);
			});

			return allConditionsMet;
		},
		checkIfConditionIsValid: function (condition, event) {
			if (!condition.group || !condition.conds || !condition.value) {
				log('%cInvalid condition provided: ', 'color: fireBrick', condition);
				return false;
			}

			if (!conditions[condition.group]) {
				log(
					'%cCondition group not found: ',
					'color: fireBrick',
					condition.group
				);
				return false;
			}

			// check if condition is met
			if (!conditions[condition.group](condition, event)) {
				log(
					'%cCondition not met: ',
					'color: fireBrick',
					condition.group,
					condition
				);
				return false;
			}

			return true;
		},
		pageURL: function (condition) {
			log('[CONDITIONS] Page URL: ', window.location.href.toLowerCase());
			const types = {
				equals: function (value) {
					return value.toLowerCase() == window.location.href.toLowerCase();
				},
				notEquals: function (value) {
					return value.toLowerCase() != window.location.href.toLowerCase();
				},
				contains: function (value) {
					return (
						window.location.href.toLowerCase().indexOf(value.toLowerCase()) >= 0
					);
				},
				notContains: function (value) {
					return (
						window.location.href.toLowerCase().indexOf(value.toLowerCase()) < 0
					);
				},
				startsWith: function (value) {
					return window.location.href.substring(0, value.length) == value;
				},
				endsWith: function (value) {
					return (
						window.location.href.substring(
							window.location.href.length - value.length,
							window.location.href.length
						) == value
					);
				},
			};

			// check if condition logic exists
			if (!types[condition.conds]) {
				log(
					`[CONDITIONS] Missing condition logic: ${condition.conds}.${condition.group}`
				);
				return false;
			}

			return types[condition.conds](condition.value);
		},
		queryParamValue: function (condition) {
			const paramsValues = [];
			SEARCH_PARAMS.forEach((value) => {
				paramsValues.push(value);
			});

			log('[CONDITIONS] Query params values: ', paramsValues);

			const types = {
				equals: function (value) {
					return paramsValues.some((param) => param === value);
				},
				contains: function (value) {
					return paramsValues.some((param) => param.includes(value));
				},
				startsWith: function (value) {
					return paramsValues.some((param) => param.startsWith(value));
				},
				endsWith: function (value) {
					return paramsValues.some((param) => param.endsWith(value));
				},
			};

			return types[condition.conds](condition.value);
		},
		queryParamName: function (condition) {
			const paramsKeys = [];
			SEARCH_PARAMS.forEach((value, key) => {
				paramsKeys.push(key);
			});

			log('[CONDITIONS] Query params names: ', paramsKeys);

			const types = {
				equals: function (value) {
					return paramsKeys.some((param) => param === value);
				},
				contains: function (value) {
					return paramsKeys.some((param) => param.includes(value));
				},
				startsWith: function (value) {
					return paramsKeys.some((param) => param.startsWith(value));
				},
				endsWith: function (value) {
					return paramsKeys.some((param) => param.endsWith(value));
				},
			};

			return types[condition.conds](condition.value);
		},
		device: function (condition) {
			switch (condition.value) {
				case 'mobile':
					return config.device == 0;
				case 'tablet':
					return config.device == 1;
				case 'desktop':
					return config.device == 2;
				default:
					return false;
			}
		},
		timeOnPage: function (condition) {
			const types = {
				lessThan: function (value) {
					return Date.now() - config.init <= value;
				},
				greaterThan: function (value) {
					return Date.now() - config.init >= value;
				},
			};

			// check if condition logic exists
			if (!types[condition.conds]) {
				log(
					`[CONDITIONS] Missing condition logic: ${condition.conds}.${condition.type}`
				);
				return false;
			}

			return types[condition.conds](condition.value * 1000);
		},
		cssSelector: function (condition, event) {
			// check if event target matches selector
			return event.target.matches(condition.value);
		},
		elementText: function (condition, event) {
			const types = {
				equals: function (value) {
					return event.target.innerText.trim() === value;
				},
				contains: function (value) {
					return event.target.innerText.trim().includes(value);
				},
				startsWith: function (value) {
					return event.target.innerText.trim().startsWith(value);
				},
				endsWith: function (value) {
					return event.target.innerText.trim().endsWith(value);
				},
			};

			// check if condition logic exists
			if (!types[condition.conds]) {
				log(
					`[CONDITIONS] Missing condition logic: ${condition.conds}.${condition.group}`
				);
				return false;
			}

			return types[condition.conds](condition.value);
		},
	};

	const triggers = {
		setTriggers: function (optOrCampaign, triggersArray, callback) {
			if (!triggersArray) {
				log('%cNo triggers provided', 'color: fireBrick');
				return;
			}

			for (let trigger of triggersArray) {
				if (!triggers[trigger.type]) {
					log('%cInvalid trigger type', 'color: fireBrick', trigger.type);
					return;
				}

				triggers[trigger.type](optOrCampaign, trigger, callback);
			}
		},
		timer: async function (optOrCampaign, trigger, callback) {
			log('[TIMER] %cListener set', 'color: cyan', optOrCampaign);

			// create trigger
			var id = setTimeout(function () {
				if (conditions.checkAll(trigger.conditions)) {
					callback(optOrCampaign);
				}
			}, trigger.value * 1000);

			// push listener
			listeners.push({
				cpm: optOrCampaign.id,
				type: trigger.type,
				unbind: function () {
					clearTimeout(id);
				},
			});
		},
		exitIntent: function (opt, trigger, callback) {
			log(`[EXIT - CURSOR] %cListener set`, 'color: cyan', opt.id);

			// create trigger
			document.addEventListener(
				'mouseleave',
				function (e) {
					if (e.clientY >= 0) return false;

					if (conditions.checkAll(trigger.conditions)) {
						callback(opt);
					}
				},
				false
			);
		},
		clickElement: function (opt, trigger, callback) {
			log(`[CLICK - ELEMENT] %cListener set`, 'color: cyan', opt);

			// create trigger
			document.addEventListener(
				'click',
				function (e) {
					if (conditions.checkAll(trigger.conditions, e)) {
						callback(opt);
					}
				},
				false
			);
		},
		tabInactivity: function (opt, trigger, callback) {
			function createWorker() {
				let blob = new Blob(
					[
						`
						self.onmessage = (event) => {
								const { delay, action } = event.data;
								
								if (action === 'start') {
										setTimeout(() => {
												self.postMessage({ action: 'trigger' });
										}, delay);
								}
						}`,
					],
					{
						type: 'application/javascript',
					}
				);

				return new Worker(URL.createObjectURL(blob));
			}

			log(`[TAB - INACTIVITY] %cListener set`, 'color: cyan', opt.id);

			document.addEventListener('visibilitychange', function () {
				let worker = null;
				if (document.hidden) {
					log(`[TAB - INACTIVITY] %cStart worker`, 'color: cyan', opt.id);
					worker = createWorker();
					worker.postMessage({ delay: trigger.value * 1000, action: 'start' });
					worker.onmessage = (event) => {
						if (event.data.action === 'trigger') {
							if (conditions.checkAll(trigger.conditions)) {
								callback(opt);
							}
						}
					};
				} else {
					log(`[TAB - INACTIVITY] %cStop worker`, 'color: cyan', opt.id);
					// stop worker
					worker?.terminate();
				}
			});
		},
	};

	async function init(config) {
		//add class to html
		document.documentElement.classList.add('promoterly-wo-widget');

		// unbind previously defined listeners
		for (var i = 0; i < listeners.length; i++) {
			if (listeners[i].unbind) {
				log(
					'[LISTENERS] Unbinding',
					listeners[i].type,
					'for',
					listeners[i].cpm
				);
				listeners[i].unbind();
			}

			// empty listeners if processing the last one
			if (i == listeners.length - 1) listeners = [];
		}

		// save initial margin
		config.initialMargin = document.body.style.margin;

		// preview opt-in bar with provided ID and skip all other checks
		if (PREVIEW_ID) {
			log('[INIT] Previewing opt-in bar with ID:', PREVIEW_ID);
			const widget = config.widgets.find((wgt) => wgt.id === PREVIEW_ID);

			if (!widget) {
				log(
					'%cOpt-in bar with provided ID not found',
					'color: fireBrick',
					PREVIEW_ID
				);
				return;
			}

			popup.show(widget);
			return;
		}

		try {
			const dismissedTime = 10 * 24 * 60 * 60 * 1000;

			config.widgets.forEach((widget) => {
				const lastDismissed = IS_COOKIE_BASED
					? utils.getCookie(`hp_dismissed_${widget.id}`)
					: localStorage.getItem(`hp_dismissed_${widget.id}`);

				if (lastDismissed && Date.now() - lastDismissed < dismissedTime) {
					log('[INIT] User dismissed popup in the last 10 days');
					return;
				}

				// set triggers
				triggers.setTriggers(widget, widget.triggers, popup.show);
			});
		} catch (err) {
			log('[INIT] Error: ', err);
		}
	}

	function detect() {
		// Wait until detectIncognito is defined
		if (typeof detectIncognito !== 'undefined') {
			// eslint-disable-next-line no-undef
			detectIncognito().then(function (result) {
				if (result.isPrivate) {
					log('User is in incognito mode');
				} else {
					log('User is not in incognito mode');
					init(config);
				}
			});
		} else {
			log('Error loading Detect Incognito Script.');
			init(config);
		}
	}

	if (typeof require === 'function') {
		// eslint-disable-next-line no-undef
		require([
			'https://cdn.jsdelivr.net/gh/Joe12387/detectIncognito@main/dist/es5/detectIncognito.min.js',
		], function () {
			log('Detect Incognito Script loaded successfully.');
			detect();
		}, function () {
			log('Error loading Detect Incognito Script.');
			init(config);
		});
	} else {
		let script = document.createElement('script');

		script.onload = function () {
			log('Detect Incognito Script loaded successfully.');
			detect();
		};

		script.onerror = function () {
			log('Error loading Detect Incognito Script.');
			init(config);
		};

		script.src =
			'https://cdn.jsdelivr.net/gh/Joe12387/detectIncognito@main/dist/es5/detectIncognito.min.js';

		document.body.appendChild(script);
	}
})();
