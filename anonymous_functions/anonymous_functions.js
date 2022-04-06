console.log(`\n`);
console.log(`Squaring numbers:`);
console.log(`==================`);

let numbers = [1,2,3,4,5,6,7,8,9];

let squaredNumbers = numbers.map((number)=>{
    return number*number;
});

console.log(`Original array:`);
console.log(numbers);

console.log(`\n`);
console.log(`Squared array:`);
console.log(squaredNumbers);

/////////////////////////////////////////////////////

console.log(`\n`);
console.log(`IIFE function:`);
console.log(`==============`);

(()=>{
    let a=1;
    let b=2;

    console.log(`Sum: ${a}+${b}=${a+b}`);
})();

/////////////////////////////////////////////////////

console.log(`\n`);
console.log(`arrow function:`);
console.log(`==============`);

var multiplyByTwo = (number) => {
    return number*2;
}

console.log(multiplyByTwo(5));
console.log(`\n`);
