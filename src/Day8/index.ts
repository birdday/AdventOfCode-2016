import { readFileSync } from "fs";

// ---------- Functions ----------
function executeInstructionSet(
  screen: boolean[][],
  instructionSet: string[]
): void {
  for (let i = 0; i < instructionSet.length; i++) {
    let instruction = instructionSet[i];
    // console.log("");
    // console.log(instruction);
    executeInstruction(screen, instruction);
    // console.log(arrayToText(pixelArray, "#", "."));
  }
}

function executeInstruction(screen: boolean[][], instruction: string): void {
  let txtSplit: string[] = instruction.split(/\s|x|=/);
  // hacky, but x only appears in rect AxB and in rotate column x=#

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

function rect(screen: boolean[][], a: number, b: number): void {
  // Rect insturctions are for width then height (# of columns, then # of row, hence j,i not i,j)
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      // Is there a shorthand for this?
      // screen[j][i] = !screen[j][i];
      screen[j][i] = true;
    }
  }
}

function rotateRightBy(arr: any[], inc: number): any[] {
  const boundedShiftBy = inc > arr.length ? inc % arr.length : inc;
  let end = arr.slice(0, -boundedShiftBy);
  let start = arr.slice(-boundedShiftBy);
  let arrShifted = start.concat(end);

  return arrShifted;
}

function rotateRow(screen: boolean[][], y: number, inc: number): void {
  let row = screen[y];
  let rowShifted = rotateRightBy(row, inc);
  screen[y] = rowShifted;
}

function rotateColumn(screen: boolean[][], x: number, inc: number): void {
  const arrayColumn = (arr: any[], n: number) => arr.map((x) => x[n]); // Review this line.
  let column = arrayColumn(screen, x);
  let columnShifted = rotateRightBy(column, inc);
  for (let i = 0; i < column.length; i++) {
    screen[i][x] = columnShifted[i];
  }
}

function arrayToText(screen: boolean[][], trueChar: string, falseChar: string) {
  let screenStringArray: string[] = new Array(rows).fill("");

  for (let i = 0; i < screen.length; i++) {
    let row = screen[i];
    let rowStringArray: string[] = new Array();

    for (let j = 0; j < row.length; j++) {
      if (row[j]) {
        rowStringArray[j] = trueChar;
      } else {
        rowStringArray[j] = falseChar;
      }
    }

    let rowString = rowStringArray.join("");
    screenStringArray[i] = rowString;
  }

  let screenString: string = screenStringArray.join("\n");
  return screenString;
}

// ---------- Execute, Part 1 ----------
// --- Initialize Array
let rows: number = 6; //height
let cols: number = 50; //width
// Create array as booleans, and then when finished, convert final array from bools to pixels.
// Makes it easier to change displayed characters, and can do operations by doing !value.
let pixelArray: boolean[][] = new Array(6).fill(new Array(50).fill(false));

// Initialize Values of pixelArray
for (let i = 0; i < rows; i++) {
  // Why does TypeScriopt allow these intermediate arrays which break the typing??
  pixelArray[i] = [];
  for (var j = 0; j < cols; j++) {
    pixelArray[i][j] = false;
  }
}

// --- Update Pixels
const instructionSet: string[] = readFileSync(
  "./src/Day8/input.txt",
  "utf-8"
).split("\n");
executeInstructionSet(pixelArray, instructionSet);

// --- Display Results
console.log("");
console.log(arrayToText(pixelArray, "# ", "  "));

let trueCount: number = 0;
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
