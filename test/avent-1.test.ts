import {findThreeNumbers, findTwoNumbers} from "../src/advent-1";

describe("day 1", () => {
  it("finds two numbers that sum to 2020 from list", async () => {
    const result = await findTwoNumbers("./test/data/day_1.csv");
    expect(result).toEqual(1007104);
  });
});

describe("day 2", () => {
  it("finds three numbers that sum to 2020 from list", async () => {
    const result = await findThreeNumbers("./test/data/day_1.csv");
    expect(result).toEqual(18847752);
  });
});
