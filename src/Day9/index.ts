/** Experimental file compression
 * Compressed character sequences, whitespace ignored.
 * Repeated characters denoted with a marker (M chars, N repeats -> MxN).
 * Marker preceeds the character(s), and is not included in decompressed data.
 * */

import { readFileSync } from "fs";

// TODO: Check if this modifies in place or not?
function removeWhitespace(input: string): string {
  input.replace(" ", "");
  return input;
}

function decompressString(input: string): string {
  let chars = input.split("");
  let decompressedString: string[] = [];

  for (let i = 0; i < input.length; i++) {
    let char: string = chars[i];

    // Parse marker
    if (char == "(") {
      let [numRepeats, repeatSequence, outerLoopNewIndex] = parseMarker(input, i);
      // Replicate Characters.
      for (let k = 0; k < numRepeats; k++) {
        decompressedString.push(repeatSequence);
      }
      // Update Index
      i = outerLoopNewIndex;
    } else {
      decompressedString.push(char);
    }
  }

  // Join decompressed characters to create final string.
  let finalString = decompressedString.join("");
  return finalString;
}

function recursiveDecompressString(input: string): number {
  let chars: string[] = input.split("");
  let decompressedStringLength: number = 0;

  for (let i = 0; i < input.length; i++) {
    let char: string = chars[i];
    if (char == "(") {
      let [numRepeats, repeatSequence, outerLoopNewIndex] = parseMarker(input, i);
      decompressedStringLength += numRepeats * recursiveDecompressString(repeatSequence);
      i = outerLoopNewIndex;
    } else {
      decompressedStringLength += 1;
    }
  }

  return decompressedStringLength;
}

function parseMarker(input: String, startIndex: number): [number, string, number] {
  let chars = input.split("");
  let marker = [];

  for (let j = startIndex + 1; j < input.length; j++) {
    let markerChar = chars[j];

    // Terminal Character in Marker
    if (markerChar == ")") {
      let markerStr = marker.join("");
      let markerStrSplit = markerStr.split("x");
      let numChars = Number(markerStrSplit[0]);
      let numRepeats = Number(markerStrSplit[1]);
      let repeatSequence = chars.slice(j + 1, j + 1 + numChars).join("");
      let outerLoopNewIndex = j + numChars;

      // Exit early and return needed values.
      return [numRepeats, repeatSequence, outerLoopNewIndex];
    } else {
      marker.push(markerChar);
    }
  }

  // Valid strings will always exit before j == input.length
  throw new Error("Invalid Input. No closing ')' in marker.");
}

// Part 1
// Examples
// const ex1 = decompressString("A(1x5)BC");
// console.log(ex1);
// const ex2 = decompressString("(6x1)(1x3)A");
// console.log(ex2);
// const ex3 = decompressString("X(8x2)(3x3)ABCY");
// console.log(ex3);

// Problem
// const input = readFileSync("./src/Day9/input.txt", "utf-8");
// let answer = decompressString(input);
// console.log(answer.length);

// Part 2
// Examples
// const ex1 = recursiveDecompressString("X(8x2)(3x3)ABCY");
// console.log(ex1);
// const ex2 = recursiveDecompressString("(27x12)(20x12)(13x14)(7x10)(1x12)A");
// console.log(ex2);

// Problem
const input = readFileSync("./src/Day9/input.txt", "utf-8");
let answer = recursiveDecompressString(input);
console.log(answer);
