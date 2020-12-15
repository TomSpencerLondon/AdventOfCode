// import { promises as fs } from "fs";
// import { Vector } from "./vector/vector";

import { promises as fs } from "fs";

function hasAllFields(
  expectedFields: string[],
  actualFields: string[]
): boolean {
  return expectedFields.every((field) => actualFields.includes(field));
}

export const part1 = async (filename: string): Promise<number> => {
  const result = await readFile(filename);
  const passports = result.toString().split("\n\n");
  const strippedFields = passports.map((passport) =>
    passport.split(/\s/).map((field) => field.split(":")[0])
  );
  const expectedFields = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"];

  return strippedFields
    .map((fieldArray) => hasAllFields(expectedFields, fieldArray))
    .filter((value) => value).length;
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

  let number = 0;

  passportObjects.forEach((p) => {
    if (isValid(p)) {
      number++;
    }
  });

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

  if (
    passport["byr"].length !== 4 ||
    passport["iyr"].length !== 4 ||
    passport["eyr"].length !== 4
  ) {
    return false;
  }

  if (
    +passport["byr"] < 1920 ||
    +passport["byr"] > 2002 ||
    +passport["iyr"] < 2010 ||
    +passport["iyr"] > 2020 ||
    +passport["eyr"] < 2020 ||
    +passport["eyr"] > 2030
  ) {
    return false;
  }

  if (!passport["hgt"].endsWith("cm") && !passport["hgt"].endsWith("in")) {
    return false;
  }

  if (passport["hgt"].endsWith("cm")) {
    const number = parseInt(passport["hgt"].replace(/\D/g, ""));
    if (number < 150 || number > 193) {
      return false;
    }
  } else if (passport["hgt"].endsWith("in")) {
    const number = parseInt(passport["hgt"].replace(/\D/g, ""));

    if (number < 59 || number > 76) {
      return false;
    }
  }

  const regex = RegExp(/^#[0-9A-F]{6}$/i);
  if (!regex.test(passport["hcl"])) {
    return false;
  }

  const checker = (value) =>
    ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].some((element) =>
      value.includes(element)
    );

  if (!checker(passport["ecl"])) {
    return false;
  }

  const numberRegex = RegExp(/^\d+$/);
  if (!numberRegex.test(passport["pid"]) || passport["pid"].length !== 9) {
    return false;
  }
  return true;
};

async function readFile(filename: string) {
  const content: Promise<Buffer> = fs.readFile(filename);
  return content;
}
