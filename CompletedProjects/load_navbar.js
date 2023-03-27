// load_navbar.js
$(document).ready(function() {
    $("#navbar-placeholder").load("/SideNavbar/navbar.html", function() {
      $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "/SideNavbar/navbar.css"
      }).appendTo("head");
  
      $.getScript("/SideNavbar/navbar.js", function() {
        // Call the initNavbar function after loading the navbar.js
        initNavbar();
      });
    });
  });
  