"use strict";

class Clock {
    constructor(face, sec, min, lap) {
        this.face = face;
        this.sec = sec;
        this.min = min;
        this.lap = lap;
        this.startstop = "start";
        this.resetlap = "reset";
        this.id1;
        this.id2;
        this.curr = -90;
        this.intervalAmts = {
            d: 0,
            r: 0,
        };
        this.Events();
    }

    Events() {
        $(this.face).on({
            click: () => {
                if (this.startstop === "start") {
                    this.id1 = setInterval(() => {
                        $(this.sec).css(
                            "transform",
                            `rotate(${this.intervalAmts.d - 90}deg)`
                        );
                        this.intervalAmts.d += 360 / 3000 / 30;
                    }, 10);
                    this.id2 = setInterval(() => {
                        $(this.min).css(
                            "transform",
                            `rotate(${this.intervalAmts.r + 270}deg)`
                        );
                        if (this.resetlap === "lap") {
                            $(this.lap).css(
                                "transform",
                                `rotate(${this.curr}deg)`
                            );
                        } else {
                            $(this.lap).css(
                                "transform",
                                `rotate(${this.intervalAmts.r - 90}deg)`
                            );
                        }
                        this.intervalAmts.r += 360 / 3000 / 0.75;
                    }, 10);

                    this.startstop = "stop";
                    this.resetlap = "lap";
                } else if (this.startstop === "stop") {
                    clearInterval(this.id1);
                    clearInterval(this.id2);
                    this.startstop = "start";
                    this.resetlap = "reset";
                }
            },
            contextmenu: () => {
                if (this.resetlap === "reset") {
                    this.intervalAmts = {
                        d: 0,
                        r: 0,
                    };
                    $(this.sec).css(
                        "transform",
                        `rotate(${this.intervalAmts.d - 90}deg)`
                    );
                    $(this.min).css(
                        "transform",
                        `rotate(${this.intervalAmts.r - 90}deg)`
                    );
                    $(this.lap).css(
                        "transform",
                        `rotate(${this.intervalAmts.r - 90}deg)`
                    );
                    this.curr = -90;
                } else if (this.resetlap === "lap") {
                    this.curr = this.intervalAmts.r - 90;
                    let temptext =
                        $(".whowhowhowhohow").text() +
                        ((Math.abs((this.curr % 360) + 90) / 360) * 30).toFixed(
                            2
                        ) +
                        "\n";
                    console.log(temptext);
                    $(".whowhowhowhohow").html(temptext);
                }
            },
        });
    }
}

new Clock(".clockface", ".min-hand", ".main", ".lap");
