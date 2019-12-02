const data = document
  .querySelector('span')
  .innerHTML.split(',')
  .map(str => Number(str));
console.log(data);

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
let dataCopy = data.map(el => el);
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
