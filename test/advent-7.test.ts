import { part1, part2 } from "../src/advent-7";

describe("Gold shiny bags", () => {
  it("should solve for the first example", async () => {
    const result = await part1("./test/data/day_7-example.txt");
    expect(result).toEqual(4);
  });

  it("should solve for the first challenge", async () => {
    const result = await part1("./test/data/day_7.txt");
    expect(result).toEqual(372);
  });

  it("should solve for the second challenge", async () => {
    const result = await part2("./test/data/day_7-example2.txt");
    expect(result).toEqual(126);
  });

  it("should solve for the second challenge", async () => {
    const result = await part2("./test/data/day_7.txt");
    expect(result).toEqual(8015);
  });
});
