var display = document.getElementById('display');

const insert = (n) => {
    if (display.value == '0' && n != '.') {
        display.value = n;
    } else {
        display.value += n;
    }
};

const calculate = () => {
    try {
        display.value = eval(display.value);
    } catch (e) {
        if (e instanceof SyntaxError) {
            display.value = "Invalid Expression";
        }
    }
};

const increase = () => {
    display.value = display.value.slice(0, -1);
};

const squareroot = () => {
    const square = display.value*display.value
    display.value = square;
};

const clean = () => {
    display.value = '';
};