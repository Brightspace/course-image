import { css, html, LitElement } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

import 'intersection-observer/intersection-observer.js';

import '@brightspace-ui/core/helpers/requestIdleCallback.js';

import 'd2l-organization-hm-behavior/d2l-organization-hm-behavior.js';
import SirenParse from 'siren-parser';

class CourseImage extends LitElement {
	static get properties() {
		return {
			/**
			  * The type of image aspect-ratio wanted.  Supported options currently include `'tile'` and `'narrow'`.
			  */
			type: {
				type: String,
				value: 'tile'
			},
			/**
			 * The vw (viewport-width) that the image will take up on the screen for letious breakpoints.
			 * This is used for the srcset `'sizes'` parameter, and falls back to the defaults if none provided.
			 * This can also take in a string, which will be provided directly to the srcset 'sizes' parameter.
			 */
			sizes: Object,
			/**
			 * The image that you want to display.  It must be in the same format as the course-catalog images.
			 */
			image: Object,
			loadError: { type: Boolean, readOnly: true, reflect: true },
			_imageClass: String,
			_src: String,
			_srcset: String,
			_tileSizes: {
				type: String,
				computed: '_generateSizes(sizes)'
			},
			// Set by the `IntersectionObserver` when the image is first visible in viewport
			_load: Boolean
		};
	}

	static get styles() {
		return css`
			.shown {
				opacity: 1;
			}

			img {
				object-fit: cover;
				object-position: center;
				height: 100%;
				width: 100%;
				opacity: 0;
				transition: opacity 0.5s;
			}

			:host([load-error]) img {
				display: none;
			}

			.d2l-course-image-error-container {
				display: none;
				height: 100%;
				width: 100%;
			}

			:host([load-error]) .d2l-course-image-error-container {
				display: block;
			}
		`;
	}

	connectedCallback() {
		const imageElement = this.shadowRoot.querySelector('img');

		requestIdleCallback(() => {
			if (this._load) {
				// The tile already loaded via the IntersectionObserver
				return;
			}
			// Whether we load because the tile became visible, or because we got some
			// idle time, we want to disconnect the observer either way
			observer.unobserve(imageElement);
			this._load = true;
		});

		const observer = new IntersectionObserver((entries, observer) => {
			for (let i = 0; i < entries.length; i++) {
				// Chrome/FF immediately call the callback when we observer.observe()
				// so we need to also make sure the image is visible for that first run
				// see https://bugs.chromium.org/p/chromium/issues/detail?id=713819
				if (entries[i].intersectionRatio > 0) {
					observer.unobserve(imageElement);
					this._load = true;
					break;
				}
			}
		});
		observer.observe(imageElement);
	}

	render() {
		return html`
			<img
				class="${ifDefined(this._imageClass)}"
				src="${ifDefined(this._src)}"
				srcset="${ifDefined(this._srcset)}"
				sizes="${ifDefined(this._tileSizes)}"
				@load="${this._showImage}"
				@error="${this._handleError}"
				alt=""
				aria-hidden=""
			>
			<div class="d2l-course-image-error-container">
				<svg viewBox="0 0 231 103" xmlns="http://www.w3.org/2000/svg">
					<g fill="none" fill-rule="evenodd"><path fill="#E3E9F1" d="M0 0h231v103H0z"/>
						<path d="M231 89l-41.216-37.138c-2.4-2.874-6.624-5-11.712-5.92-1.824-.287-3.648-.46-5.472-.46-3.36 0-6.72.518-9.696 1.552L101.368 68.53 77.752 58.93c-3.264-1.322-7.008-1.954-10.752-1.954-4.992 0-9.888 1.15-13.536 3.39L0 87v16h231V89z" fill="#CDD5DC"/>
						<path d="M116 41c0 8.636-5 15-15 15s-15-6.364-15-15 5-15 15-15 15 6.364 15 15z" fill="#CDD5DC"/>
					</g>
				</svg>
			</div>
		`;
	}
}

customElements.define('d2l-course-image', CourseImage);
