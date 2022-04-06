const colors = ['red','green','blue','black','gray','yellow','orange'];

console.log(`\n`);
console.log(`Printing array using for loop:`);
console.log(`==============================`);

var oneLineDisplay = ``;
for(let i=0;i<colors.length;i++){
    oneLineDisplay+=`${colors[i]},`;
}
oneLineDisplay=oneLineDisplay.slice(0,oneLineDisplay.length-1); // trim last comma
console.log(`${oneLineDisplay}\n`);

/////////////////////////////////////////////////////

console.log(`\n`);
console.log(`Printing array using forEach loop:`);
console.log(`==================================`);

oneLineDisplay=``;
colors.forEach((color)=>{
    oneLineDisplay+=`${color},`;
});
oneLineDisplay=oneLineDisplay.slice(0,oneLineDisplay.length-1); // trim last comma
console.log(`${oneLineDisplay}\n`);

/////////////////////////////////////////////////////

function rotateRight(array, steps){
    return array.slice(array.length-steps).concat(array.slice(0,array.length-steps));
}

let steps = 3;
let rotatedArray = rotateRight(colors,steps);

console.log(`\n`);
console.log(`Printing array rotated to right by ${steps} steps`);
console.log(`====================================================`);

console.log(rotatedArray);

/////////////////////////////////////////////////////

let numbers = [1,2,3,4,5,6,7,8,9];

console.log(`\n`);
console.log(`Reducing array of numbers`);
console.log(`====================================================`);

function reducer(array){
    return numbers.reduce((total,current)=>{
        return total+=current;
    },50);
}

let reducedArrayValue = reducer(numbers);
console.log(`Reduced array value is : ${reducedArrayValue}\n`);

/////////////////////////////////////////////////////

console.log(`\n`);
console.log(`Creating array of type [0,1,2,3,..n,n,n-1,n-2,..1,0]`);
console.log(`====================================================`);

function makeArray(limit){
    let array=[];
    for(let i=0;i<=limit;i++){
        array.push(i);
    }

    for(let i=limit-1;i>=0;i--){
        array.push(i);
    }

    return array;
}

console.log(makeArray(5));

/////////////////////////////////////////////////////

console.log(`\n`);
console.log(`Zoo Inventory`);
console.log(`====================================================`);

function zooInventory(zoo){
    let animals=[];
    zoo.forEach(animal => {
        let description=animal[0] + " the ";

        for(let i=0;i<animal[1].length;i++){
            if(i==0){
                description+=animal[1][0]+" is ";
                continue;
            }
            if(i==1){
                description+=animal[1][1];
            }
        }

        animals=[...animals,description];
    });

    return animals;
}

var myZoo = [
    ["King Kong", ["gorilla", 42]],
    ["Nemo", ["fish", 5]],
    ["Punxsutawney Phil", ["groundhog", 11]]
];

console.log(zooInventory(myZoo));
