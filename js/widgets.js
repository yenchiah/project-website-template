/*************************************************************************
 * GitHub: https://github.com/yenchiah/project-website-template
 * Version: v3.43
 * This JS file has widgets for building interactive web applications
 * Use this file with widgets.css
 * If you want to keep this template updated, avoid modifying this file
 * Instead, add your own JavaScript in the custom.js file
 *************************************************************************/

(function () {
  "use strict";

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Create the class
  //
  var Widgets = function () {
    /**
     * A helper for getting data safely with a default value.
     * @public
     * @param {*} v - the original value.
     * @param {*} defaultVal - the default value to return when the original one is undefined.
     * @returns {*} - the original value (if not undefined) or the default value.
     */
    function safeGet(v, defaultVal) {
      if (typeof defaultVal === "undefined") defaultVal = "";
      return (typeof v === "undefined") ? defaultVal : v;
    }
    this.safeGet = safeGet;

    /**
     * @public
     * @todo need documentation
     */
    function createCustomTab(settings) {
      settings = safeGet(settings, {});

      // Specify the selector of the tab
      var $selector = $(settings["selector"]);
      if ($selector.length == 0) {
        console.error("Cannot find selector: " + settings["selector"]);
        return false;
      }
      if ($selector.length > 1) {
        console.error("Multiple selectors were found. Please indicate only one at a time.");
        return false;
      }

      // Get the menu items
      var $menu_items = $selector.find(".custom-tab-menu-item");
      var $all_contents = $selector.find(".custom-tab-content");
      $menu_items.each(function (i, element) {
        var $element = $(element);
        var idx_content = $element.data("content");
        var $desired_content = $selector.find(".custom-tab-content[data-content=" + idx_content + "]");
        // Add click event
        $element.on("click", function () {
          $all_contents.hide();
          $desired_content.css("display", "flex");
          $menu_items.removeClass("active");
          $element.addClass("active");
        });
      });
      $selector.find(".custom-tab-menu-item.active").click();
    }
    this.createCustomTab = createCustomTab;

    /**
     * @public
     * @todo need documentation
     */
    function createCustomDialog(settings) {
  settings = safeGet(settings, {});
  var buttons = createButtons(settings);
  var dialog_settings = createDialogSettings(settings, buttons);

  var $dialog = $(safeGet(settings.selector, "<div></div>")).dialog(dialog_settings);
  var $selector_container = $dialog.closest(".ui-dialog");

  handleDialogOpenClose($dialog, settings, $selector_container);

  return $dialog;
}

function createButtons(settings) {
  var buttons = [];
  if (safeGet(settings.show_cancel_btn, true)) {
    buttons.push(createCancelButton(settings));
  }
  if (typeof settings.action_callback === "function") {
    buttons.push(createActionButton(settings));
  }
  if (buttons.length == 2 && safeGet(settings.reverse_button_positions, false)) {
    buttons.reverse();
  }
  return buttons;
}

function createCancelButton(settings) {
  return {
    class: "ui-cancel-button" + (safeGet(settings.full_width_button, false) ? " full-width" : " stretch-on-mobile"),
    text: safeGet(settings.cancel_text, settings.action_callback ? "Cancel" : "Ok"),
    click: function (event) {
      if (safeGet(settings.close_dialog_on_cancel, true)) {
        $(this).dialog("close");
      }
      if (typeof settings.cancel_callback === "function") settings.cancel_callback(event);
    }
  };
}

function createActionButton(settings) {
  return {
    class: "ui-action-button" + (safeGet(settings.full_width_button, false) ? " full-width" : " stretch-on-mobile"),
    text: safeGet(settings.action_text, "Confirm"),
    click: function (event) {
      if (safeGet(settings.close_dialog_on_action, true)) {
        $(this).dialog("close");
      }
      settings.action_callback(event);
    }
  };
}

function createDialogSettings(settings, buttons) {
  return {
    autoOpen: false,
    resizable: false,
    height: "auto",
    draggable: false,
    width: safeGet(settings.width, 260),
    modal: true,
    classes: {
      "ui-dialog": "custom-dialog-flat " + safeGet(settings.class, "")
    },
    buttons: buttons,
    closeText: ""
  };
}

function handleDialogOpenClose($dialog, settings, $selector_container) {
  $dialog.on("dialogopen", function () {
    if ($(".ui-dialog-content").filter(function () { return $(this).dialog("isOpen"); }).length <= 1) {
      var $body = $("body");
      if (!$body.hasClass("no-scroll") && !$body.hasClass("no-x-scroll")) {
        document.body.style.top = -window.scrollY + "px";
        $body.addClass(window.innerWidth > document.body.clientWidth ? "no-x-scroll" : "no-scroll");
      }
      $selector_container.css({
        position: "fixed",
        top: "calc(50% - " + ($selector_container.height() / 2) + "px)",
        margin: "0 auto",
        left: "0",
        right: "0",
        overflow: "hidden"
      });
    }
  }).on("dialogclose", function () {
    if ($(".ui-dialog-content").filter(function () { return $(this).dialog("isOpen"); }).length === 0) {
      var $body = $("body");
      if ($body.hasClass("no-scroll") || $body.hasClass("no-x-scroll")) {
        $body.removeClass("no-scroll no-x-scroll");
        var scrollY = document.body.style.top;
        document.body.style.top = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
  });
}

    this.createCustomDialog = createCustomDialog;

    /**
     * @public
     * @todo need documentation
     */
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

    /**
     * @public
     * @todo need documentation
     */
    function setCustomLegend($ui, settings) {
      settings = safeGet(settings, {});
      $ui.accordion({
        collapsible: true,
        animate: safeGet(settings["animate"], false)
      });
      return $ui;
    }
    this.setCustomLegend = setCustomLegend;

    /**
     * Copy text in a input field
     * @public
     * @todo need documentation
     */
    function copyText(element_id) {
      // Get the text field
      var c = document.getElementById(element_id);
      // Select the text field
      c.select();
      c.setSelectionRange(0, 99999); // For mobile devices
      // Copy the text inside the text field
      navigator.clipboard.writeText(c.value);
    }
    this.copyText = copyText;

    /**
     * Resize a jQuery dialog to fit the screen.
     * @public
     * @param {Object} $dialog - a jQuery dialog object.
     */
    function fitDialogToScreen($dialog) {
      var $window = $(window);
      $dialog.parent().css({
        "width": $window.width(),
        "height": $window.height(),
        "left": 0,
        "top": 0
      });
      $dialog.dialog("option", "height", $window.height());
      $dialog.dialog("option", "width", $window.width());
    }
    this.fitDialogToScreen = fitDialogToScreen;

    /**
     * Create the html elements for a photo from Unsplash.
     * @private
     * @param {string} credit - the credit of the photo.
     * @param {string} imageUrl - the source URL of an image for the photo.
     * @returns {Object} - a jQuery DOM object.
     */
    function createUnsplashPhotoHTML(credit, imageUrl) {
      var html = '<figure style="display: none;"><img src="' + imageUrl + '"><div>' + credit + '</div></figure>';
      var $html = $(html);
      $html.find("img").one("load", function () {
        // Only show the figure when the image is loaded
        $(this).parent().show();
      });
      return $html;
    }

    /**
     * Create and display the image picker dialog (customized for Unsplash API).
     * @public
     * @param {string} uniqueId - the unique ID for the DOM elements.
     * @param {Object} dialogData - the dictionary to store in the "raw" field of the dialog DOM.
     * @param {string} photoURL - the URL to get the json returned by the Unsplash API.
     * @param {function} [onselect] - callback function after confirming photo selection.
     * @returns {Object} - a jQuery object of the dialog.
     */
    function createUnsplashPhotoPickerDialog(uniqueId, dialogData, photoURL, onselect) {
      // Create HTML
      var html = '';
      html += '<div id="' + uniqueId + '" title="Photo Picker" data-role="none" style="display: none;">';
      html += '  <p class="text dialog-photo-picker-text">';
      html += '    Search photos using <a href="https://unsplash.com/" target="_blank">Unsplash</a> and pick one:';
      html += '  </p>';
      html += '  <form class="search-box-container">';
      html += '  <input class="custom-textbox search-box" placeholder="Enter search terms">';
      html += '    <button title="Search photos" type="submit" class="search-box-button">';
      html += '      <svg width="32" height="32" class="search-box-icon" version="1.1" viewBox="0 0 32 32" aria-hidden="false">';
      html += '        <path d="M22 20c1.2-1.6 2-3.7 2-6 0-5.5-4.5-10-10-10S4 8.5 4 14s4.5 10 10 10c2.3 0 4.3-.7 6-2l6.1 6 1.9-2-6-6zm-8 1.3c-4 0-7.3-3.3-7.3-7.3S10 6.7 14 6.7s7.3 3.3 7.3 7.3-3.3 7.3-7.3 7.3z"></path>';
      html += '      </svg>';
      html += '    </button>';
      html += '  </form>';
      html += '  <p class="text custom-text-danger photos-masonry-error-message">No images found. Please search again using other terms.</p>';
      html += '  <div class="masonry"></div>';
      html += '</div>';
      var $html = $(html);
      $(document.body).append($html);

      // Create dialog
      var $imagePickerDialog = createCustomDialog({
        "selector": "#" + uniqueId,
        "action_text": "Select",
        "width": 290,
        "class": "dialog-photo-picker",
        "show_cancel_btn": false,
        "action_callback": function () {
          var d = $($html.find(".masonry").find(".selected")[0]).data("raw");
          if (typeof onselect == "function") {
            onselect(d, $imagePickerDialog);
          }
        }
      });
      $imagePickerDialog.dialog("widget").find("button.ui-action-button").prop("disabled", true);
      $imagePickerDialog.data("raw", dialogData);

      // Handle photo search
      $html.find(".search-box-container").on("submit", function (event) {
        event.preventDefault();
        var search = $html.find(".search-box").blur().val();
        if (search == "") {
          console.log("no search term");
        } else {
          var targetPhotoURL;
          if (typeof photoURL === "undefined") {
            targetPhotoURL = "file/photo.json";
          } else {
            targetPhotoURL = photoURL + "&query=" + search;
          }
          $.getJSON(targetPhotoURL, function (data) {
            $html.find(".photos-masonry-error-message").hide();
            var $photos = $html.find(".masonry").empty().show();
            for (var i = 0; i < data.length; i++) {
              var d = data[i];
              var imageUrl = d["urls"]["regular"];
              var credit = 'Credit: <a href="' + d["user"]["links"]["html"] + '" target="_blank">' + d["user"]["name"] + '</a>';
              var $d = createUnsplashPhotoHTML(credit, imageUrl);
              $d.data("raw", d);
              $photos.append($d);
            }
            $photos.find("figure").on("click", function () {
              if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
                $imagePickerDialog.dialog("widget").find("button.ui-action-button").prop("disabled", true);
              } else {
                $photos.find(".selected").removeClass("selected");
                $(this).addClass("selected");
                $imagePickerDialog.dialog("widget").find("button.ui-action-button").prop("disabled", false);
              }
            });
          }).fail(function () {
            $html.find(".masonry").empty().hide();
            $html.find(".photos-masonry-error-message").show();
          });
        }
      });

      // Focus on the search box
      $html.find(".search-box").focus();

      // Handle window resize
      $(window).resize(function () {
        fitDialogToScreen($imagePickerDialog);
      });
      fitDialogToScreen($imagePickerDialog);

      return $imagePickerDialog;
    }
    this.createUnsplashPhotoPickerDialog = createUnsplashPhotoPickerDialog;
  };

  // Register to window
  if (window.edaplotjs) {
    window.edaplotjs.Widgets = Widgets;
  } else {
    window.edaplotjs = {};
    window.edaplotjs.Widgets = Widgets;
  }
})();