export const binaryConversion = (ticket: string): number => {
  if (ticket.endsWith("R")) {
    return 1;
  } else if (ticket.charAt(6) === "R") {
    return 2;
  }
  const column: string = ticket.slice(ticket.length - 3);

  const binaryColumn = column
    .split("")
    .map((letter) => {
      return letter === "L" ? "0" : "1";
    })
    .join("");

  return parseInt(binaryColumn, 2);
};
