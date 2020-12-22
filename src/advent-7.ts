import { readFile } from "./extract/file-reading";

type Bags = Record<string, Record<string, number>>;

export const count = async (filename: string): Promise<number> => {
  const result = await readFile(filename);
  const lines = result.toString().trim().split("\n");
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
