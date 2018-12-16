/*************************************************************************
 * Your custom JS file
 *************************************************************************/

(function () {
  "use strict";

  function init() {
    // Create the widget object
    var widgets = new edaplotjs.Widgets();

    // Set custom dropdown
    widgets.setCustomDropdown($("#custom-dropdown"), {
      items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
      //init_index: 0, // You can use this parameter to set the initial item for displaying
      init_text: "Dropdown Menu (With JavaScript)",
      on_item_click_callback: function ($ui) {
        console.log($ui.text());
      }
    });

    // Set custom radio
    $("input:radio[name='playback-speed']").on("change", function () {
      console.log($(this).val());
    });

    // Set custom dialogs
    var $dialog_1 = widgets.createCustomDialog({
      selector: "#dialog-1",
      full_width_button: true
    });
    $("#dialog-btn-1").on("click", function () {
      $dialog_1.dialog("open");
    });
    var $dialog_2 = widgets.createCustomDialog({
      selector: "#dialog-2",
      parent: $("body"),
      action_text: "Action",
      action_callback: function () {
        console.log("action");
      },
      cancel_text: "Back",
      cancel_callback: function () {
        console.log("cancel");
      }
    });
    $("#dialog-btn-2").on("click", function () {
      $dialog_2.dialog("open");
    });
    var $dialog_3 = widgets.createCustomDialog({
      selector: "#dialog-3",
      cancel_callback: function () {
        console.log("cancel");
      },
      full_width_button: true,
      no_body_scroll: true
    });
    $("#dialog-btn-3").on("click", function () {
      $dialog_3.dialog("open");
    });

    // Create the gallery
    var $gallery = $(".gallery");
    // In practice, these images urls may come from your server via http ajax requests.
    for (var i = 0; i < 20; i++) {
      var item = "<a href=\"javascript:void(0)\" class=\"flex-column\">" +
        "<img src=\"img/dummay-img.png\">" +
        "<div>Image Caption</div>" +
        "</a>";
      $gallery.append($(item));
    }
  }

  $(init);
})();