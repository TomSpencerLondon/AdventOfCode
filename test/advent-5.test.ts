// FBFBBFFRLR
// 44 * 8 + 5 = 357

import { binaryConversion, part1, part2 } from "../src/advent-5";

describe("Binary Boarding Pass", () => {
  it.each([
    ["FFFFFLLL", 0],
    ["FFFFFLLR", 1],
    ["FFFFFLRL", 2],
    ["FFFFFRRR", 7],
    ["FFFFBLLL", 8],
    // ["BFFFBBFRRR", 567],
  ])("%s converts to %s", (ticket: string, expectedTicketNumber: number) => {
    const ticketNumber = binaryConversion(ticket);
    expect(ticketNumber).toEqual(expectedTicketNumber);
  });

  it("Turns a lit of tickets into a decimal number", async () => {
    const result = await part1("./test/data/day_5.txt");
    expect(result).toEqual(801);
  });

  it("finds the missing seat", async () => {
    const result = await part2("./test/data/day_5.txt");
    expect(result).toEqual(597);
  });
});
