var incrementHrs = document.querySelector(".in-Hrs")
var incrementMin = document.querySelector(".in-Min")
var incrementSec = document.querySelector(".in-Sec")

var decreamentHrs = document.querySelector(".dec-Hrs")
var decreamentMin = document.querySelector(".dec-Min")
var decreamentSec = document.querySelector(".dec-Sec")

var Hours = document.querySelector("#hrs")
var Minutes = document.querySelector("#min")
var Seconds = document.querySelector("#sec")

var Start = document.querySelector(".start")
var Stop = document.querySelector(".stop")
var Restart = document.querySelector(".restart")


var Hrs = document.querySelector("#hrs").innerHTML;
var Min = document.querySelector("#min").innerHTML;
var Sec = document.querySelector("#sec").innerHTML;

var toggleBtnLen = document.querySelectorAll(".toggle").length;

var clockStart = false;
var timerInterval = null;
var sucessSound = new Audio("Audio/notification_sound.mp3");
var audioChecked = document.querySelector("input[type=checkbox]").checked = true;
var checkbox = document.querySelector("input[type=checkbox]");
var Buttons = document.querySelectorAll(".up,.down");
var divider = document.querySelectorAll(".divider");
let range = document.querySelector(".range");
let fullrange = 100;
var totalrange = 0;
var rangeinSeconds = 0;
var count = 0;

// ---------------Increments Buttons Start---------------

incrementHrs.addEventListener("click", function () {
    Hours.classList.add("text-fade");
    Hrs++;
    if (Hrs == 100) {
        Hrs = 0;
    }
    Hours.innerHTML = Hrs < 10 ? "0" + Hrs : Hrs;

    setTimeout(() => {
        Hours.classList.remove("text-fade");
    }, 500);
});

incrementMin.addEventListener("click", function () {
    Minutes.classList.add("text-fade");
    Min++
    if (Min == 60) {
        Min = 0;
    }
    Minutes.innerHTML = Min < 10 ? "0" + Min : Min;

    setTimeout(() => {
        Minutes.classList.remove("text-fade");
    }, 500);
});

incrementSec.addEventListener("click", function () {
    Seconds.classList.add("text-fade");
    Sec++
    if (Sec == 60) {
        Sec = 0;
    }
    Seconds.innerHTML = Sec < 10 ? "0" + Sec : Sec;


    setTimeout(() => {
        Seconds.classList.remove("text-fade");
    }, 500);

});

// ---------------Increments Buttons End ---------------

// ---------------Decrement Buttons Start ---------------

decreamentHrs.addEventListener("click", function () {
    Hours.classList.add("text-fade");
    Hrs--;
    if (Hrs < 0) {
        Hrs = 99;
    }
    Hours.innerHTML = Hrs < 10 ? "0" + Hrs : Hrs;

    setTimeout(() => {
        Hours.classList.remove("text-fade");
    }, 500);
})

decreamentMin.addEventListener("click", function () {
    Minutes.classList.add("text-fade");
    Min--;
    if (Min < 0) {
        Min = 59;
    }
    Minutes.innerHTML = Min < 10 ? "0" + Min : Min;

    setTimeout(() => {
        Minutes.classList.remove("text-fade");
    }, 500);
})

decreamentSec.addEventListener("click", function () {
    Seconds.classList.add("text-fade");
    Sec--;
    if (Sec < 0) {
        Sec = 59;
    }
    Seconds.innerHTML = Sec < 10 ? "0" + Sec : Sec;

    setTimeout(() => {
        Seconds.classList.remove("text-fade");
    }, 500);
})

// ---------------Decrement Buttons End ---------------

//---------------- Checkbox Value Start ----------------

checkbox.addEventListener('change', function () {
    if (this.checked) {
        audioChecked = true;
    }
    else {
        audioChecked = false;
    }
});

//---------------- Checkbox Value End ----------------

// --------------- Calculation For Range Start -------------
function getrange() {
    rangeinSeconds = parseInt(Sec);
    rangeinSeconds += parseInt(Min * 60);
    rangeinSeconds += parseInt((Hrs * 60) * 60);
    totalrange = rangeinSeconds;
    rangeinSeconds = parseFloat((100 / rangeinSeconds)).toFixed(2);
    totalrange = (((totalrange / 100) * 50) * rangeinSeconds).toFixed(2);
    console.log(totalrange);
}
// --------------- Calculation For Range End ---------------

// -------------------Timer Function Start-------------------

