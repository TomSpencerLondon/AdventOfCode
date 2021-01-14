import { part1, part2 } from "../src/advent-10";

describe("Game", () => {
  it("should solve for the first example", async () => {
    const result = await part1("./test/data/day_10.txt");
    expect(result).toEqual(2263);
  });

  it("should solve for the first example", async () => {
    const result = await part2("./test/data/day_10.txt");
    expect(result).toEqual(396857386627072);
  });
});
