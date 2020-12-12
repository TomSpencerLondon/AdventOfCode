import { Vector } from "./vector";

export const move = (...vectors: Vector[]): Vector => {
  const x = vectors.reduce((accX, vector) => accX + vector.x, 0);
  const y = vectors.reduce((accY, vector) => accY + vector.y, 0);

  return { x, y };
};
