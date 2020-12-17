export const binaryConversion = (ticket: string): number => {
  const column: string = ticket.slice(ticket.length - 3);

  const binaryColumn = column
    .split("")
    .map((letter) => {
      return letter === "L" ? "0" : "1";
    })
    .join("");

  return parseInt(binaryColumn, 2);
};
