"use strict";

(function () {

    var ANIMATION_TIME = 2000;
    var ANIMATION_FPS = 50;

    var photoBlock = document.querySelector(".photo-block");
    var btn = photoBlock.querySelector(".photo-block__btn");
    var minHeight = photoBlock.offsetHeight;

    btn.addEventListener("click", function () {
        var img = photoBlock.querySelector("img");
        var maxHeight = img.offsetHeight;

        if (photoBlock.classList.contains("minimize")) {
            btn.style.backgroundImage = "url(img/minimize.svg)";
            maximize(photoBlock, ANIMATION_TIME, ANIMATION_FPS, minHeight, maxHeight);
            photoBlock.classList.remove("minimize");
            photoBlock.classList.add("maximize");
        } else {
            btn.style.backgroundImage = "url(img/maximize.svg)";
            minimize(photoBlock, ANIMATION_TIME, ANIMATION_FPS, minHeight, maxHeight);
            photoBlock.classList.remove("maximize");
            photoBlock.classList.add("minimize");
        }
    });

    function maximize(elem, time, fps, min, max) {
        var countOfSteps = time / fps;
        var deltaHeight = max - min;
        var step = deltaHeight / countOfSteps;

        var timer = setInterval(function () {
            min += step;
            elem.style.height = min + "px";
            countOfSteps--;

            if (countOfSteps === 0) {
                clearInterval(timer);
            }

        }, (1000 / fps));

    }

    function minimize(elem, time, fps, min, max) {
        var countOfSteps = time / fps;
        var deltaHeight = max - min;
        var step = deltaHeight / countOfSteps;

        var timer = setInterval(function () {
            max -= step;
            elem.style.height = max + "px";
            countOfSteps--;

            if (countOfSteps === 0) {
                clearInterval(timer);
            }

        }, (1000 / fps));

    }

})();