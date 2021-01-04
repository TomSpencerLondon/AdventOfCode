import { readFile } from "./extract/file-reading";
import { Instruction } from "./instruction/instruction";

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

export const part2 = async (filename: string): Promise<number> => {
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

  const { visitedInstructions } = run(instructions);

  const possiblyFaultyInstructions = [
    ...Array.from(new Set(visitedInstructions)),
  ].filter((instruction) => ["jmp", "nop"].includes(instruction.operation));

  for (const possiblyFaultyInstruction of possiblyFaultyInstructions) {
    const initialOperation = possiblyFaultyInstruction.operation;

    possiblyFaultyInstruction.operation =
      initialOperation === "jmp" ? "nop" : "jmp";

    const { exitCode, accumulator } = run(instructions);

    if (exitCode === 0) {
      return accumulator;
    }

    possiblyFaultyInstruction.operation = initialOperation;
  }
};

function run(instructions: Instruction[]): RunResult {
  // THIS IS NEW!
  let exitCode = 0;

  let accumulator = 0;

  let position = 0;
  let instruction = instructions[position];

  const visitedInstructions = new Set<Instruction>();

  // THIS HAS CHANGED!
  while (instruction) {
    // THIS IS NEW!
    if (visitedInstructions.has(instruction)) {
      exitCode = 1;
      break;
    }

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

  // THIS HAS CHANGED!
  return { exitCode, accumulator, visitedInstructions };
}

interface RunResult {
  exitCode: number;
  accumulator: number;
  visitedInstructions: Set<Instruction>;
}
