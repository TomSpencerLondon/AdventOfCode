import { part1, part2 } from "../src/advent-4";

describe("Day 4", () => {
  it("should validate passport details", async () => {
    const result = await part1("./test/data/day_4.txt");
    expect(result).toEqual(213);
  });

  it("should validate passport details", async () => {
    const result = await part2("./test/data/day_4.txt");
    expect(result).toEqual(147);
  });
});
