// import { promises as fs } from "fs";
// import { Vector } from "./vector/vector";

import { promises as fs } from "fs";

export const part1 = async (filename: string): Promise<number> => {
  const result = await readFile(filename);
  const passports = result.toString().split("\n\n");
  const strippedFields = passports.map((p) =>
    p
      .split(/\s/)
      .filter((p) => p)
      .map((p) => p.split(":")[0])
  );
  const expectedFields = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"];

  const number = strippedFields.reduce((acc, s) => {
    const every = +expectedFields.every((f) => {
      const includes = s.includes(f);
      return includes;
    });
    return acc + every;
  }, 0);

  return number;
};

export const part2 = async (filename: string): Promise<number> => {
  const file = await readFile(filename);
  const passports = file.toString().split("\n\n");
  const passportObjects = passports.map((p) => {
    const result = {};
    p.split(/\s/)
      .filter((p) => p)
      .forEach((p) => {
        const strings = p.split(":");
        result[strings[0]] = strings[1];
      });
    return result;
  });
  const expectedFields = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"];

  const number = passportObjects.reduce((acc, s) => {
    const every = +expectedFields.every((f) => {
      const includes = s[f].includes(f);
      return includes;
    });
    return acc + every;
  }, 0);

  return number;
};

const isValid = (passport: { [key: string]: string }): boolean => {
  const expectedFields = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"];

  const keys = Object.keys(passport);
  const included: boolean = expectedFields.every((f) => {
    const includes = keys.includes(f);
    return includes;
  });

  if (!included) {
    return false;
  }
  //
  // byr (Birth Year) - four digits; at least 1920 and at most 2002.
  // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  // hgt (Height) - a number followed by either cm or in:
  // endsWith() - javascript
  // If cm, the number must be at least 150 and at most 193.
  // startsWith() - javascript
  // If in, the number must be at least 59 and at most 76.
  // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  // includes() / sum()
  // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  // pid (Passport ID) - a nine-digit number, including leading zeroes.
  // cid (Country ID) - ignored, missing or not.

  if (passport["byr"].length !== 4) {
    return false;
  }

  if (+passport["byr"] < 1920 || +passport["byr"] > 2002) {
    return false;
  }

  throw Error("Unsupported");
};

async function readFile(filename: string) {
  const content: Promise<Buffer> = fs.readFile(filename);
  return content;
}
