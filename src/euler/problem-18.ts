export const solve = (input: string): number => {
  const rows: string[] = input.split("\n");
  const splitRows: string[][] = rows.map((row) => row.split(" "));
  const rowsInNumbers: number[][] = splitRows.map((row) =>
    row.map((s) => parseInt(s, 10))
  );

  const possibleSolutions = Math.pow(2, rowsInNumbers.length - 1);
  let largestSum = 0;
  let tempSum, index;
  for (let i = 0; i <= possibleSolutions; i++) {
    tempSum = rowsInNumbers[0][0];
    index = 0;
    for (let j = 0; j < rowsInNumbers.length - 1; j++) {
      index = index + ((i >> j) & 1);
      tempSum += rowsInNumbers[j + 1][index];
    }
    if (tempSum > largestSum) {
      largestSum = tempSum;
    }
  }
  return largestSum;
};
