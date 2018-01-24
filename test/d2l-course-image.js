/* global describe, it, beforeEach, fixture, expect */
'use strict';

var image = {
	'class': ['course-image'],
	'properties': {
		'name': 'structures_0013',
		'categories': ['default', 'structures/support'],
		'tags': ['carnival'],
		'lastModified': 1485968984021
	},
	'entities': [{
		'class': ['color'],
		'properties': {
			'description': 'vibrant',
			'r': 130,
			'g': 182,
			'b': 213
		},
		'rel': ['https://api.brightspace.com/rels/color']
	}],
	'links': [{
		'rel': ['self'],
		'href': 'https://course-image-catalog.api.brightspace.com/images/b53fc2ae-0de4-41da-85ff-875372daeacc'
	}, {
		'rel': ['via'],
		'href': 'https://www.pexels.com/photo/white-steel-ferris-wheel-89505/'
	}, {
		'rel': ['alternate'],
		'class': ['tile', 'low-density', 'max'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/tile-low-density-max-size.jpg',
		'type': 'image/jpeg'
	}, {
		'rel': ['alternate'],
		'class': ['tile', 'high-density', 'max'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/tile-high-density-max-size.jpg',
		'type': 'image/jpeg'
	}, {
		'rel': ['alternate'],
		'class': ['tile', 'low-density', 'mid'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/tile-low-density-mid-size.jpg',
		'type': 'image/jpeg'
	}, {
		'rel': ['alternate'],
		'class': ['tile', 'high-density', 'mid'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/tile-high-density-mid-size.jpg',
		'type': 'image/jpeg'
	}, {
		'rel': ['alternate'],
		'class': ['tile', 'low-density', 'min'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/tile-low-density-min-size.jpg',
		'type': 'image/jpeg'
	}, {
		'rel': ['alternate'],
		'class': ['tile', 'high-density', 'min'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/tile-high-density-min-size.jpg',
		'type': 'image/jpeg'
	}, {
		'rel': ['alternate'],
		'class': ['banner', 'wide', 'low-density', 'max'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/banner-wide-low-density-max-size.jpg',
		'type': 'image/jpeg'
	}, {
		'rel': ['alternate'],
		'class': ['banner', 'wide', 'high-density', 'max'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/banner-wide-high-density-max-size.jpg',
		'type': 'image/jpeg'
	}, {
		'rel': ['alternate'],
		'class': ['banner', 'wide', 'low-density', 'mid'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/banner-wide-low-density-mid-size.jpg',
		'type': 'image/jpeg'
	}, {
		'rel': ['alternate'],
		'class': ['banner', 'wide', 'high-density', 'mid'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/banner-wide-high-density-mid-size.jpg',
		'type': 'image/jpeg'
	}, {
		'rel': ['alternate'],
		'class': ['banner', 'wide', 'low-density', 'min'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/banner-wide-low-density-min-size.jpg',
		'type': 'image/jpeg'
	}, {
		'rel': ['alternate'],
		'class': ['banner', 'wide', 'high-density', 'min'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/banner-wide-high-density-min-size.jpg',
		'type': 'image/jpeg'
	}, {
		'rel': ['alternate'],
		'class': ['banner', 'narrow', 'low-density', 'max'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/banner-narrow-low-density-max-size.jpg',
		'type': 'image/jpeg'
	}, {
		'rel': ['alternate'],
		'class': ['banner', 'narrow', 'high-density', 'max'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/banner-narrow-high-density-max-size.jpg',
		'type': 'image/jpeg'
	}, {
		'rel': ['alternate'],
		'class': ['banner', 'narrow', 'low-density', 'mid'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/banner-narrow-low-density-mid-size.jpg',
		'type': 'image/jpeg'
	}, {
		'rel': ['alternate'],
		'class': ['banner', 'narrow', 'high-density', 'mid'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/banner-narrow-high-density-mid-size.jpg',
		'type': 'image/jpeg'
	}, {
		'rel': ['alternate'],
		'class': ['banner', 'narrow', 'low-density', 'min'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/banner-narrow-low-density-min-size.jpg',
		'type': 'image/jpeg'
	}, {
		'rel': ['alternate'],
		'class': ['banner', 'narrow', 'high-density', 'min'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/banner-narrow-high-density-min-size.jpg',
		'type': 'image/jpeg'
	}],
	'rel': ['https://api.brightspace.com/rels/organization-image']
};

describe('d2l-course-image', function() {

	var component, sirenImage;

	beforeEach(function() {
		component = fixture('d2l-course-image-fixture');
		component._load = true;
		sirenImage = window.D2L.Hypermedia.Siren.Parse(image);
	});

	it('should exist on the page', function() {
		expect(Polymer.dom(component.root).querySelector('img') !== null).to.equal(true);
	});

	it('should not crash if not passed siren entity', function() {
		component.image = image;
		expect(Polymer.dom(component.root).querySelector('img') !== null).to.equal(true);
	});

	it('should generate an image with the passed in class', function() {
		component.image = sirenImage;
		component.type = 'narrow';
		expect(Polymer.dom(component.root).querySelector('img').src.indexOf('narrow') > -1).to.equal(true);
	});

	it('should generate an image with "tile" class if no class is passed in', function() {
		component.image = sirenImage;
		expect(Polymer.dom(component.root).querySelector('img').src.indexOf('tile') > -1).to.equal(true);
	});

	it('should generate a srcset if a "sizes" object is passed in', function() {
		var sizes = {
			mobile: { maxwidth: 111, size: 100 },
			tablet: { maxwidth: 222, size: 50 },
			desktop: { size: 33 }
		};
		component.sizes = sizes;
		expect(Polymer.dom(component.root).querySelector('img').getAttribute('sizes')).to.equal('(max-width: 111px) 100vw, (max-width: 222px) and (min-width: 112px) 50vw, 33vw');
	});

	it('should directly pass the sizes to the image if a string "sizes" is provided', function() {
		var sizes = '(max-width: 111px) 100vw, (max-width: 222px) and (min-width: 112px) 50vw, 33vw';
		component.sizes = sizes;
		expect(Polymer.dom(component.root).querySelector('img').getAttribute('sizes')).to.equal('(max-width: 111px) 100vw, (max-width: 222px) and (min-width: 112px) 50vw, 33vw');
	});

	it('should include date time stamps if force image refresh is true', function() {
		sirenImage.forceImageRefresh = true;
		component.image = sirenImage;
		expect(Polymer.dom(component.root).querySelector('img').src.search('.*#[0-9]{13}') > -1).to.be.true;
	});

	it('should fire a "course-image-loaded" event when the image loads', function(done) {
		component.addEventListener('course-image-loaded', function() {
			done();
		});
		component.image = sirenImage;
	});

	it('should not update the image src/srcset if the image is not in the viewport', function() {
		component._load = false;
		component._src = 'foo';
		component.image = sirenImage;
		expect(component._src).to.equal('foo');
	});

	it('should update the image src/srcset if the image is in the viewport', function() {
		component._src = 'foo';
		component.image = sirenImage;
		expect(component._src).to.not.equal('foo');
	});

});
