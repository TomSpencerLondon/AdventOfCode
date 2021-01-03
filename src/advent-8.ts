import { readFile } from "./extract/file-reading";
import { Instruction } from "./instruction/instruction";

type Bags = Record<string, Record<string, number>>;

async function read(filename: string) {
  const result = await readFile(filename);
  const lines = result.toString().trim().split("\n");
  return lines;
}

export const part1 = async (filename: string): Promise<number> => {
  const lines = await read(filename);
  const instructions: Instruction[] = [];

  lines.forEach((line) => {
    const [operation, argument] = line.split(" ");
    const instruction: Instruction = {
      operation: operation as "acc" | "jmp" | "nop",
      argument: parseInt(argument),
    };

    instructions.push(instruction);
  });

  let accumulator = 0;
  let position = 0;
  let instruction = instructions[position];

  const visitedInstructions = new Set<Instruction>();

  while (!visitedInstructions.has(instruction)) {
    switch (instruction.operation) {
      case "acc":
        accumulator += instruction.argument;
        position++;
        break;
      case "jmp":
        position += instruction.argument;
        break;
      case "nop":
        position++;
        break;
    }

    visitedInstructions.add(instruction);
    instruction = instructions[position];
  }

  return accumulator;
};
