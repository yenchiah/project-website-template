/*************************************************************************
 * GitHub: https://github.com/yenchiah/project-website-template
 * Version: v3.12
 * This JS file has widgets for building interactive web applications
 * Use this file with widgets.css
 * If you want to keep this template updated, avoid modifying this file
 * Instead, add your own JavaScript in the index.js
 *************************************************************************/

(function () {
  "use strict";

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Create the class
  //
  var Widgets = function () {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Variables
    //

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Private methods
    //

    // Safely get the value from a variable, return a default value if undefined
    function safeGet(v, default_val) {
      if (typeof default_val === "undefined") default_val = "";
      return (typeof v === "undefined") ? default_val : v;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Privileged methods
    //

    function createCustomDialog(settings) {
      settings = safeGet(settings, {});

      // Create a button for taking actions (e.g., confirm that users get the message)
      // The default text for the button is "Confirm"
      var has_action_callback = (typeof settings["action_callback"] === "function");
      var action_text = safeGet(settings["action_text"], "Confirm");

      // Create a button for cancellation
      // The default text for the button is "Cancel" when there is an action button
      // The default text for the button is "Ok" when there is no action button
      var has_cancel_callback = (typeof settings["cancel_callback"] === "function");
      var cancel_text = has_action_callback ? "Cancel" : "Ok";
      cancel_text = safeGet(settings["cancel_text"], cancel_text);

      // Hide the cancel button or not
      var show_cancel_btn = safeGet(settings["show_cancel_btn"], true);

      // Specify the style
      var style_class = "custom-dialog-flat";

      // Specify the selector of the dialog
      // If no selector, a <div></div> will be created
      var $selector = $(safeGet(settings["selector"], "<div></div>"));

      // Specify the width of the dialog
      var width = safeGet(settings["width"], 260);

      // Specify if full width buttons
      var full_width_button = safeGet(settings["full_width_button"], false);

      // Show the close button or not
      var show_close_button = safeGet(settings["show_close_button"], true);

      // Specify buttons
      var buttons = {};
      if (show_cancel_btn) {
        buttons["Cancel"] = {
          class: "ui-cancel-button",
          text: cancel_text,
          click: function () {
            $(this).dialog("close");
            if (has_cancel_callback) settings["cancel_callback"]();
          }
        }
        if (full_width_button) {
          buttons["Cancel"]["class"] += " full-width";
        }
      }
      if (has_action_callback) {
        buttons["Action"] = {
          class: "ui-action-button",
          text: action_text,
          click: function () {
            $(this).dialog("close");
            settings["action_callback"]();
          }
        }
        if (full_width_button) {
          buttons["Action"]["class"] += " full-width";
        }
      }

      // Create dialog
      var $selector_container;
      var dialog_settings = {
        autoOpen: false,
        resizable: false,
        height: "auto",
        draggable: false,
        width: width,
        modal: true,
        classes: {
          "ui-dialog": style_class
        }, // this is for jquery 1.12 and after
        dialogClass: style_class, // this is for before jquery 1.12
        buttons: buttons,
        closeText: "",
        open: function (event, ui) {
          var num_opened_dialog = 0;
          $(".ui-dialog-content").each(function () {
            if ($(this).dialog("isOpen")) num_opened_dialog += 1;
          });
          // Larger than 1 after opening means that there exists other opened dialog boxes
          var is_other_dialog_opened = num_opened_dialog > 1;
          // Check if parent element is specified
          if (!is_other_dialog_opened) {
            if (typeof settings["parent"] === "undefined") {
              var $body = $("body");
              if (!$body.hasClass("no-scroll")) {
                // When the modal is open, we want to set the top of the body to the scroll position
                document.body.style.top = -window.scrollY + "px";
                $body.addClass("no-scroll");
              }
              $selector_container.css({
                position: "fixed",
                top: "calc(50% - " + ($selector_container.height() / 2) + "px)",
                margin: "0 auto",
                left: "0",
                right: "0",
                overflow: "hidden"
              });
            } else {
              // If there is a parent, need to fit the overlay to the parent element
              var $overlay = $(".ui-widget-overlay");
              if (!$overlay.hasClass("fit-parent")) {
                $overlay.addClass("fit-parent");
              }
            }
          }
        },
        close: function (event, ui) {
          var num_opened_dialog = 0;
          $(".ui-dialog-content").each(function () {
            if ($(this).dialog("isOpen")) num_opened_dialog += 1;
          });
          // Larger than 0 after closing means that there exists other opened dialog boxes
          var is_other_dialog_opened = num_opened_dialog > 0;
          if (!is_other_dialog_opened) {
            // Check if parent element is specified
            if (typeof settings["parent"] === "undefined") {
              var $body = $("body");
              if ($body.hasClass("no-scroll")) {
                // When the modal is hidden, we want to remain at the top of the scroll position
                $body.removeClass("no-scroll");
                var scrollY = document.body.style.top;
                document.body.style.top = "";
                window.scrollTo(0, parseInt(scrollY || "0") * -1);
              }
            } else {
              // If there is a parent, need to remove the class that fits the overlay to the parent
              var $overlay = $(".ui-widget-overlay");
              if ($overlay.hasClass("fit-parent")) {
                $overlay.removeClass("fit-parent");
              }
            }
          }
        }
      };

      if (typeof settings["parent"] === "undefined") {
        dialog_settings["position"] = {
          my: "center",
          at: "center",
          of: window
        };
      } else {
        dialog_settings["appendTo"] = settings["parent"];
        dialog_settings["position"] = {
          my: "center",
          at: "center",
          of: settings["parent"]
        };
      }
      var $dialog = $selector.dialog(dialog_settings);
      $selector_container = $selector.closest(".ui-dialog");
      $selector_container.find(".ui-dialog-titlebar-close").empty().append("<i class='fa fa-times fa-lg'></i>");
      if (!show_close_button) {
        $dialog.on("dialogopen", function () {
          $(this).parent().find(".ui-dialog-titlebar-close").hide();
        });
      }
      return $dialog;
    };
    this.createCustomDialog = createCustomDialog;

    function setCustomDropdown($ui, settings) {
      var items = settings["items"]; // the text that will appear for each item
      var init_index = settings["init_index"];
      var init_text = settings["init_text"];
      var on_item_click_callback = settings["on_item_click_callback"];
      var on_item_create_callback = settings["on_item_create_callback"];
      var $menu = $ui.find("div").empty();
      var $button_text = $ui.find("a > span").text("");
      var $selected_item;
      // Set initial button text
      if (typeof init_text !== "undefined") {
        $button_text.text(init_text);
      } else {
        if (typeof init_index !== "undefined" && typeof items !== "undefined") {
          $button_text.text(items[init_index]);
        }
      }
      // Set button event
      // Note that the button is designed to use focusout and focus to determine its state
      // "focusout" indicates that the menu is currently opened and should be closed
      // "focus" indicates that the menu is currently closed and should be opened
      $ui.find("a").off("focusout").on("focusout", function () {
        // Find which item is hovered, and then simulate the click
        if (typeof $selected_item !== "undefined") {
          $button_text.text($selected_item.text()); // update the text on the button
          if (typeof on_item_click_callback === "function") on_item_click_callback($selected_item, $selected_item.index());
          $selected_item = undefined;
        }
        if ($menu.is(":visible")) $menu.addClass("force-hide"); // close the menu
      }).off("focus").on("focus", function () {
        if (!$menu.is(":visible")) $menu.removeClass("force-hide"); // open the menu
      });
      // Add events for menu items
      for (var i = 0; i < items.length; i++) {
        var $item = $("<a href=\"javascript:void(0)\">" + items[i] + "</a>");
        // We need to let the focusout button event know which item is selected
        // Note that we cannot use the click event to find this,
        // because as soon as the item is clicked,
        // the focusout event of the button is triggered,
        // this closes the menu and we never get the click event from the items
        $item.on("mouseover", function () {
          $selected_item = $(this);
        }).on("mouseout", function () {
          $selected_item = undefined;
        });
        $menu.append($item);
        if (typeof on_item_create_callback === "function") on_item_create_callback($item, i);
      }
      return $ui;
    }
    this.setCustomDropdown = setCustomDropdown;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Constructor
    //
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Register to window
  //
  if (window.edaplotjs) {
    window.edaplotjs.Widgets = Widgets;
  } else {
    window.edaplotjs = {};
    window.edaplotjs.Widgets = Widgets;
  }
})();