import { currentAnswersForGroup, part1, part2 } from "../src/advent-6";

describe("Group answer counter", () => {
  it("returns correct count for group", () => {
    const result = currentAnswersForGroup("kaw\nakw");
    expect(result).toEqual(3);
  });
  it("returns the correct count of single answers for each group", async () => {
    const result = await part1("./test/data/day_6.txt");
    expect(result).toEqual(6633);
  });

  it("returns correct count for group", () => {
    const result = currentAnswersForGroup("kaw\nakw");
    expect(result).toEqual(3);
  });

  it("returns the correct count of everyone answers for each group", async () => {
    const result = await part2("./test/data/day_6.txt");
    expect(result).toEqual(3202);
  });
});
