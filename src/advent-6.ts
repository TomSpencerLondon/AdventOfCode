import { readFile } from "./extract/file-reading";

export const part1 = async (filename: string): Promise<number> => {
  const result = await readFile(filename);
  const groups = result.toString().trim().split("\n\n");
  return groups.reduce(
    (acc: number, group) => acc + currentAnswersForGroup(group),
    0
  );
};

export const currentAnswersForGroup = (group: string): number => {
  const answers = group.split("").filter((c) => c !== "\n");

  const set = new Set(answers);

  return set.size;
};

export const part2 = async (filename: string): Promise<number> => {
  const result = await readFile(filename);
  const groups = result.toString().trim().split("\n\n");
  return groups.reduce(
    (acc: number, group) => acc + currentAnswersForGroupPart2(group),
    0
  );
};

export const currentAnswersForGroupPart2 = (group: string): number => {
  const answers = group
    .split("\n")
    .map((person) => {
      return new Set(person.split(""));
    })
    .reduce((set1, set2) => intersect(set1, set2));

  const set = new Set(answers);

  return set.size;
};

const intersect = (set1: Set<string>, set2: Set<string>): Set<string> => {
  const result: Set<string> = new Set();
  set1.forEach((answer) => {
    if (set2.has(answer)) {
      result.add(answer);
    }
  });

  return result;
};
