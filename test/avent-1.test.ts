import { sum } from "../src/advent-1";

describe("day 1", () => {
  it("finds two numbers that sum to 2020 from list", async () => {
    const result = await sum("./test/data/day_1.csv");
    expect(result).toEqual(1007104);
  });
});
