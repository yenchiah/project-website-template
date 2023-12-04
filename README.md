# project-website-template
Demo: https://yenchiah.github.io/project-website-template/

The current version is v3.43. The last known stable version is [v3.36](https://github.com/yenchiah/project-website-template/tree/277205cb699b02f3f7ba5f9f6ea20d987582c5bf).

This is a responsive (mobile/desktop) and light-weight HTML/CSS template for building projects or personal websites. If your website does not require complex user interactions, I recommend starting with the empty template (empty.html) and copy codes from the file that contains different layouts (index.html). For building interactive websites, this library also provides several widgets (widgets.html) based on [jQuery](https://jquery.com/) and [jQuery UI](https://jqueryui.com/). Examples that use this template are:
- Personal website: [http://yenchiah.me](http://yenchiah.me) (Link to [code repository](https://github.com/yenchiah/yenchiah.github.io))
- Project website: [http://smellpgh.org](http://smellpgh.org) (Link to [code repository](https://github.com/CMU-CREATE-Lab/smell-pittsburgh-website))
- Project website: [https://smellmycity.org](https://smellmycity.org) (Link to [code repository](https://github.com/CMU-CREATE-Lab/smell-my-city-website))
- Project website: [https://smoke.createlab.org](https://smoke.createlab.org) (Link to [code repository](https://github.com/CMU-CREATE-Lab/video-labeling-tool))
- Project website: [https://periscope.io.tudelft.nl](https://periscope.io.tudelft.nl) (Link to [code repository](https://github.com/TUD-KInD/COCTEAU-TUD))
- Lab website: [https://multix-amsterdam.github.io/](https://multix-amsterdam.github.io/) (Link to [code repository](https://github.com/MultiX-Amsterdam/multix-amsterdam.github.io))
- Conference website: [https://www.mmm2024.org/](https://www.mmm2024.org/) (Link to [code repository](https://github.com/MultiX-Amsterdam/MMM24-website))

If you would love to keep updating this template, please keep your codes in separate files (custom.css and custom.js) and avoid modifying the following:
- css/frame.css (CSS for the main frame of the website)
- css/controls.css (CSS for control elements that do not require JavaScript)
- css/widgets.css (CSS for widgets that require JavaScript)
- js/widgets.js (JavaScript for widgets)
- js/util.js (JavaScript for general utility functions)
- js/menu.js (JavaScript for loading the menu bar)
- js/footer.js (JavaScript for loading the footer)

From version 3.0, the menu bar at the top is moved into `menu.html` for better management. Also, from version 3.37, the footer at the bottom is moved into `footer.html`. Each template page will now use jQuery to load the menu bar and the footer, as shown below:
```html
<script src="js/menu.js"></script>
<script src="js/footer.js"></script>
```
The `menu.js` script loads `menu.html` to `menu-container`.
```html
<div class="menu-container"></div>
```
The `footer.js` script loads `footer.html` to `footer-container`.
```html
<div class="footer-container"></div>
```

This template is tested and worked on:
- macOS 12.4
  - Chrome 103
  - Safari 15.5
  - Firefox 103
  - Edge 103
- Android 12
  - Chrome 103
- iOS 15.5
  - Chrome 103
  - Safari 15.5
  - Firefox 102

# Problems and Bugs
Here are the problems and bugs that I plan to address in the future. If you fixed them, please do not hesitate to send me a pull request, and I would be very grateful. Please also report problems and bugs in [GitHub Issues](https://github.com/yenchiah/project-website-template/issues).

- On mobile Safari, the menu on the top will not close after opening it. This is because the menu icon on mobile Safari retains focus after a touch event, and the menu relies on the loss of focus event of the icon to close.
- On Safari, the survey question that asks users to select photos will display the photos in a weird way after clicking on the checkbox. The reason for this problem is unknown.

# Future Plans for Feature Enhancement
Here are several features that I plan to add in the future. If you wish to contribute, please email me to discuss the design before submitting pull requests.

- A slideshow block for showing images or videos

# Policy for Open Source Contribution
I welcome and appreciate contributions in fixing bugs and enhancing features. However, please avoid submitting pull requests (PRs) that modify the template's existing design without discussing them with me. Please do not submit PRs that are not related to bug fixes or feature enhancements. Editing text in the README file is not encouraged (e.g., fixing grammar errors). PRs with unnecessary editing (e.g., adding unrelated text, changing the design of the template, modifying the README text arbitrarily) or unrelated changes (e.g., changes that are related to only their applications) will be marked as "spam" and "invalid".

If you are excited to contribute to the new features directly, please explain your design decisions and how your design matches this template's style in the PR. If you fix bugs, please explain which bug you fixed and how you fixed them. The explanations that you put in each PR can greatly help me determine if the changes can be merged into the master branch. PRs with no explanations will highly likely be rejected and marked as "wontfix".
