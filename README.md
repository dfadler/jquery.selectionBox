# jQuery Selectionbox

A simple jQuery plugin for quickly creating styled selection boxes

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/dfadler/jquery.selectionBox/master/dist/jquery.selectionBox.min.js
[max]: https://raw.github.com/dfadler/jquery.selectionBox/master/dist/jquery.selectionBox.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery.selectionBox.min.js"></script>
<script>
  $(function() {
    $('.selection-box').selectionBox();
  });
</script>
```

## Documentation
Add the script after your stylesheet and jQuery, create your selection box form element, then initialize the selection box plugin.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>jQuery Selectionbox</title>
  <script src="jquery.js"></script>
  <script src="dist/jquery.selectionBox.min.js"></script>
  <script>
    $(function() {
      $('.selection-box').selectionBox();
    });
  </script>
</head>
<body>
  <select class="selection-box">
    <option value="first">First</option>
    <option value="second">Second</option>
    <option value="third">Third</option>
    <option value="forth">Forth</option>
    <option value="fifth">Fifth</option>
    <option value="sixth">Sixth</option>
    <option value="seventh">Seventh</option>
    <option value="eighth">Eighth</option>
    <option value="ninth">Ninth</option>
    <option value="tenth">Tenth</option>
  </select>
</body>
</html>
```

## Examples
[http://dfadler.github.com/jquery.selectionBox](http://dfadler.github.com/jquery.selectionBox)


## Release History
_(Nothing yet)_

## License
Copyright (c) 2012  
Licensed under the MIT, GPL licenses.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

### Important notes
Please don't edit files in the `dist` subdirectory as they are generated via grunt. You'll find source code in the `src` subdirectory!

While grunt can run the included unit tests via PhantomJS, this shouldn't be considered a substitute for the real thing. Please be sure to test the `test/*.html` unit test file(s) in _actual_ browsers.

### Installing grunt
_This assumes you have [node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed already._

1. Test that grunt is installed globally by running `grunt --version` at the command-line.
1. If grunt isn't installed globally, run `npm install -g grunt` to install the latest version. _You may need to run `sudo npm install -g grunt`._
1. From the root directory of this project, run `npm install` to install the project's dependencies.

### Installing PhantomJS

In order for the qunit task to work properly, [PhantomJS](http://www.phantomjs.org/) must be installed and in the system PATH (if you can run "phantomjs" at the command line, this task should work).

Unfortunately, PhantomJS cannot be installed automatically via npm or grunt, so you need to install it yourself. There are a number of ways to install PhantomJS.

* [PhantomJS and Mac OS X](http://ariya.ofilabs.com/2012/02/phantomjs-and-mac-os-x.html)
* [PhantomJS Installation](http://code.google.com/p/phantomjs/wiki/Installation) (PhantomJS wiki)

Note that the `phantomjs` executable needs to be in the system `PATH` for grunt to see it.

* [How to set the path and environment variables in Windows](http://www.computerhope.com/issues/ch000549.htm)
* [Where does $PATH get set in OS X 10.6 Snow Leopard?](http://superuser.com/questions/69130/where-does-path-get-set-in-os-x-10-6-snow-leopard)
* [How do I change the PATH variable in Linux](https://www.google.com/search?q=How+do+I+change+the+PATH+variable+in+Linux)
