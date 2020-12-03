import * as fs from "fs";
import { promisify } from "util";

export const countPasswords = async (filename: string): Promise<number> => {
  const content: Promise<Buffer> = promisify(fs.readFile)(filename);

  const result = await content;
  const lines = result.toString().split("\n");
  const list: string[] = [];
  const allowedLetters: string[] = [];
  const passwords: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    list.push(lines[i].substring(0, lines[i].indexOf(" ")));
  }

  for (let i = 0; i < lines.length; i++) {
    allowedLetters.push(lines[i].replace(/:/g, "").split(" ")[1]);
  }

  for (let i = 0; i < lines.length; i++) {
    passwords.push(lines[i].replace(/:/g, "").split(" ")[2]);
  }

  const firstNumbers: string[] = [];
  const secondNumbers: string[] = [];
  for (let i = 0; i < list.length - 1; i++) {
    const numbers = list[i].split("-");
    firstNumbers.push(numbers[0]);
    secondNumbers.push(numbers[1]);
  }

  let finalResult = 0;
  for (let i = 0; i < lines.length - 1; i++) {
    const min = Math.min.apply(Math, [firstNumbers[i], secondNumbers[i]]),
      max = Math.max.apply(Math, [firstNumbers[i], secondNumbers[i]]);
    const ch = allowedLetters[i];
    const letters = passwords[i];
    const count: number = [...letters.split("")].filter((x) => x === ch).length;
    if (count >= min && count <= max) {
      finalResult += 1;
    }
  }

  return finalResult;
};
