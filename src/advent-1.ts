import * as fs from "fs";
import { promisify } from "util";

export const findTwoNumbers = async (filename: string): Promise<number> => {
  const content: Promise<Buffer> = promisify(fs.readFile)(filename);

  const result = await content;
  const numbers = result.toString().split("\n");
  const sum = 2020;
  let number1 = 0;
  let number2 = 0;

  for (const n of numbers) {
    const possible1 = parseInt(n);
    const diff: number = sum - possible1;
    for (let i = 0; i < numbers.length; i++) {
      const possible = parseInt(numbers[i]);
      if (diff === possible) {
        number1 = possible1;
        number2 = possible;
      }
    }
  }

  return number1 * number2;
};

export const findThreeNumbers = async (filename: string): Promise<number> => {
  const content: Promise<Buffer> = promisify(fs.readFile)(filename);

  const result = await content;
  const numbers = result.toString().split("\n");
  const length = numbers.length;
  const sum = 2020;
  let number1 = 0;
  let number2 = 0;
  let number3 = 0;
  for (let i = 0; i < length - 2; i++) {
    const set = new Set();
    const currentSum = sum - parseInt(numbers[i]);
    for (let j = i + 1; j < length; j++) {
      if (set.has(currentSum - parseInt(numbers[j]))) {
        number1 = parseInt(numbers[i]);
        number2 = parseInt(numbers[j]);
        number3 = currentSum - parseInt(numbers[j]);
      }
      set.add(parseInt(numbers[j]));
    }
  }

  return number1 * number2 * number3;
};
