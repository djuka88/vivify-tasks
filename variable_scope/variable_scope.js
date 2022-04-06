/*
    VAR keyword has a function scope and declarations get hoisted to the top of a function or document
    LET keyword has a block scope so variables are only visible inside a block of code (for example, loops)
*/

var outsideVar = "outsideVar";
let outsideLet = "outsideLet";

(()=>{

    var insideVar = "insideVar";
    let insideLet = "insideLet";

    // variable "i" is visible inside this anonymous function
    for(var i=0;i<10;i++){
        var insideLoopVar = "insideLoopVar";
    }
    console.log(i);
    console.log(insideLoopVar);


    // variable "j" is visible only inside this for loop
    for(let j=0;j<10;j++){
        let insideLoopLet = "insideLoopLet";
    }
    try{
        console.log(insideLoopLet);
    }
    catch(error){
        console.log("Error: Variable is outside scope");
    }

    // both variables are visible inside function because both are declared on top of file
    console.log(outsideVar);
    console.log(outsideLet);
})();


// both variables are not visible here because both are declared inside function
try{
    console.log(insideVar);
}
catch(error){
    console.log(`variable "insideVar" is not visible outside function`);
}

try{
    console.log(insideLet);
}
catch(error){
    console.log(`variable "insideLet" is not visible outside function`);
}