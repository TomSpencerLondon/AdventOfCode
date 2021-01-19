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
//
// 1, 3, 5, 7, 10, 11, 14
// {
//   0: 1,
//   1: 1,
//   3: 2,
// }
