import { Vector } from "./vector";

export const move = (...vectors: Vector[]): Vector => {
  let x = 0;
  let y = 0;
  vectors.forEach((v) => {
    x += v.x;
    y += v.y;
  });

  return { x, y };
};
