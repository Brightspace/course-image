/**
`d2l-course-image`
Polymer-based web component for course image.

  @demo demo/course-image.html Course Image
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@brightspace-ui/core/helpers/requestIdleCallback.js';
import '@polymer/polymer/polymer-legacy.js';

import 'intersection-observer/intersection-observer.js';
import 'd2l-organization-hm-behavior/d2l-organization-hm-behavior.js';
import SirenParse from 'siren-parser';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-course-image">
	<template strip-whitespace="">
		<style>
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
		</style>

		<img src="[[_src]]" srcset$="[[_srcset]]" sizes$="[[_tileSizes]]" on-load="_showImage" on-error="_handleError" class$="[[_imageClass]]" alt="" aria-hidden="true">
		<div class="d2l-course-image-error-container">
			<svg viewBox="0 0 231 103" xmlns="http://www.w3.org/2000/svg">
				<g fill="none" fill-rule="evenodd"><path fill="#E3E9F1" d="M0 0h231v103H0z"/>
					<path d="M231 89l-41.216-37.138c-2.4-2.874-6.624-5-11.712-5.92-1.824-.287-3.648-.46-5.472-.46-3.36 0-6.72.518-9.696 1.552L101.368 68.53 77.752 58.93c-3.264-1.322-7.008-1.954-10.752-1.954-4.992 0-9.888 1.15-13.536 3.39L0 87v16h231V89z" fill="#CDD5DC"/>
					<path d="M116 41c0 8.636-5 15-15 15s-15-6.364-15-15 5-15 15-15 15 6.364 15 15z" fill="#CDD5DC"/>
				</g>
			</svg>
		</div>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Hypermedia = window.D2L.PolymerBehaviors.Hypermedia || {};

Polymer({
	is: 'd2l-course-image',
	properties: {
		/**
		  * The type of image aspect-ratio wanted.  Supported options currently include `'tile'` and `'narrow'`.
		  */
		type: {
			type: String,
			value: 'tile'
		},
		/**
		 * The vw (viewport-width) that the image will take up on the screen for various breakpoints.
		 * This is used for the srcset `'sizes'` parameter, and falls back to the defaults if none provided.
		 * This can also take in a string, which will be provided directly to the srcset 'sizes' parameter.
		 */
		sizes: Object,
		/**
		 * The image that you want to display.  It must be in the same format as the course-catalog images.
		 */
		image: Object,
		loadError: { type: Boolean, readOnly: true, reflectToAttribute: true },
		_imageClass: String,
		_src: String,
		_srcset: String,
		_tileSizes: {
			type: String,
			computed: '_generateSizes(sizes)'
		},
		// Set by the `IntersectionObserver` when the image is first visible in viewport
		_load: Boolean
	},
	behaviors: [
		D2L.PolymerBehaviors.Hypermedia.OrganizationHMBehavior
	],
	observers: [
		'_updateImage(_load, image, type)'
	],
	attached: function() {
		afterNextRender(this, function() {
			var imageElement = dom(this.root).querySelector('img');

			var observerCallback = function(entries, observer) {
				for (var i = 0; i < entries.length; i++) {
					// Chrome/FF immediately call the callback when we observer.observe()
					// so we need to also make sure the image is visible for that first run
					// see https://bugs.chromium.org/p/chromium/issues/detail?id=713819
					if (entries[i].intersectionRatio > 0) {
						observer.unobserve(imageElement);
						this._load = true;
						break;
					}
				}
			}.bind(this);

			requestIdleCallback(function() {
				if (this._load) {
					// The tile already loaded via the IntersectionObserver
					return;
				}
				// Whether we load because the tile became visible, or because we got some
				// idle time, we want to disconnect the observer either way
				observer.unobserve(imageElement);
				this._load = true;
			}.bind(this));

			var observer = new IntersectionObserver(observerCallback.bind(this));
			observer.observe(imageElement);
		}.bind(this));
	},
	_defaultSizes: {
		mobile: { maxwidth: 767, size: 100 },
		tablet: { maxwidth: 991, size: 50 },
		desktop: { size: 33 }
	},
	_generateSizes: function(sizeObj) {
		sizeObj = sizeObj || this._defaultSizes;

		if (typeof sizeObj === 'object') {
			var newSizeObj = {};
			['mobile', 'tablet', 'desktop'].forEach(function(cur) {
				newSizeObj[cur] = {
					maxwidth: sizeObj[cur] && sizeObj[cur].maxwidth || this._defaultSizes[cur].maxwidth,
					size: sizeObj[cur] && sizeObj[cur].size || this._defaultSizes[cur].maxwidth
				};
			}.bind(this));

			var mobileString = '(max-width: ' + newSizeObj.mobile.maxwidth + 'px) ' + newSizeObj.mobile.size + 'vw';
			var tabletString = ', (max-width: ' + newSizeObj.tablet.maxwidth + 'px) and (min-width: ' +
				(newSizeObj.mobile.maxwidth + 1) + 'px) ' + newSizeObj.tablet.size + 'vw';
			var desktopString = ', ' + newSizeObj.desktop.size + 'vw';

			return mobileString + tabletString + desktopString;
		} else {
			return sizeObj;
		}
	},
	_updateImage: function(load, image, type) {
		if (!load || !image) {
			return;
		}
		if (!image.getLinksByClass) {
			// This will re-call _updateImage with the parsed image, so we can return immediately
			this.image = SirenParse(image);
			return;
		}

		var imageSrc = this.getDefaultImageLink(image, type);
		if (imageSrc) {
			var dateTimeString = image.forceImageRefresh ? '#' + new Date().getTime() : '';
			this._src = imageSrc + dateTimeString;
		}
		var imageSrcset = this.getImageSrcset(image, type, image.forceImageRefresh);
		if (imageSrcset) {
			this._srcset = imageSrcset;
		}
	},
	_showImage: function() {
		this._imageClass = 'shown';
		afterNextRender(this, function() {
			this.fire('course-image-loaded');
		}.bind(this));
	},

	_handleError: function() {
		this._setLoadError(true);
	},
	/**
	 * Gets the tile sizes as a string with units, based on the `sizes` object passed into the element
	 * (or the defaults, if that object was missing information).
	 * @return {string}
	 */
	getTileSizes: function() {
		return this._tileSizes;
	}
});
