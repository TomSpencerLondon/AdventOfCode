// FBFBBFFRLR
// 44 * 8 + 5 = 357

import { binaryConversion, part1 } from "../src/advent-5";

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

  xit("Turns a lit of tickets into a decimal number", () => {
    const result = part1("./test/data/day_5.txt");
    expect(result).toEqual(56);
  });
});
