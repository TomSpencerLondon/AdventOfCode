import * as fs from "fs";
import { promisify } from "util";

describe("day 1", () => {
  it("finds two numbers that sum to 2020 from list", async () => {
    const content: Promise<Buffer> = promisify(fs.readFile)("./test/data/day_1.csv");
    const result = await content
    const string = result.toString();
    const numbers = string.split("\n");
    let sum: number = 2020;
    for (const n of numbers){
      const diff: number = sum - parseInt(n);
      for (let i = 0; i < numbers.length; i++){
        if (diff === parseInt(numbers[i])){
          console.log("this is diff: %s and number: %s", n, numbers[i]);
        }
      }
    }
  })
})
