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
  const passportObjects = passports.map((passport) => {
    const result = {};
    passport.split(/\s/).forEach((field) => {
      const [key, value] = field.split(":");
      result[key] = value;
    });
    return result;
  });

  return passportObjects.map(isValid).filter((value) => value).length;
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

  if (!isValidHeight(passport)) {
    return false;
  }

  const regex = RegExp(/^#[0-9A-F]{6}$/i);
  if (!regex.test(passport["hcl"])) {
    return false;
  }

  if (!checker(passport["ecl"])) {
    return false;
  }

  if (!isValidPID(passport)) {
    return false;
  }

  return true;
};

const isValidPID = (passport: {}) => {
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

const checker = (value) =>
  ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].some((element) =>
    value.includes(element)
  );

const isValidHeight = (passport: {}): boolean => {
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
  return true;
};
