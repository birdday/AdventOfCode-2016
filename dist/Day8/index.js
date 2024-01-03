"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function executeInstructionSet(screen, instructionSet) {
    for (let i = 0; i < instructionSet.length; i++) {
        let instruction = instructionSet[i];
        executeInstruction(screen, instruction);
    }
}
function executeInstruction(screen, instruction) {
    let txtSplit = instruction.split(/\s|x|=/);
    if (txtSplit[0] == "rect") {
        let a = Number(txtSplit[1]);
        let b = Number(txtSplit[2]);
        rect(screen, a, b);
    }
    if (txtSplit[0] == "rotate" && txtSplit[1] == "row") {
        let y = Number(txtSplit[3]);
        let inc = Number(txtSplit[5]);
        rotateRow(screen, y, inc);
    }
    if (txtSplit[0] == "rotate" && txtSplit[1] == "column") {
        let x = Number(txtSplit[4]);
        let inc = Number(txtSplit[6]);
        rotateColumn(screen, x, inc);
    }
}
function rect(screen, a, b) {
    for (let i = 0; i < a; i++) {
        for (let j = 0; j < b; j++) {
            screen[j][i] = true;
        }
    }
}
function rotateRightBy(arr, inc) {
    const boundedShiftBy = inc > arr.length ? inc % arr.length : inc;
    let end = arr.slice(0, -boundedShiftBy);
    let start = arr.slice(-boundedShiftBy);
    let arrShifted = start.concat(end);
    return arrShifted;
}
function rotateRow(screen, y, inc) {
    let row = screen[y];
    let rowShifted = rotateRightBy(row, inc);
    screen[y] = rowShifted;
}
function rotateColumn(screen, x, inc) {
    const arrayColumn = (arr, n) => arr.map((x) => x[n]);
    let column = arrayColumn(screen, x);
    let columnShifted = rotateRightBy(column, inc);
    for (let i = 0; i < column.length; i++) {
        screen[i][x] = columnShifted[i];
    }
}
function arrayToText(screen, trueChar, falseChar) {
    let screenStringArray = new Array(rows).fill("");
    for (let i = 0; i < screen.length; i++) {
        let row = screen[i];
        let rowStringArray = new Array();
        for (let j = 0; j < row.length; j++) {
            if (row[j]) {
                rowStringArray[j] = trueChar;
            }
            else {
                rowStringArray[j] = falseChar;
            }
        }
        let rowString = rowStringArray.join("");
        screenStringArray[i] = rowString;
    }
    let screenString = screenStringArray.join("\n");
    return screenString;
}
let rows = 6;
let cols = 50;
let pixelArray = new Array(6).fill(new Array(50).fill(false));
for (let i = 0; i < rows; i++) {
    pixelArray[i] = [];
    for (var j = 0; j < cols; j++) {
        pixelArray[i][j] = false;
    }
}
const instructionSet = (0, fs_1.readFileSync)("./src/Day8/input.txt", "utf-8").split("\n");
executeInstructionSet(pixelArray, instructionSet);
console.log("");
console.log(arrayToText(pixelArray, "# ", "  "));
let trueCount = 0;
for (let i = 0; i < rows; i++) {
    let row = pixelArray[i];
    for (j = 0; j < cols; j++) {
        let val = pixelArray[i][j];
        if (val) {
            trueCount += 1;
        }
    }
}
console.log("");
console.log("TrueCount = ", trueCount);
//# sourceMappingURL=index.js.map