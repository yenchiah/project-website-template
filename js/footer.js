/*************************************************************************
 * For loading the footer.
 * The footer will not work if you open the file directly rather than on a web server.
 *************************************************************************/

(function () {
  "use strict";

  $(function () {
    $(".footer-container").load("footer.html");
  });
})();