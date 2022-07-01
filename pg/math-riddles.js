const operation = [
  { name: "sqrt", symbol: "√" },
  { name: "sqrt", symbol: "√" },
  { name: "sqrt", symbol: "√" },
];
const operators = [
  '+', '-', '*', '/', '%'
]
const random = (max) => {
  return Math.floor(Math.random() * max);
};

let a = random(20)
let b = random(20)
let firstOperator = operators[random(3)]

let tampung = {
  a: random(20),
  b: random(20),
  op: operators[random(3)]
}

console.log(JSON.stringify(tampung))