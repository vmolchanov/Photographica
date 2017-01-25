"use strict";

(function () {

    var menuLinks = document.querySelectorAll(".main-menu__item a");
    var header = document.querySelector(".main-header");

    for (var i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener("click", function (event) {
            event.preventDefault();

            var attr = this.getAttribute("href");
            var toElement = document.querySelector(attr);

            smoothScroll.init({
                selectorHeader: ".main-header"
            });

            smoothScroll.animateScroll(toElement);
        });
    }

})();
