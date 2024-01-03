import { readFileSync } from "fs";

// What is the ideal extent of type annotating?
let str: string = "aaaaa-bbb-z-y-x-123[abxyz]";
function stringRoomSplit(str: string): [string, number, string] {
  let stringSplit: string[] = str.split(/-|\[|\]/);
  let encryptedName: string = stringSplit.slice(0, -3).join("-");
  let sectorID: number = Number(stringSplit[stringSplit.length - 3]);
  let checkSum: string = stringSplit[stringSplit.length - 2];

  return [encryptedName, sectorID, checkSum];
}

function validiateRoomName(encryptedName: string, checkSum: string): boolean {
  // Could loop over chars in the supplied checksum and then analyze the counts too.
  // Generate actual checkSum
  // Generate character set and sort alphabetically, since ties are decided alphabetically.
  let charSet = Array.from(new Set(encryptedName)).sort();
  charSet = charSet.filter((char) => char != "-");
  let counts: number[][] = charSet.map((char, i) => {
    return [i, encryptedName.split(char).length - 1];
  });

  let nums: number[] = [2, 5, 6, 3, 5];
  nums.sort((a, b) => b - a);

  let countsSorted: number[][] = counts.sort((a, b) => b[1] - a[1]);
  let calcCheckSum: string = countsSorted
    .map((i) => {
      return charSet[i[0]];
    })
    .slice(0, 5)
    .join("");

  // Compare to expected checkSum, and return value
  return calcCheckSum == checkSum;
}

// How to make this independent of array type??
function rotateLeftBy(arr: string[], shiftBy: number): string[] {
  const boundedShiftBy = shiftBy % arr.length;
  let end: string[] = arr.slice(0, boundedShiftBy);
  let start: string[] = arr.slice(boundedShiftBy);
  return start.concat(end);
}

function decryptRoomName(encryptedName: string, sectorID: number): string {
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const shiftedAlphabet = rotateLeftBy(alphabet, sectorID);
  // Why can I modify a const var?
  // Look into frozen objects, frozen maps, etc.
  const characeterMap = Object.fromEntries(
    alphabet.map((x, i) => [x, shiftedAlphabet[i]])
  );
  characeterMap["-"] = "-";
  const decryptedName = encryptedName
    .split("")
    .map((char) => characeterMap[char])
    .join("");

  return decryptedName;
}

function getSectorIDSum(encryptedRooms: string[]): number {
  let sectorIDSum = 0;
  encryptedRooms.forEach((encryptedRooms) => {
    const [encryptedName, sectorID, checkSum] = stringRoomSplit(encryptedRooms);
    const isValid = validiateRoomName(encryptedName, checkSum);
    if (isValid) {
      sectorIDSum += sectorID;
    }
  });

  return sectorIDSum;
}

function getDecryptedNames(encryptedRooms: string[]): string[] {
  return encryptedRooms.map((encryptedRooms) => {
    const [encryptedName, sectorID, _] = stringRoomSplit(encryptedRooms);
    return decryptRoomName(encryptedName, sectorID);
  });
}

// Single String Examples

// let str: string = "a-b-c-d-e-f-g-h-987[abcde]"
// let str: string = "not-a-real-room-404[oarel]"
// let str: string = "totally-real-room-200[decoy]"
// let str: string = "aaaaaaaaaa-200[decoy]"
// let str: string = "aczupnetwp-dnlgpyrpc-sfye-dstaatyr-561[patyc]"

// const [encryptedName, sectorID, checkSum] = stringRoomSplit(str)
// console.log(encryptedName, sectorID, checkSum)
// const isValid = validiateRoomName(encryptedName, checkSum)
// console.log(isValid)
// const decryptedName = decryptRoomName(encryptedName, sectorID)
// console.log(decryptedName)

// Part 1
const encryptedRooms: string[] = readFileSync(
  "./Day4/input.txt",
  "utf-8"
).split("\n");
// console.log(getSectorIDSum(encryptedRooms))

// Part 2
const decryptedNames = getDecryptedNames(encryptedRooms);
decryptedNames.forEach((name, i) => {
  const words = name.split("-");
  if (words.includes("northpole")) {
    console.log(words);
    console.log(encryptedRooms[i]);
  }
});
