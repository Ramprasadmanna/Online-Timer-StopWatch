window.onload = function () {
    var Min = document.querySelector("#min");
    var Sec = document.querySelector("#sec");
    var Msec = document.querySelector("#msec");
    var Start = document.querySelector(".start");
    var Stop = document.querySelector(".stop");
    var Restart = document.querySelector(".restart");
    var lapBtn = document.querySelector(".lap-btn");
    var tableLap = document.querySelector("table");
    var copyBtn = document.querySelector(".copy-btn");
    var colon = document.querySelector(".divide");
    var toggleBtnLen = document.querySelectorAll(".toggle").length;
    //var deleteBtn = document.querySelectorAll(".delete");
    var startClock = false;
    var ms = 0;
    var seconds = 0;
    var minutes = 0;
    var timeInterval = null;
    var divider = document.querySelectorAll(".divide");
    var i = 0;
    var laps = 0;
    var prevMin = 0;
    var prevSec = 0;
    var prevMsec = 0;
    var prevMinimum = "59 : 59 . 99";
    var prevMinimumId = 1;
    var prevMaximum = "00 : 00 . 00";
    var prevMaximumId = 0;
    var startAudio = new Audio("Audio/Start.mp3");
    var lapAudio = new Audio("Audio/Stop.mp3");
    var deleteOp = false

    Start.addEventListener("click", function () {
        if (!startClock) {
            startAudio.play();
            animateBtn(this.innerHTML);
            startClock = true;
            timeInterval = setInterval(function () {
                ms++;
                Msec.innerHTML = ms < 10 ? "0" + ms : ms;
                if (ms == 100) {
                    seconds++
                    Sec.innerHTML = seconds < 10 ? "0" + seconds : seconds;
                    ms = 0;
                    Msec.innerHTML = "0" + 0;
                }

                if (seconds == 60) {
                    minutes++;
                    Min.innerHTML = minutes < 10 ? "0" + minutes : minutes;
                    seconds = 0;
                    Sec.innerHTML = "0" + 0;
                }
            }, 10)
            Start.style.display = "none"
            Stop.style.display = "inline-block"
            Restart.style.display = "none";
            lapBtn.style.display = "inline-block";
        }
    });

    Stop.addEventListener("click", function stop() {
        if (startClock) {
            startAudio.play();
            animateBtn(this.innerHTML)
            clearInterval(timeInterval);
            startClock = false;
            Start.style.display = "inline-block"
            Stop.style.display = "none"
            Restart.style.display = "inline-block";
            lapBtn.style.display = "none";
        }
    });

    Restart.addEventListener("click", function () {
        animateBtn(this.innerHTML);
        startAudio.play();
        clearInterval(timeInterval);
        if (startClock) {
            Stop.style.display = "none"
            Start.style.display = "inline-block"
        }
        startClock = false;
        ms = 0;
        seconds = 0;
        minutes = 0;
        Min.innerHTML = "00"
        Sec.innerHTML = "00"
        Msec.innerHTML = "00"
        tableLap.style.display = "none";
        prevMin = 0;
        prevSec = 0;
        prevMsec = 0;
        prevMaximum = "00 : 00 . 00"
        prevMinimum = "59 : 59 . 99"
        // laps = 0;
        removeLaps();
    });

    lapBtn.addEventListener("click", function () {
        lapAudio.play();
        animateBtn(this.innerHTML);
        tableLap.style.display = "table";
        lap();
    })

    copyBtn.addEventListener("click", function () {
        animateBtn(this.id);
        copyLaps();
    })


    function animateBtn(btn) {
        var activeButton = document.querySelector("#" + btn);
        activeButton.classList.add("pressed");
        setTimeout(function () {
            activeButton.classList.remove("pressed");
        }, 100)
    }

    var tableHead = document.querySelector("tr");
    function lap() {
        laps++;
        var row = document.createElement("tr")
        row.classList.add("remove");
        row.setAttribute("id", laps);
        var srNo = document.createElement("td");
        //-------------------------//
        var note = document.createElement("td");
        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Add Note"
        input.classList.add("name");
        note.appendChild(input);
        //-------------------------//
        var currentLap = document.createElement("td");
        var overallTime = document.createElement("td");
        var deleteLap = document.createElement("td");
        srNo.innerHTML = laps < 10 ? "0" + laps : laps;
        currentLap.innerHTML = timeDiff(minutes, seconds, ms);
        // MinMax(currentLap.innerHTML, laps);
        overallTime.innerHTML = (minutes < 10 ? "0" + minutes : minutes) + " : " + (seconds < 10 ? "0" + seconds : seconds) + " . " + (ms < 10 ? "0" + ms : ms);
        var deleteIcon = document.createElement("Button");
        deleteIcon.classList.add("delete");
        deleteIcon.innerHTML = ('<i class="fa-solid fa-trash-can"></i>')
        deleteLap.appendChild(deleteIcon);
        row.appendChild(srNo);
        row.appendChild(note);
        row.appendChild(currentLap);
        row.appendChild(overallTime);
        row.appendChild(deleteLap);
        tableHead.after(row);
        document.querySelector(".delete").addEventListener("click", function () {
            var x = this.parentNode.parentNode;
            x.classList.add('remove-active');
            x.remove();
            if (document.querySelectorAll(".delete").length == 0) {
                console.log("del");
                tableLap.style.display = "none";
            }
        })

        MinMax(currentLap.innerHTML, laps);
    }

    function removeLaps() {
        var createdLaps = document.querySelectorAll(".remove");
        for (i = 0; i < laps; i++) {
            createdLaps[i].remove();
        }
        laps = 0;
    }

    function timeDiff(currentMinutes, currentSeconds, currentMs) {
        var diffMin = 0;
        var diffSec = 0;
        var diffMsec = 0;

        if (currentMinutes > prevMin) {
            currentMinutes--;
            currentSeconds += 60;
        }

        if (prevMsec > currentMs) {
            currentSeconds--;
            currentMs += 100;
            diffMsec = currentMs - prevMsec;
            diffSec = currentSeconds - prevSec;
            diffMin = currentMinutes - prevMin;
        }

        else if (prevMsec <= currentMs) {
            diffMsec = currentMs - prevMsec;
            diffSec = currentSeconds - prevSec;
            diffMin = currentMinutes - prevMin;
        }

        var diffTime = ((diffMin < 10 ? "0" + diffMin : diffMin) + " : " + (diffSec < 10 ? "0" + diffSec : diffSec) + " . " + (diffMsec < 10 ? "0" + diffMsec : diffMsec));
        prevMin = minutes;
        prevSec = seconds;
        prevMsec = ms;

        return (diffTime);
    }


    function MinMax(cTime, Id) {

        if (Id == 1) {
            prevMinimum = cTime;
            prevMinimumId = Id;
            prevMaximum = cTime;
            prevMaximumId = Id;
        }

        else {
            //Minimum
            if (cTime < prevMinimum) {
                prevMinimum = cTime;
                var minimumValues = document.querySelectorAll(".minimum");
                for (var i = 0; i < minimumValues.length; i++) {
                    minimumValues[i].classList.remove("minimum");
                }
                prevMinimumId = Id;
                document.getElementById(prevMinimumId).classList.add("minimum");
            }

            else if (cTime == prevMinimum) {
                document.getElementById(Id).classList.add("minimum");
            }

            else {
                document.getElementById(prevMinimumId).classList.add("minimum");
            }

            //Maximum

            if (cTime > prevMaximum) {
                prevMaximum = cTime;
                var maxValues = document.querySelectorAll(".max");
                for (var i = 0; i < maxValues.length; i++) {
                    maxValues[i].classList.remove("max");
                }
                prevMaximumId = Id;
                document.getElementById(prevMaximumId).classList.add("max");
            }

            else if (cTime == prevMaximum) {
                document.getElementById(Id).classList.add("max");
            }

            else {
                document.getElementById(prevMaximumId).classList.add("max");
            }

        }

    }

}
