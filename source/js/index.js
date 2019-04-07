'use strict';

svg4everybody();

(function () {
  var NAV_SEL = '.main-nav';
  var MENU_SEL = '.main-menu';
  var NO_JS_CLS = 'main-nav--no-js';
  var MENU_CLOSED_CLS = 'main-menu--menu-closed';
  var BTN_TOGGLE_CLS = 'main-nav__toggle';
  var BTN_TOGGLE_OFF_CLS = 'main-nav__toggle--off';

  var mainNav = document.querySelector(NAV_SEL);
  var mainMenu = document.querySelector(MENU_SEL);

  if (mainNav && mainNav.classList.contains(NO_JS_CLS)) {
    mainNav.classList.remove(NO_JS_CLS);

    if (mainMenu) {
      mainMenu.classList.add(MENU_CLOSED_CLS);
    }
  }

  mainNav.addEventListener('click', function (event) {
    if (event.target.classList.contains(BTN_TOGGLE_CLS)) {
      event.preventDefault();

      mainMenu.classList.toggle(MENU_CLOSED_CLS);
      event.target.classList.toggle(BTN_TOGGLE_OFF_CLS);
    }
  });
})();

// Google карта
function initMap() {
  var latLng = new google.maps.LatLng(34.868633, -111.761734);
  var mapMarker = {
    url: 'img/icon-map-marker.svg',
    size: new google.maps.Size(27, 27)
  };

  var mapOptions = {
    center: latLng,
    zoom: 7,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    },
    scrollwheel: false,
    disableDefaultUI: true
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var marker = new google.maps.Marker({
    map: map,
    position: latLng,
    icon: mapMarker
  });
}
