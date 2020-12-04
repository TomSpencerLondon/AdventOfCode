import { countOnePositionPasswords, countPasswords } from "../src/advent-2";

describe("day 2", () => {
  it("counts valid passwords in list from numbers on left and letter", async () => {
    const result = await countPasswords("./test/data/day_2.txt");
    expect(result).toEqual(572);
  });

  it("counts valid single character occurrence password criteria from numbers on left and letter", async () => {
    const result = await countOnePositionPasswords("./test/data/day_2.txt");
    expect(result).toEqual(454);
  });
});
