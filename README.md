# d2l-course-image

[![Build status][ci-image]][ci-url]

A [Polymer](https://www.polymer-project.org)-based web component D2L course-image.

## Installation

`d2l-course-image` can be installed from Bower:

```shell
bower install git://github.com/Brightspace/course-image.git#v0.0.1
```

## Usage

Include the [webcomponents.js](http://webcomponents.org/polyfills/) "lite" polyfill (for browsers who don't natively support web components), then import `d2l-course-image.html`:

```html
<head>
	<script src="../webcomponentsjs/webcomponents-lite.js"></script>
	<link rel="import" href="../d2l-course-image/d2l-course-image.html">
</head>
```

Then use where needed:
<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
	<script src="https://s.brightspace.com/lib/siren-parser/6.0.0/siren-parser.js"></script>
    <link rel="import" href="d2l-course-image.html">
    <style>
      html {
        font-size: 20px;
      }
      body {
        letter-spacing: 0.01rem;
        font-size: 0.95rem;
        font-weight: 400;
        line-height: 1.4rem;
      }
    </style>
    <next-code-block></next-code-block>
	<script>
		var imageObject = {
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
					'r': 130, 'g': 182, 'b': 213
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
				'class': ['tile', 'high-density', 'max'],
				'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/tile-high-density-max-size.jpg',
				'type': 'image/jpeg'
			}, {
				'rel': ['alternate'],
				'class': ['banner', 'narrow', 'high-density', 'min'],
				'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/banner-narrow-high-density-min-size.jpg',
				'type': 'image/jpeg'
			}],
			'rel': ['https://api.brightspace.com/rels/organization-image']
		};

		var sirenImage = window.D2L.Hypermedia.Siren.Parse(imageObject);
		document.body.querySelector('d2l-course-image').image = sirenImage;
	</script>
  </template>
</custom-element-demo>
```
-->
```html
<d2l-course-image type="tile" sizes="srcsetString" image="[[imageObj]]">
</d2l-course-image>
```

## Parameters

### `type`:
- The type of image aspect-ratio you want,
- Supported options currently include `'tile'`, `'narrow'` (The default is 'tile')

### `sizes`:
- The vw (viewport-width) that the image will take up on the screen for various breakpoints,
- Used for the srcset 'sizes' parameter, falls back to defaults if none provided

Example:

```
// Default values
{
	mobile: { maxwidth: 767, size: 100 },
	tablet: { maxwidth: 991, size: 50 },
	desktop: { size: 33 }
}
```

- The sizes parameter can also take in a string which will be provided directly to the srcset 'sizes' parameter

### `image`:
- The image that you want to display, must be in the same format as the course-catalog images

```js
// Example
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
			'r': 130, 'g': 182, 'b': 213
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
		'class': ['tile', 'high-density', 'max'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/tile-high-density-max-size.jpg',
		'type': 'image/jpeg'
	}, {
		// more links
	}, {
		'rel': ['alternate'],
		'class': ['banner', 'narrow', 'high-density', 'min'],
		'href': 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/banner-narrow-high-density-min-size.jpg',
		'type': 'image/jpeg'
	}],
	'rel': ['https://api.brightspace.com/rels/organization-image']
};

```
- The passed in image must be a siren entity, you can convert the siren-json into one by doing:

```html
<script src="https://s.brightspace.com/lib/siren-parser/6.0.0/siren-parser.js">
	var sirenImage = window.D2L.Hypermedia.Siren.Parse(imageObject);
</script>
```

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

If you don't have it already, install the [Polymer CLI](https://www.polymer-project.org/2.0/docs/tools/polymer-cli) globally:

```shell
npm install -g polymer-cli
```

To start a [local web server](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#serve) that hosts the demo page and tests:

```shell
polymer serve
```

To lint ([eslint](http://eslint.org/) and [Polymer lint](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#lint)):

```shell
npm run lint
```

To run unit tests locally using [Polymer test](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#tests):

```shell
polymer test --skip-plugin sauce
```

To lint AND run local unit tests:

```shell
npm test
```

### Running tests locally in Windows

Tests in this repo use web-component-tester (WCT). Currently WCT has an issue in Windows with tests taking a few minutes to start.  A workaround is to set two environment variables for Launchpad (a library used by WCT).  These help bypass browser searching which is what causes the delay.  For example:

```shell
LAUNCHPAD_BROWSERS=chrome
LAUNCHPAD_CHROME='C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
```

An alternative would be to run `polymer serve` and then visit `http://localhost:<port>/components/d2l-course-image/test/` in the browser you wish to run the tests on.  Using this method, you can run the tests in any local browser.

## Coding styles

Use an editor which supports [EditorConfig](http://editorconfig.org).

[ci-url]: https://travis-ci.org/Brightspace/course-image
[ci-image]: https://travis-ci.org/Brightspace/course-image.svg?branch=master