Start.addEventListener("click", function () {
    if (!clockStart) {
        animateButton(this.id)
        disableButton();
        count++;

        if (count == 1) {
            getrange();
        }

        divider.forEach(Element => Element.classList.add("divider-animation"));

        timerInterval = setInterval(function () {
            if (Hrs == 0 && Min == 0 && Sec == 0) {
                if (audioChecked) {
                    sucessSound.play();
                }
                enableButon();
                clearInterval(timerInterval);
                clockStart = false;
                Start.classList.remove("pressed");
                Stop.classList.remove("pressed");
                Start.style.display = "none";
                Stop.style.display = "none";
                rangeinSeconds = 0;
                fullrange = 100;
                range.style.width = 100 + "%";
                divider.forEach(Element => Element.classList.remove("divider-animation"));
                count = 0;
                range.style.backgroundColor = "green";
            }

            else {
                if (Sec == 0) {
                    if (Min > 0) {
                        Min--;
                        Minutes.innerHTML = Min < 10 ? "0" + Min : Min;
                        Sec = 59;
                        Seconds.innerHTML = "59";
                    }

                    else {
                        Sec = 0;
                    }
                }

                else if (Sec > 0) {
                    Sec--;
                    Seconds.innerHTML = Sec < 10 ? "0" + Sec : Sec;
                }

                if (Min == 0) {
                    if (Hrs > 0) {
                        Hrs--;
                        Hours.innerHTML = Hrs < 10 ? "0" + Hrs : Hrs;
                        Min = 59;
                        Minutes.innerHTML = "59";
                    }
                    else {
                        Min = 0;
                    }
                }
            }
            setrange();
        }, 1000)

        clockStart = true;
    }
})
// ------------------- Timer Function End -------------------

// ------------------- Setrange Function Start -------------------

function setrange() {
    fullrange -= rangeinSeconds;
    console.log(fullrange, rangeinSeconds);
    if (fullrange <= totalrange) {
        range.style.backgroundColor = "red";
    }
    if (fullrange < 0) {
        fullrange = 0;
    }
    range.style.width = fullrange + "%";
}

// ------------------- Setrange Function End -------------------


// ------------------- Timer Stop Function Start -------------------

Stop.addEventListener("click", function () {
    if (clockStart) {
        // enableButon();
        animateButton(this.id)
        clearInterval(timerInterval);
        clockStart = false;
        divider.forEach(Element => Element.classList.remove("divider-animation"));
    }
})

// ------------------- Timer Stop Function End -------------------


// ------------------- Timer Reset Function Start -------------------
Restart.addEventListener("click", function () {
    enableButon();
    animateButton(this.id)
    clearInterval(timerInterval);
    clockStart = false;
    Hrs = 0;
    Min = 0;
    Sec = 0;
    Hours.innerHTML = "00";
    Minutes.innerHTML = "00";
    Seconds.innerHTML = "00";
    range.style.width = "100%";
    fullrange = 100;
    rangeinSeconds = 0;
    divider.forEach(Element => Element.classList.remove("divider-animation"));
    count = 0;
    range.style.backgroundColor = "green";
})
// ------------------- Timer Reset Function End -------------------

//Hide Buttons When Value Are 0
for (var i = 0; i <= 6; i++) {
    document.querySelectorAll(".up,.down,.restart")[i].addEventListener("click", function () {
        if (Hrs == 0 && Min == 0 && Sec == 0) {
            Start.style.display = "none"
            Stop.style.display = "none"
        }

        else {
            Start.style.display = "inline-block"
            Stop.style.display = "inline-block"
        }
    })
}

// Buttons Animation
function animateButton(btn) {
    var activeButton = document.querySelector("#" + btn);

    if (activeButton == Start) {
        Stop.classList.remove("pressed");
        activeButton.classList.add("pressed");
    }

    else if (activeButton == Stop) {
        Start.classList.remove("pressed");
        activeButton.classList.add("pressed");
    }

    else {
        for (var i = 0; i < toggleBtnLen; i++) {
            document.querySelectorAll(".toggle")[i].classList.remove("pressed");
        }
        activeButton.classList.add("pressed");
        setTimeout(function () {
            activeButton.classList.remove("pressed");
        }, 100)
    }
}


function enableButon() {
    if (Buttons[0].disabled == true) {
        console.log("Here")
        for (var i = 0; i < 6; i++) {
            Buttons[i].disabled = false;
            Buttons[i].style.opacity = "1"
        }
    }

}

function disableButton() {
    for (var i = 0; i < 6; i++) {
        Buttons[i].disabled = true;
        Buttons[i].style.opacity = "0.5"
    }
}