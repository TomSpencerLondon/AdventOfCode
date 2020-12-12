import { promises as fs } from "fs";
import { Vector } from "./vector/vector";
import { move } from "./vector/move";

function isTree(vector: Vector, line: string[]): boolean {
  return line[vector.x % line.length] === "#";
}

export const part1 = async (filename: string): Promise<number> => {
  return countTrees(filename, { x: 3, y: 1 });
};

export const part2 = async (filename: string): Promise<number> => {
  const slopes = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ];

  const collisions: number[] = await Promise.all(
    slopes.map((slope) => countTrees(filename, slope))
  );

  return collisions.reduce((product, collisions) => product * collisions, 1);
};

export const countTrees = async (
  filename: string,
  slope: Vector
): Promise<number> => {
  const content: Promise<Buffer> = fs.readFile(filename);
  const result = await content;

  const lines = result.toString().split("\n");
  let currentPosition: Vector = { x: 0, y: 0 };

  const mappedTrees: string[][] = lines.map((line) => line.split(""));

  let numberOfTrees = 0;

  while (currentPosition.y < mappedTrees.length) {
    if (isTree(currentPosition, mappedTrees[currentPosition.y])) {
      numberOfTrees += 1;
    }

    currentPosition = move(currentPosition, slope);
  }
  return numberOfTrees;
};
