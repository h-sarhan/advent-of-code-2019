// Loading the data and converting it to an array of numbers
const data = document
  .querySelector('span')
  .innerHTML.split(',')
  .map(str => Number(str));

// Part 1
// Creating an instruction class
class Instruction {
  constructor(data, opcode, pos1, pos2, pos3) {
    this.data = data;
    this.opcode = opcode;
    this.pos1 = pos1;
    this.pos2 = pos2;
    this.pos3 = pos3;
  }

  run() {
    const operator = this.opcode;
    const operand1 = this.data[this.pos1];
    const operand2 = this.data[this.pos2];
    const resultPos = this.pos3;
    switch (operator) {
      case 1:
        this.data[resultPos] = operand1 + operand2;
        return this.data;
      case 2:
        this.data[resultPos] = operand1 * operand2;
        return this.data;
      default:
        return this.data;
    }
  }
}

// Running the program
let dataCopy = [...data];
dataCopy[1] = 12;
dataCopy[2] = 2;
for (let i = 0; i < dataCopy.length; i += 4) {
  let currInstruction = new Instruction(
    dataCopy,
    dataCopy[i],
    dataCopy[i + 1],
    dataCopy[i + 2],
    dataCopy[i + 3],
  );
  dataCopy = currInstruction.run();
}
console.log(dataCopy);
//  Part 2
const dataCopy2 = [...data];

class Program {
  constructor(data) {
    this.data = data;
    this.len = data.length;
  }

  getOutput(noun, verb) {
    this.data[1] = noun;
    this.data[2] = verb;
    for (let idx = 0; idx < this.len; idx += 4) {
      let currInstruction = new Instruction(
        this.data,
        this.data[idx],
        this.data[idx + 1],
        this.data[idx + 2],
        this.data[idx + 3],
      );
      this.data = currInstruction.run();
    }
    return this.data[0];
  }
  reset() {
    this.data = document
      .querySelector('span')
      .innerHTML.split(',')
      .map(str => Number(str));
  }
}

function findInputs(program) {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      let output = program.getOutput(noun, verb);
      program.reset();
      if (output === 19690720) {
        return [noun, verb];
      }
    }
  }
}
const prog = new Program(dataCopy2);

const inputs = findInputs(prog);

console.log(100 * inputs[0] + inputs[1]);
