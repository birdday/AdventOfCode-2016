/** Experimental file compression
 * Compressed character sequences, whitespace ignored.
 * Repeated characters denoted with a marker (M chars, N repeats -> MxN).
 * Marker preceeds the character(s), and is not included in decompressed data.
 * */

import { readFileSync } from "fs";

function removeWhitespace(input: string) {
  input.replace(" ", "");
  return input;
}

function decompressString(input: string) {
  let chars = input.split("");
  let decompressedString: string[] = [];

  for (let i = 0; i < input.length; i++) {
    let char: string = chars[i];

    // Collect all charcters of marker.
    if (char == "(") {
      let marker = [];

      for (let j = i + 1; j < input.length; j++) {
        let markerChar = chars[j];
        if (markerChar == ")") {
          let markerStr = marker.join("");
          let markerStrSplit = markerStr.split("x");
          let numChars = Number(markerStrSplit[0]);
          let numRepeats = Number(markerStrSplit[1]);
          //   console.log("NumChars: ", numChars, ", NumRepeats: ", numRepeats);
          let repeatSequence = chars.slice(j + 1, j + 1 + numChars).join("");

          // Replicate Characters. Exit j loop.
          for (let k = 0; k < numRepeats; k++) {
            decompressedString.push(repeatSequence);
          }
          // Update index for outer loop.
          // Note, it will be incremented again at end of loop.
          i = j + numChars;

          // Break out of loop.
          break;
        } else {
          marker.push(markerChar);
        }
      }
    } else {
      decompressedString.push(char);
    }
  }

  // Join decompressed characters to create final string.
  let finalString = decompressedString.join("");
  return finalString;
}

function recursiveDecompressString(input: string) {}

// Part 1
// Examples
// decompressString("A(1x5)BC");
// decompressString("(6x1)(1x3)A");
// decompressString("X(8x2)(3x3)ABCY");

// Problem
const input = readFileSync("./src/Day9/input.txt", "utf-8");
let answer = decompressString(input);
console.log(answer.length);

// Part 2
