"use strict";

(function () {

    var menuItems = document.querySelectorAll(".main-menu__item");
    var menuLinks = document.querySelectorAll(".main-menu__item a");
    var header = document.querySelector(".main-header");

    // set selection by menu items
    window.addEventListener("scroll", function (event) {
        var workPos = document.querySelector("#work").getBoundingClientRect();
        var contactPos = document.querySelector("#contact").getBoundingClientRect();
        var activeItem = getActiveItem(menuItems);

        if (contactPos.top <= header.offsetHeight)
            toggleActiveMenu(activeItem, menuItems[getNewItemIndex(menuLinks, "contact")]);
        else if (workPos.top <= header.offsetHeight)
            toggleActiveMenu(activeItem, menuItems[getNewItemIndex(menuLinks, "work")]);
        else
            toggleActiveMenu(activeItem, menuItems[getNewItemIndex(menuLinks, "home")]);
    });

    // smooth scroll to anchor
    for (var i = 0; i < menuLinks.length; i++) {

        menuLinks[i].addEventListener("click", function (event) {
            // console.log(menuLinks[i].getAttribute("href").indexOf("html"));
            event.preventDefault();

            var attr = this.getAttribute("href");
            var toElement = document.querySelector(attr);

            smoothScroll.init({
                selectorHeader: ".main-header"
            });
            smoothScroll.animateScroll(toElement);
        });

    }

    /**
     * @param {Object} items
     */
    function getActiveItem(items) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].classList.contains("active"))
                return items[i]
        }
    }

    /**
     * @param {Object} links
     * @param {string} id
     */
    function getNewItemIndex(links, id) {
        for (var i = 0; i < links.length; i++) {
            if (links[i].getAttribute("href").slice(1) === id)
                return i;
        }
    }

    /**
     * @param {Object} activeMenuItem
     * @param {Object} newMenuItem
     */
    function toggleActiveMenu(activeMenuItem, newMenuItem) {
        activeMenuItem.classList.remove("active");
        newMenuItem.classList.add("active");
    }

})();
