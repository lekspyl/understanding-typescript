function add(n1: number, n2: number) {
    return n1 + n2;
  }

function printResult(num: number) {
    console.log(`Result is: ${num}`)
}
function addAndHandle(n1: number, n2: number, cb: (arg1: number) => void) {
    const result = n1 + n2;
    cb(result);
}


printResult(add(5, 12))

let combineValues: (arg1: number, arg2: number) => number;

combineValues = add;
// combineValues = 5;
// combineValues = printResult;
console.log(combineValues(8, 8));
addAndHandle(10, 20, (result) => {
    console.log(result);
})
