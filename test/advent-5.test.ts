// FBFBBFFRLR
// 44 * 8 + 5 = 357

import { binaryConversion } from "../src/binary-conversion";

describe("Binary Boarding Pass", () => {
  it.each([
    ["FFFFFLLL", 0],
    ["FFFFFLLR", 1],
    ["FFFFFLRL", 2],
  ])("%s converts to %s", (ticket: string, expectedTicketNumber: number) => {
    const ticketNumber = binaryConversion(ticket);
    expect(ticketNumber).toEqual(expectedTicketNumber);
  });
});
