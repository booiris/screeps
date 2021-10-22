a = 5
key = next => {
    next();
    console.log("123");
}

function temp() {
    console.log(a);
    if (a == 0)
        return;
    a = a - 1;
    temp(a - 1);
}

key(temp)