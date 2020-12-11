import { Vector } from "./vector";

export const move = (vector: Vector, direction: string): Vector => {
  let x: number = vector.x;
  let y: number = vector.y;

  if (direction === "right") {
    x = (x + 3) % 31;
  } else if (direction === "down") {
    y += 1;
  }

  return { x, y };
};
