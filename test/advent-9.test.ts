import { part1 } from "../src/advent-9";

describe("Game", () => {
  it("should solve for the first example", async () => {
    const result = await part1("./test/data/day_8.txt");
    expect(result).toEqual(1);
  });
});
