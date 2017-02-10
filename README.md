# d2l-course-image

A [Polymer](https://www.polymer-project.org/1.0/)-based web component D2L course-image.

For further information on this and other D2L UI components, see the docs at [ui.valence.d2l.com](http://ui.valence.d2l.com/).

## Installation

`d2l-course-image` can be installed from Bower:
```shell
bower install git://github.com/Brightspace/course-image.git#v0.0.1
```
## Usage
```html
<d2l-course-image type="tile" sizes="srcsetString" image="[[imageObj]]">
</d2l-course-image>
```

## Parameters

### `type`:
- The type of image aspect-ratio you want,
- Supported options currently include `'tile'`, `'narrow'` (The default is 'tile')

### `sizes`:
- The vw that the image will take up on the screen for various breakpoints,
- Used for the srcset 'sizes' parameter, falls back to defaults if none provided

Example:
```
{
	mobile: { maxwidth: 767, size: 100 },
	tablet: { maxwidth: 991, size: 50 },
	desktop: { size: 33 }
}
```
- The sizes parameter can also take in a string which will be provided directly to the srcset

### `image`:
- The image that you want to display, must be in the same format as the course-catalog images
- The best way to get an appropriate image is to pull it from an `organization` hypermedia call

## Running tests locally in Windows

Tests in this repo use web-component-tester (WCT). Currently WCT has an issue in Windows with tests taking about a minute to start.  A workaround is to set two environment variables for Launchpad (a library used by WCT).  These help bypass browser searching which is what causes the delay.  For example:
```
LAUNCHPAD_BROWSERS=CHROME
LAUNCHPAD_CHROME-'C:\Program Files (x86)\Google\Chrome\Application'
```

## Coding styles

See the [Best Practices & Style Guide](https://github.com/Brightspace/valence-ui-docs/wiki/Best-Practices-&-Style-Guide) for information on naming conventions, plus information about the [EditorConfig](http://editorconfig.org) rules used in this repo.
