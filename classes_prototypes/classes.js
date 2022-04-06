const GRID_SIZE_X = 10;
const GRID_SIZE_Y = 10;

class Character {

    constructor(x, y) {

        // peventing creation of "abstract class"
        if (new.target === Character) {
            throw new Error(`Cannot create character directly`)
        }

        this.setCoordinates(x, y);
    }

    get coordinates() {
        return [this.x, this.y]
    }

    set setX(x){
        this.x=x;
    }

    set setY(y){
        this.y=y;
    }

    setCoordinates(x, y) {
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

        this.setX=x;
        this.setY=y;
    }
}

class PlayerCharacter extends Character {

    static counter = 0;

    constructor(x, y) {
        super(x, y);
        PlayerCharacter.counter++;
    }

    static numberOfInstances() {
        return PlayerCharacter.counter;
    }
}

class NonPlayerCharacter extends Character {
    static counter = 0;
    constructor(x, y) {
        super(x, y);
        NonPlayerCharacter.counter++;
    }

    static numberOfInstances() {
        return NonPlayerCharacter.counter;
    }
}

const numberOfCharactersToGenerate = getRndInteger(1, GRID_SIZE_X * GRID_SIZE_Y);
let grid = [];
let usedCoords = {};

console.log(`Number of characters to generate is ${numberOfCharactersToGenerate}`);
for (let i = 0; i < numberOfCharactersToGenerate; i++) {
    let oneOrZero = getRndInteger(0, 1); // player or nonplayer
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
    console.log(character.coordinates)
})


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// making sure that at least one type is created
let numberOfPlayerInstances = (typeof PlayerCharacter.numberOfInstances != 'undefined') ? PlayerCharacter.numberOfInstances() : 0;
let numberOfNonPlayerInstances = (typeof NonPlayerCharacter.numberOfInstances != 'undefined') ? NonPlayerCharacter.numberOfInstances() : 0;

console.log(`Number of PlayerCharacter generated is: ${numberOfPlayerInstances}`)
console.log(`Number of NonPlayerCharacter generated is: ${numberOfNonPlayerInstances}`)