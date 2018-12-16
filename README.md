Demo: https://yenchiah.github.io/project-website-template/

This is a responsive (mobile/desktop) and light-weight HTML/CSS template for building projects or personal websites. If your website does not require complex user interactions, you can start from a simple webpage (index.html). For building interactive websites, this library also provide several widgets (widgets.html) based on [jQuery](https://jquery.com/) and [jQuery UI](https://jqueryui.com/). One example that uses this template is [Smell PGH](http://smellpgh.org). If you would love to keep updating this template, please keep your own style and script in custom.css and custom.js, avoid modifying the following files:
- frame.css (CSS for the main frame of the website)
- controls.css (CSS for control elements that do not require JavaScript)
- widgets.css (CSS for widgets that require JavaScript)
- widgets.js (JavaScript for widgets)

Start from version 3.0, the menu bar at the top is moved into a single file (menu.html) for better management. Each template page will now use jQuery to load the menu bar file, as shown below:
```html
<div class="menu-container"></div>
<script>
  $(function() {$(".menu-container").load("menu.html");});
</script>
```
The downside is that every template page needs to include jQuery. If you only want a static website that requires no user interactions, you can remove the <script> block and copy the code from the menu file into the menu-container div.
```html
<div class="menu-container">
  [everything in the menu.html goes here]
</div>
```
In this way, you can remove the script line that loads jQuery in the header of the html.

This template is tested and worked on:
- Desktop/Mobile Chrome 69.0.3497.100
- Desktop/Mobile Firefox 62.0.3
- Desktop Safari 11.1.2
