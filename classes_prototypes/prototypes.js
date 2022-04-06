const GRID_SIZE_X = 10;
const GRID_SIZE_Y = 10;

// SETTING PROTOTYPE CHAIN

let Character = function (x, y) {

    // check who calls this function
    // cannot call directly
    if (Character.caller === null) {
        throw new Error(`Cannot create character directly`);
    }

    this.getCoordinates = function () {
        return [this.x, this.y];
    }

    this.setCoordinates = function (x, y) {
        if (x < 0) {
            throw new Error(`X cannot be negative`);
        }
        if (y < 0) {
            throw new Error(`Y cannot be negative`);
        }
        if (x > GRID_SIZE_X) {
            throw new Error(`X cannot be greater than ${GRID_SIZE_X}`);
        }
        if (y > GRID_SIZE_Y) {
            throw new Error(`Y cannot be greater than ${GRID_SIZE_Y}`);
        }

        this.x = x;
        this.y = y;
    }

    this.setCoordinates(x, y);
}



let PlayerCharacter = function (x, y) {

    // setting static variable to zero first time
    if (typeof PlayerCharacter.counter === 'undefined') {
        PlayerCharacter.counter = 0;
    }
    Character.call(this, x, y);
    Object.setPrototypeOf(this, Character.prototype);
    //this.__proto__=Character.prototype; // this line is the same as above

    PlayerCharacter.counter++;
    PlayerCharacter.numberOfInstances = function () {
        return PlayerCharacter.counter;
    }
}

let NonPlayerCharacter = function (x, y) {
    if (typeof NonPlayerCharacter.counter === 'undefined') {
        NonPlayerCharacter.counter = 0;
    }
    Character.call(this, x, y);
    Object.setPrototypeOf(this, Character.prototype);

    NonPlayerCharacter.counter++;
    NonPlayerCharacter.numberOfInstances = function () {
        return NonPlayerCharacter.counter;
    }
}

// PLACING CHARACTES ON GRID

const numberOfCharactersToGenerate = getRndInteger(1, GRID_SIZE_X * GRID_SIZE_Y);
let grid = [];
let usedCoords = {};

console.log(`Number of characters to generate is ${numberOfCharactersToGenerate}`);
for (let i = 0; i < numberOfCharactersToGenerate; i++) {
    let oneOrZero = getRndInteger(0, 1); //player or non player
    let randomX;
    let randomY;

    let xFound = false;
    let yFound = false;

    while (!xFound) {
        randomX = getRndInteger(0, GRID_SIZE_X - 1);

        if (!(randomX in usedCoords)) {
            xFound = true;
            usedCoords[randomX] = [];
            break;
        }

        if (usedCoords[randomX].length < GRID_SIZE_Y) {
            xFound = true;
            break;
        }
    }

    while (!yFound) {
        randomY = getRndInteger(0, GRID_SIZE_Y - 1);
        let yCoords = usedCoords[randomX];

        if (!yCoords.includes(randomY) && yCoords.length < GRID_SIZE_Y) {
            yFound = true;
            usedCoords[randomX].push(randomY);
            break;
        }
    }

    if (oneOrZero === 0) {
        grid[i] = new PlayerCharacter(randomX, randomY);
    }
    else {
        grid[i] = new NonPlayerCharacter(randomX, randomY);
    }
}

grid.forEach(character => {
    console.log(character.getCoordinates())
})


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// making sure that at least one type is created
let numberOfPlayerInstances = (typeof PlayerCharacter.numberOfInstances != 'undefined') ? PlayerCharacter.numberOfInstances() : 0;
let numberOfNonPlayerInstances = (typeof NonPlayerCharacter.numberOfInstances != 'undefined') ? NonPlayerCharacter.numberOfInstances() : 0;

console.log(`Number of PlayerCharacter generated is: ${numberOfPlayerInstances}`)
console.log(`Number of NonPlayerCharacter generated is: ${numberOfNonPlayerInstances}`)