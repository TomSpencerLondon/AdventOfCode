import { readFile } from "./extract/file-reading";
import { Instruction } from "./instruction/instruction";

async function read(filename: string) {
  const result = await readFile(filename);
  const lines = result.toString().trim().split("\n");
  return lines;
}

async function parseInput(filename: string) {
  const lines = await read(filename);
  const instructions: Instruction[] = [];
  let index = 0;

  lines.forEach((line) => {
    const [operation, argument] = line.split(" ");
    const instruction: Instruction = {
      operation: operation as "acc" | "jmp" | "nop",
      argument: parseInt(argument),
      index: index++,
    };

    instructions.push(instruction);
  });
  return instructions;
}

export const part1 = async (filename: string): Promise<number> => {
  const instructions = await parseInput(filename);
  const { accumulator } = run(instructions);
  return accumulator;
};

export const part2 = async (filename: string): Promise<number> => {
  const instructions = await parseInput(filename);

  const { visitedInstructions } = run(instructions);

  const possiblyFaultyInstructions = [
    ...Array.from(new Set(visitedInstructions)),
  ].filter((instruction) => ["jmp", "nop"].includes(instruction.operation));

  const indexes: number[] = possiblyFaultyInstructions.map(
    (instruction) => instruction.index
  );

  const customInstructions = {};

  for (let i = 0; i < indexes.length; i++) {
    const possible = indexes[i];
    customInstructions[possible] = possiblyFaultyInstructions.find(
      (i) => i.index === possible
    );
  }

  for (let i = 0; i < indexes.length; i++) {
    const possible = indexes[i];
    const initialOperation = customInstructions[possible].operation;
    const custom: Instruction[] = [...instructions];
    const found = {
      ...custom[possible],
      operation: initialOperation === "jmp" ? "nop" : "jmp",
    };

    custom.filter((c) => c.index !== possible);
    custom[possible] = <Instruction>found;
    const { exitCode, accumulator } = run(custom as Instruction[]);
    if (exitCode === 0) {
      return accumulator;
    }
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
