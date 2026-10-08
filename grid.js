// Author: Naeem Khwajazada
// Init variables
var grid = [];
var rows = 10;
var cols = rows;
// State Variable
var displayMode = "MARKERS";
// Fun variables
var color1 = "lightblue";
var color2 = "white";

window.onload = function() {
    init_chart();
}

// initializes the grid and sets a default state
function init_chart() {
    // Init Buttons
    const button = document.getElementById("markers");
    button.style.background = "#444";
    button.setAttribute("disabled", "disabled");
    button.addEventListener("click", toMarkers);
    document.getElementById("mosaic").addEventListener("click", toMosaic);
    document.getElementById("slip").addEventListener("click", toSlip);
    // Init grid
    for(let i=0; i<rows; i++) {
        let row = [];
        for(let j=0; j<cols; j++) {
            let cell = document.createElement("div");
            cell.id = i.toString() + '-' + j.toString();
            cell.addEventListener("click", clickCell)
            if (i%2 == 0) {
                cell.style.background = "white";
            } else {
                cell.style.background = "black";
            }
            document.getElementById('chart').append(cell);
            row.push(cell);
        }
        grid.push(row);
    }
}

function toMarkers() {
    this.style.background = "#444";
    this.setAttribute("disabled", "disabled");
    if (document.getElementById("mosaic").disabled == true) {
        document.getElementById("mosaic").disabled = false;
        document.getElementById("mosaic").style.background = "#888";
    } else {
        document.getElementById("slip").disabled = false;
        document.getElementById("slip").style.background = "#888";
    }
    if (displayMode === "MOSAIC") {
        mosaicToMarkers();
    } else {
        slipToMarkers();
    }
    displayMode = "MARKERS";
}

function slipToMarkers() {
    for(let i=0; i<rows; i++) {
        for(let j=0; j<cols; j++) {
            if (document.getElementById(i + "-" + j).style.background == color1 && i%2 == 0) {
                document.getElementById(i + "-" + j).innerText = "X";
                document.getElementById(i + "-" + j).style.background = "white";
            } else if (document.getElementById(i + "-" + j).style.background == color1 && i%2 == 1){
                document.getElementById(i + "-" + j).innerText = "X";
                document.getElementById(i + "-" + j).style.background = "black";
            } else if (document.getElementById(i + "-" + j).style.background != color1 && i%2 == 0) {
                document.getElementById(i + "-" + j).style.background = "white";
            } else if (document.getElementById(i + "-" + j).style.background != color1 && i%2 == 1) {
                document.getElementById(i + "-" + j).style.background = "black";
            }
        }
    }
}

function mosaicToMarkers() {
    for(let i=0; i<rows; i++) {
        for(let j=0; j<cols; j++) {
            if (document.getElementById(i + "-" + j).style.background == "black" && i%2 == 0) {
                document.getElementById(i + "-" + j).innerText = "X";
                document.getElementById(i + "-" + j).style.background = "white";
            } else if (document.getElementById(i + "-" + j).style.background == "white" && i%2 == 1) {
                document.getElementById(i + "-" + j).innerText = "X";
                document.getElementById(i + "-" + j).style.background = "black";
            }
        }
    }
}

function toMosaic() {
    this.style.background = "#444";
    this.setAttribute("disabled", "disabled");
    if (document.getElementById("markers").disabled == true) {
        document.getElementById("markers").disabled = false;
        document.getElementById("markers").style.background = "#888";
    } else {
        document.getElementById("slip").disabled = false;
        document.getElementById("slip").style.background = "#888";
    }
    if (displayMode === "MARKERS") {
        markersToMosaic();
    } else {
        slipToMosaic();
    }
    displayMode = "MOSAIC";
}

function markersToMosaic() {
    for(let i=0; i<rows; i++) {
        for(let j=0; j<cols; j++) {
            if (document.getElementById(i + "-" + j).innerText == "X") {
                document.getElementById(i + "-" + j).innerText = "";
                if (i%2 == 0) {
                    document.getElementById(i + "-" + j).style.background = "black";
                } else {
                    document.getElementById(i + "-" + j).style.background = "white";
                }
            }
        }
    }
}

function slipToMosaic() {
    for(let i=0; i<rows; i++) {
        for(let j=0; j<cols; j++) {
            if (document.getElementById(i + "-" + j).style.background == color1 && i%2 == 0) {
                document.getElementById(i + "-" + j).style.background = "black";
            } else if (document.getElementById(i + "-" + j).style.background == color1 && i%2 == 1){
                document.getElementById(i + "-" + j).style.background = "white";
            } else if (document.getElementById(i + "-" + j).style.background != color1 && i%2 == 0) {
                document.getElementById(i + "-" + j).style.background = "white";
            } else if (document.getElementById(i + "-" + j).style.background != color1 && i%2 == 1) {
                document.getElementById(i + "-" + j).style.background = "black";
            }
        }
    }
}

function toSlip() {
    this.style.background = "#444";
    this.setAttribute("disabled", "disabled");
    if (document.getElementById("markers").disabled == true) {
        document.getElementById("markers").disabled = false;
        document.getElementById("markers").style.background = "#888";
    } else {
        document.getElementById("mosaic").disabled = false;
        document.getElementById("mosaic").style.background = "#888";
    }
    if (displayMode === "MARKERS") {
        markersToSlip();
    } else {
        mosaicToSlip();
    }
    displayMode = "SLIP";
}

function markersToSlip() {
    for(let i=0; i<rows; i++) {
        for(let j=0; j<cols; j++) {
            if (document.getElementById(i + "-" + j).innerText == "X") {
                document.getElementById(i + "-" + j).innerText = "";
                document.getElementById(i + "-" + j).style.background = color1;
            } else {
                document.getElementById(i + "-" + j).style.background = color2;
            }
        }
    }
}

function mosaicToSlip() {
    for(let i=0; i<rows; i++) {
        for(let j=0; j<cols; j++) {
            if (document.getElementById(i + "-" + j).style.background == "black" && i%2 == 0) {
                document.getElementById(i + "-" + j).style.background = color1;
            } else if (document.getElementById(i + "-" + j).style.background == "white" && i%2 == 1){
                document.getElementById(i + "-" + j).style.background = color1;
            } else {
                document.getElementById(i + "-" + j).style.background = color2;

            }
        }
    }
}

function clickCell() {
    let cell = this;
    if (displayMode === "MARKERS") {
        if (cell.innerText == "") {
            cell.innerText = "X";
        } else {
            cell.innerText = "";
        }
    } else if (displayMode === "MOSAIC") {
        if (cell.style.background == "white") {
            cell.style.background = "black";
        } else {
            cell.style.background = "white";
        }
    } else if (displayMode === "SLIP") {
        if (cell.style.background == color1) {
            cell.style.background = color2;
        } else {
            cell.style.background = color1;
        }
    }
}