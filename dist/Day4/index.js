"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
let str = "aaaaa-bbb-z-y-x-123[abxyz]";
function stringRoomSplit(str) {
    let stringSplit = str.split(/-|\[|\]/);
    let encryptedName = stringSplit.slice(0, -3).join("-");
    let sectorID = Number(stringSplit[stringSplit.length - 3]);
    let checkSum = stringSplit[stringSplit.length - 2];
    return [encryptedName, sectorID, checkSum];
}
function validiateRoomName(encryptedName, checkSum) {
    let charSet = Array.from(new Set(encryptedName)).sort();
    charSet = charSet.filter((char) => char != "-");
    let counts = charSet.map((char, i) => {
        return [i, encryptedName.split(char).length - 1];
    });
    let nums = [2, 5, 6, 3, 5];
    nums.sort((a, b) => b - a);
    let countsSorted = counts.sort((a, b) => b[1] - a[1]);
    let calcCheckSum = countsSorted
        .map((i) => {
        return charSet[i[0]];
    })
        .slice(0, 5)
        .join("");
    return calcCheckSum == checkSum;
}
function rotateLeftBy(arr, shiftBy) {
    const boundedShiftBy = shiftBy % arr.length;
    let end = arr.slice(0, boundedShiftBy);
    let start = arr.slice(boundedShiftBy);
    return start.concat(end);
}
function decryptRoomName(encryptedName, sectorID) {
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
    const characeterMap = Object.fromEntries(alphabet.map((x, i) => [x, shiftedAlphabet[i]]));
    characeterMap["-"] = "-";
    const decryptedName = encryptedName
        .split("")
        .map((char) => characeterMap[char])
        .join("");
    return decryptedName;
}
function getSectorIDSum(encryptedRooms) {
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
function getDecryptedNames(encryptedRooms) {
    return encryptedRooms.map((encryptedRooms) => {
        const [encryptedName, sectorID, _] = stringRoomSplit(encryptedRooms);
        return decryptRoomName(encryptedName, sectorID);
    });
}
const encryptedRooms = (0, fs_1.readFileSync)("./Day4/input.txt", "utf-8").split("\n");
const decryptedNames = getDecryptedNames(encryptedRooms);
decryptedNames.forEach((name, i) => {
    const words = name.split("-");
    if (words.includes("northpole")) {
        console.log(words);
        console.log(encryptedRooms[i]);
    }
});
//# sourceMappingURL=index.js.map