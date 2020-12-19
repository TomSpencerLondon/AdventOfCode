import { promises as fs } from "fs";

export async function readFile(filename: string) {
  const content: Promise<Buffer> = fs.readFile(filename);
  return content;
}
