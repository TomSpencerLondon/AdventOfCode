import { readFile } from "./extract/file-reading";

async function read(filename: string) {
  const result = await readFile(filename);
  const lines = result.toString().trim().split("\n");
  return lines;
}

export const part1 = async (filename: string): Promise<number> => {
  const lines = await read(filename);
  const numbers = lines.map((line) => Number(line));

  const PREAMBLE_SIZE = 25;

  for (let i = PREAMBLE_SIZE; i < numbers.length; i++) {
    const number = numbers[i];

    const preamble = numbers.slice(i - PREAMBLE_SIZE, i);

    const numberIsValid = preamble.some((first) => {
      return preamble.some((second) => {
        if (first === second) return false;
        return first + second === number;
      });
    });

    if (!numberIsValid) {
      return number;
    }
  }
};

export const part2 = async (filename: string): Promise<number> => {
  const lines = await read(filename);
  const numbers = lines.map((line) => Number(line));
  const invalidNumber = findInvalidNumber(numbers);
  for (let size = 2; size < numbers.length; size++) {
    for (let start = 0; start <= numbers.length - size; start++) {
      const end = start + size;

      const window = numbers.slice(start, end);
      const sum = window.reduce(
        (previousValue, currentValue) => previousValue + currentValue
      );

      if (sum === invalidNumber) {
        const result = window.sort((a, b) => a - b);
        return result.shift()! + result.pop()!;
      }
    }
  }
};

const findInvalidNumber = (numbers: number[]): number => {
  const PREAMBLE_SIZE = 25;

  for (let i = PREAMBLE_SIZE; i < numbers.length; i++) {
    const number = numbers[i];

    const preamble = numbers.slice(i - PREAMBLE_SIZE, i);

    const numberIsValid = preamble.some((first) => {
      return preamble.some((second) => {
        if (first === second) return false;
        return first + second === number;
      });
    });

    if (!numberIsValid) {
      return number;
    }
  }

  // Should never happen.
  throw new Error();
}
