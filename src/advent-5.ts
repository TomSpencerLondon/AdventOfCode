import { readFile } from "./extract/file-reading";

export const binaryConversion = (ticket: string): number => {
  const binaryColumn = ticket
    .split("")
    .map((letter) => {
      return letter === "L" || letter === "F" ? "0" : "1";
    })
    .join("");

  const number = parseInt(binaryColumn, 2);
  return number;
};

export const part1 = async (filename: string): Promise<number> => {
  const result = await readFile(filename);

  const tickets = result.toString().trim().split("\n");

  return tickets.reduce(
    (acc, ticket) => Math.max(acc, binaryConversion(ticket)),
    0
  );
};

export const part2 = async (filename: string): Promise<number> => {
  const result = await readFile(filename);
  const tickets = result.toString().trim().split("\n");

  const sortedNumbers = tickets
    .map((ticket) => binaryConversion(ticket))
    .sort();
  console.log(sortedNumbers.reduce((acc, n) => Math.min(acc, n)));
  for (let i = 1; i < sortedNumbers.length; i++) {
    if (sortedNumbers[i] - sortedNumbers[i - 1] === 2) {
      return sortedNumbers[i] - 1;
    }
  }
};
