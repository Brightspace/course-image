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
import '@polymer/polymer/polymer-legacy.js';

import 'intersection-observer/intersection-observer.js';
import 'd2l-organization-hm-behavior/d2l-organization-hm-behavior.js';
import 'siren-parser/siren-parser.js';
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
		</style>

		<img src="[[_src]]" srcset$="[[_srcset]]" sizes$="[[_tileSizes]]" on-load="_showImage" class$="[[_imageClass]]">

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
			};

			// Small shim for Edge/IE/Safari
			var delayFunction = window.requestIdleCallback || setTimeout;
			delayFunction(function() {
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
		});
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
			this.image = window.D2L.Hypermedia.Siren.Parse(image);
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
	/**
	 * Gets the tile sizes as a string with units, based on the `sizes` object passed into the element
	 * (or the defaults, if that object was missing information).
	 * @return {string}
	 */
	getTileSizes: function() {
		return this._tileSizes;
	}
});
