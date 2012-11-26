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

<!-- ## Release History -->

