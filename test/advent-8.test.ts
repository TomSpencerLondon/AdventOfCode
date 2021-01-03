import { part1 } from "../src/advent-8";

describe("Gold shiny bags", () => {
  it("should solve for the first example", async () => {
    const result = await part1("./test/data/day_8.txt");
    expect(result).toEqual(2014);
  });
});
