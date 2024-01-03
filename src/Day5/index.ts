// Review type script project setup

import { md5 } from "js-md5";

function checkHash(hash: string) {
  return hash.slice(0, 5) == "00000" ? hash.charAt(5) : false;
}

function generatePassword(str: string, index: number) {
  let password: string = "";
  while (password.length < 8) {
    const hash = md5(str + index.toString());
    const char = checkHash(hash);
    if (char) {
      console.log(index);
      password += char;
    }
    index += 1;
  }
  return password;
}

// Why does it think slice can evaluate to string instead of string[]?
function checkBetterHash(hash: string): string | string[] {
  return hash.slice(0, 5) == "00000" ? hash.slice(5, 7) : ["", ""];
}

function generateBetterPassword(str: string, index: number): string {
  // when do we need to use new;
  let password: string[] = new Array(8).fill("");

  while ([""].some((r) => password.includes(r))) {
    const hash = md5(str + index.toString());
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

// Part 1
const start = performance.now();
console.log(generatePassword("ugkcyxxp", 0));
const end = performance.now();
console.log(`Execution time: ${end - start} ms`);

// Part 2
// const start = performance.now();
// console.log(generateBetterPassword("ugkcyxxp", 0));
// const end = performance.now();
// console.log(`Execution time: ${end - start} ms`);
