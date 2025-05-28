function add(a,b){
    return a+b;
}

function sub(a,b){
    return a-b;
}

function mul(a,b){
    return a*b;
}

function div(a,b){
    if(b === 0) {
        throw new Error("Division by zero is not allowed");
    }
    return a/b;
}

// Exporting the all function
module.exports ={add, sub, mul, div};