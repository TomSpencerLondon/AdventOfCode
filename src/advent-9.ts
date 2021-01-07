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
