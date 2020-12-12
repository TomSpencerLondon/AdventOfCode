import { part1, part2 } from "../src/advent-3";

describe("day 3", () => {
  it("counts trees encountered by toboggan", async () => {
    const result = await part1("./test/data/day_3.txt");
    expect(result).toEqual(282);
  });

  it("counts trees encountered by toboggan", async () => {
    const result = await part2("./test/data/day_3.txt");
    expect(result).toEqual(958815792);
  });
});
