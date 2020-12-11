import * as fs from "fs";
import { promisify } from "util";
import { Vector } from "./vector/vector";
import { move } from "./vector/move";

function isTree(vector: Vector, line: string[]): boolean {
  return line[vector.x % line.length] === "#";
}

export const countTrees = async (filename: string): Promise<number> => {
  const content: Promise<Buffer> = promisify(fs.readFile)(filename);
  const result = await content;

  const lines = result.toString().split("\n");
  let currentPosition: Vector = { x: 0, y: 0 };

  const mappedTrees: string[][] = [];

  lines.forEach((line) => {
    mappedTrees.push(line.split(""));
  });

  let numberOfTrees = 0;

  while (currentPosition.y < mappedTrees.length) {
    if (isTree(currentPosition, mappedTrees[currentPosition.y])) {
      numberOfTrees += 1;
    }

    currentPosition = move(currentPosition, { x: 3, y: 1 });
  }
  return numberOfTrees;
};
