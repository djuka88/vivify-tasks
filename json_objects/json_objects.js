const person = {
    firstName: "Pera",
    lastName: "Peric",
    age: 20
}

const personJson = `{
    "firstName": "Pera",
    "lastName": "Peric",
    "age":20
}`;

const fromJSONToJSObject = JSON.parse(personJson);
const fromJSObjectToJSON = JSON.stringify(person);

console.log(`\n`);
console.log(fromJSONToJSObject);
console.log(fromJSObjectToJSON);

///////////////////////////////////////////////////////

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const JSONnums = '[1,2,3,4,5,6,7,8,9]';

const toObject = JSON.parse(JSONnums);

console.log(`\n`);
toObject.forEach(element => {
    console.log(element);
});