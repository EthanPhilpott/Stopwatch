"use strict";

$(function () {
    $(".clockface").on("click", function () {
        let d = 0;
        let id = setInterval(function () {
            $(".sec-hands")
                .children()
                .css({
                    transform: `rotate(${d - 90}deg)`,
                });
            d += 360 / 3000;
        }, 10);
        let r = 0;
        let id2 = setInterval(function () {
            $(".min-hand").css("transform", `rotate(${r - 90}deg)`);
            r += 360 / 3000 / 30;
        }, 10);
    });
});
