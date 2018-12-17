# project-website-template

Demo: https://yenchiah.github.io/project-website-template/

This is a responsive (mobile/desktop) and light-weight HTML/CSS template for building projects or personal websites. If your website does not require complex user interactions, I recommend starting with the empty template (empty.html) and copy codes from the file that contains different layouts (index.html). For building interactive websites, this library also provides several widgets (widgets.html) based on [jQuery](https://jquery.com/) and [jQuery UI](https://jqueryui.com/). One example that uses this template is [Smell PGH](http://smellpgh.org). If you would love to keep updating this template, please keep your codes in separate files (custom.css and custom.js) and avoid modifying the followings:
- css/frame.css (CSS for the main frame of the website)
- css/controls.css (CSS for control elements that do not require JavaScript)
- css/widgets.css (CSS for widgets that require JavaScript)
- js/widgets.js (JavaScript for widgets)

From version 3.0, the menu bar at the top is moved into a single file (menu.html) for better management. Each template page will now use jQuery to load the menu bar file, as shown below:
```html
<div class="menu-container"></div>
<script>
  $(function() {$(".menu-container").load("menu.html");});
</script>
```
The downside is that every template page needs to include jQuery. If your website is static and requires no user interactions, I recommend remove the <script> block and copy the code from the menu file (menu.html) into the menu-container div.
```html
<div class="menu-container">
  [everything in the menu.html goes here]
</div>
```
In this way, you can remove the script line that loads jQuery in the header of the html.

This template is tested and worked on:
- Desktop/Mobile Chrome 71.0.3578.98
- Desktop/Mobile Firefox 64.0
- Desktop Safari 12.0.2
