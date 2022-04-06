function longRunningTask(mseconds,name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Success! ${name}`)
        }, mseconds)
        if (mseconds > 5000)
            reject(`Error! ${name}`)
    })
}

longRunningTask(1000,"promise1")
    .then((message) => console.log(message))
    .catch((message) => console.log(message))


// all promises will be executed in correct order (order of call)
let promise1 = longRunningTask(2000,"promise2");
let promise2 = longRunningTask(1000,"promise3");
let promise3 = longRunningTask(3000,"promise4");

Promise.all([promise1, promise2, promise3])
    .then((results) => {
        results.forEach(result => {
            console.log(result);
        })
    })
    .catch((error) => { console.log(error) })

