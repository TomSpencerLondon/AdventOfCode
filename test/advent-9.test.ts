import { part1, part2 } from "../src/advent-9";

describe("Game", () => {
  it("should solve for the first example", async () => {
    const result = await part1("./test/data/day_9.txt");
    expect(result).toEqual(90433990);
  });

  it("should solve for the first example", async () => {
    const result = await part2("./test/data/day_9.txt");
    expect(result).toEqual(11691646);
  });
});
