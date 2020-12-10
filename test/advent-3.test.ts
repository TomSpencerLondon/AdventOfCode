import { countTrees } from "../src/advent-3";

describe("day 3", () => {
  it("counts trees encountered by toboggan", async () => {
    const result = await countTrees("./test/data/day_3.txt");
    expect(result).toEqual(454);
  });
});
