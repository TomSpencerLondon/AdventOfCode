import { readFile } from "./extract/file-reading";

type Bags = Record<string, Record<string, number>>;

async function read(filename: string) {
  const result = await readFile(filename);
  const lines = result.toString().trim().split("\n");
  return lines;
}

export const part1 = async (filename: string): Promise<number> => {
  const lines = await read(filename);
  const bags: Bags = {};
  const regex1 = /^([a-z]+ [a-z]+) bags/;
  const regex2 = /(\d) ([a-z]+ [a-z]+) bags?/g;
  lines.forEach((line) => {
    const match1 = regex1.exec(line);

    if (!match1) {
      throw new Error();
    }

    const type = match1[1];

    const contents: Record<string, number> = {};
    bags[type] = contents;

    let match2 = regex2.exec(line);

    while (match2) {
      const count = parseInt(match2[1]);
      const type = match2[2];

      contents[type] = count;

      match2 = regex2.exec(line);
    }
  });

  return Object.keys(bags).filter((type) => {
    return containsShinyGoldBags(bags, type);
  }).length;
};

const containsShinyGoldBags = (bags: Bags, type: string): boolean => {
  const contents = bags[type];
  if (contents["shiny gold"]) {
    return true;
  }

  return Object.keys(contents).some((type) => {
    return containsShinyGoldBags(bags, type);
  });
};

export const part2 = async (filename: string): Promise<number> => {
  const lines = await read(filename);

  const bags: Bags = {};
  const regex1 = /^([a-z]+ [a-z]+) bags/;
  const regex2 = /(\d) ([a-z]+ [a-z]+) bags?/g;

  lines.forEach((line) => {
    const match1 = regex1.exec(line);

    if (!match1) {
      throw new Error();
    }

    const type = match1[1];

    const contents: Record<string, number> = {};

    bags[type] = contents;

    let match2 = regex2.exec(line);

    while (match2) {
      const count = parseInt(match2[1]);
      const type = match2[2];

      contents[type] = count;

      match2 = regex2.exec(line);
    }
  });

  return getBagcount(bags, "shiny gold");
};

const getBagcount = (bags: Bags, type: string): number => {
  let total = 0;
  const contents = bags[type];
  Object.entries(contents).forEach(([type, count]) => {
    total += count;
    total += getBagcount(bags, type) * count;
  });
  return total;
};
