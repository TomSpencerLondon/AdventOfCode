import * as fs from "fs";
import { promisify } from "util";
import { Vector } from "./vector/vector";
import { move } from "./vector/move";

function isTree(vector: Vector, line: string[]): boolean {
  return line[vector.x] === "#";
}

export const countTrees = async (filename: string): Promise<number> => {
  const content: Promise<Buffer> = promisify(fs.readFile)(filename);
  const result = await content;

  const lines = result.toString().split("\n");
  let vector: Vector = { x: 0, y: 0 };

  const mappedTrees: string[][] = [];

  lines.forEach((line) => {
    mappedTrees.push(line.split(""));
  });

  let numberOfTrees = 0;

  while (vector.y <= 10) {
    vector = move(vector, "right");
    if (isTree(vector, mappedTrees[vector.y])) {
      numberOfTrees += 1;
    }
    vector = move(vector, "down");
  }
  return numberOfTrees;
};
