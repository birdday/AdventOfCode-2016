"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const js_md5_1 = require("js-md5");
function checkHash(hash) {
    return hash.slice(0, 5) == "00000" ? hash.charAt(5) : false;
}
function generatePassword(str, index) {
    let password = "";
    while (password.length < 8) {
        const hash = (0, js_md5_1.md5)(str + index.toString());
        const char = checkHash(hash);
        if (char) {
            console.log(index);
            password += char;
        }
        index += 1;
    }
    return password;
}
function checkBetterHash(hash) {
    return hash.slice(0, 5) == "00000" ? hash.slice(5, 7) : ["", ""];
}
function generateBetterPassword(str, index) {
    let password = new Array(8).fill("");
    while ([""].some((r) => password.includes(r))) {
        const hash = (0, js_md5_1.md5)(str + index.toString());
        const [pos, char] = checkBetterHash(hash);
        if (char) {
            if (password[Number(pos)] == "") {
                password[Number(pos)] = char;
                console.log(index, password);
            }
        }
        index += 1;
    }
    return password.join("");
}
const start = performance.now();
console.log(generatePassword("ugkcyxxp", 0));
const end = performance.now();
console.log(`Execution time: ${end - start} ms`);
//# sourceMappingURL=index.js.map