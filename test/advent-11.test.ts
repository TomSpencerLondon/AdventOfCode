import { part1 } from "../src/advent-11";

describe("Game", () => {
  it("should solve for the first example", async () => {
    const result = await part1("./test/data/day_11.txt");
    expect(result).toEqual(2263);
  });
});
