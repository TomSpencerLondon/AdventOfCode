import { count } from "../src/advent-7";

describe("Gold shiny bags", () => {
  it("should solve for the first example", async () => {
    const result = await count("day_7.txt");
    expect(result).toEqual(4);
  });
});
