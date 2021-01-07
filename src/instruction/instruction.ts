export interface Instruction {
  operation: "acc" | "jmp" | "nop";
  argument: number;
  index: number;
}
