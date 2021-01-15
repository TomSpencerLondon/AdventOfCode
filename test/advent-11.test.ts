import { part1, part2 } from "../src/advent-11";
// If a seat is empty (L) and there are no occupied seats
// adjacent to it, the seat becomes occupied.
// If a seat is occupied (#) and four or more seats
// adjacent to it are also occupied, the seat becomes empty.
// Otherwise, the seat's state does not change.

describe("Game", () => {
  it("should solve for the first example", async () => {
    const result = await part1("./test/data/day_11.txt");
    expect(result).toEqual(2334);
  });

  it("should solve for the second example", async () => {
    const result = await part2("./test/data/day_11.txt");
    expect(result).toEqual(2100);
  });
});
