// Author: Naeem Khwajazada
// Init variables
var cols = 10; // m
var rows = cols; // n
// State Variable
var displayMode = "markers";
// Fun variables
var color1 = "lightblue";
var color2 = "white";

window.onload = function() {
    initDisplayButtons();
    initChart();
}

function initDisplayButtons() {
    // Init Buttons
    const button = document.getElementById("markers");
    button.style.background = "#444";
    button.setAttribute("disabled", "disabled");
    button.addEventListener("click", toMarkers);
    document.getElementById("mosaic").addEventListener("click", toMosaic);
    document.getElementById("slip").addEventListener("click", toSlip);
    document.getElementById("chart-change").addEventListener("click", newChart);
}

// initializes the chart and sets a default state
function initChart() {
    // Init chart
    for(let i=0; i<rows; i++) {
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
        }
    }
}

function newChart() {
    // clear chart
    for (let i=0; i<rows; i++) {
        for (let j=0; j<cols; j++) {
            element = document.getElementById(i + "-" + j);
            element.remove();
        }
    }
    // reset states
    document.getElementById(displayMode).disabled = false;
    document.getElementById(displayMode).style.background = "#888";
    displayMode = "markers";
    document.getElementById(displayMode).disabled = true;
    document.getElementById(displayMode).style.background = "#444";
    // get n, m, & external grid size
    rows = document.getElementById("n-cells").valueAsNumber;
    cols = document.getElementById("m-cells").valueAsNumber;
    const chartSize = document.getElementById("grid").getBoundingClientRect().width - 2;
    // determine size of cells based on the smaller axis
    let newCellSize = (chartSize / rows) - 2;
    if (rows < cols) {
        newCellSize = (chartSize / cols) - 2;
    }
    // rescale internal grid
    const root = document.documentElement;
    root.style.setProperty("--chart-size-x", String((newCellSize + 2) * cols) + "px");
    root.style.setProperty("--chart-size-y", String((newCellSize + 2) * rows) + "px");
    root.style.setProperty("--cell-size", String(newCellSize) + "px");
    // rebuild chart
    initChart();
}

function toMarkers() {
    this.style.background = "#444";
    this.setAttribute("disabled", "disabled");
    document.getElementById(displayMode).disabled = false;
    document.getElementById(displayMode).style.background = "#888";
    if (displayMode === "mosaic") {
        mosaicToMarkers();
    } else {
        slipToMarkers();
    }
    displayMode = "markers";
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
    document.getElementById(displayMode).disabled = false;
    document.getElementById(displayMode).style.background = "#888";
    if (displayMode === "markers") {
        markersToMosaic();
    } else {
        slipToMosaic();
    }
    displayMode = "mosaic";
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
    document.getElementById(displayMode).disabled = false;
    document.getElementById(displayMode).style.background = "#888";
    if (displayMode === "markers") {
        markersToSlip();
    } else {
        mosaicToSlip();
    }
    displayMode = "slip";
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
    if (displayMode === "markers") {
        if (cell.innerText == "") {
            cell.innerText = "X";
        } else {
            cell.innerText = "";
        }
    } else if (displayMode === "mosaic") {
        if (cell.style.background == "white") {
            cell.style.background = "black";
        } else {
            cell.style.background = "white";
        }
    } else if (displayMode === "slip") {
        if (cell.style.background == color1) {
            cell.style.background = color2;
        } else {
            cell.style.background = color1;
        }
    }
}