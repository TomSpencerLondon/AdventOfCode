import { readFile } from "./extract/file-reading";

export const binaryConversion = (ticket: string): number => {
  const binaryColumn = ticket
    .split("")
    .map((letter) => {
      return letter === "L" || letter === "F" ? "0" : "1";
    })
    .join("");

  return parseInt(binaryColumn, 2);
};

export const part1 = async (filename: string): Promise<number> => {
  const result = await readFile(filename);
  throw new Error("Unsupported");
};
