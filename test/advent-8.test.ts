import { part1, part2 } from "../src/advent-8";

describe("Game", () => {
  it("should solve for the first example", async () => {
    const result = await part1("./test/data/day_8.txt");
    expect(result).toEqual(2014);
  });

  it("should solve for the second example", async () => {
    const result = await part2("./test/data/day_8.txt");
    expect(result).toEqual(2251);
  });
});
