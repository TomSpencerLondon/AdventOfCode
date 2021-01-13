import { readFile } from "./extract/file-reading";

async function read(filename: string) {
  const result = await readFile(filename);
  const lines = result.toString().trim().split("\n");
  return lines;
}

export const part1 = async (filename: string): Promise<number> => {
  const lines = await read(filename);
  const joltages = lines.map(Number).sort((a, b) => a - b);

  const builtInJoltage = Math.max(...joltages) + 3;
  joltages.push(builtInJoltage);

  let oneJolt = 0;
  let threeJolt = 0;

  let rating = 0;
  while (rating < builtInJoltage) {
    if (joltages.includes(rating + 1)) {
      oneJolt++;
      rating++;
      continue;
    }

    if (joltages.includes(rating + 2)) {
      rating += 2;
      continue;
    }

    if (joltages.includes(rating + 3)) {
      threeJolt++;
      rating += 3;
    }
  }
  return oneJolt * threeJolt;
};

export const part2 = async (filename: string): Promise<number> => {
  const lines = await read(filename);
  const joltages = lines.map(Number).sort((a, b) => a - b);

  const builtInJoltage = Math.max(...joltages) + 3;
  joltages.push(builtInJoltage);

  const solution = new Map<number, number>();
  solution.set(0, 1);

  const differences = [1, 2, 3];

  joltages.forEach((joltage) => {
    solution.set(joltage, 0);

    differences.forEach((difference) => {
      if (solution.has(joltage - difference)) {
        solution.set(
          joltage,
          solution.get(joltage)! + solution.get(joltage - difference)!
        );
      }
    });
  });

  return solution.get(Math.max(...joltages));
};
