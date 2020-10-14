let currentCalc = '0';
let display = document.querySelector('#calc-display')
let logElement = document.querySelector('#log')

let buttonList = document.getElementsByClassName('number-button')
for (i=0; i < buttonList.length; i++){
    buttonList[i].addEventListener('click', addToCalc)
}

let operatorList = document.getElementsByClassName('operator')
for (i=0; i < operatorList.length; i++){
    operatorList[i].addEventListener('click', addToCalc)
}


function addToCalc(e){
    currentCalc = display.value + e.srcElement.innerHTML
    display.value = currentCalc
    console.log(currentCalc)
}

const calcSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/calculations/'
);

calcSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    childCount = logElement.childElementCount
    if (childCount >= 10) {
        let extra = logElement.lastElementChild
        console.log(extra.innerHTML)
        extra.remove()
    }
    var el = document.createElement("h5")
    el.innerHTML = data.calculation
    logElement.prepend(el)
}

document.querySelector('#enter').onclick = function(e){
    splitExpression(currentCalc)
    calcSocket.send(JSON.stringify(
        {
            'calculation': currentCalc
        }));
}

document.querySelector('#clear').onclick = function(e){
    display.value = currentCalc = '0'
}

function splitExpression(input) {
    let result = ''
    for (let i = 0; i < input.length; i++) {
        switch (input[i]) {
            case "+":
                result = Calculate(Number(input.slice(0, i)), "+", Number(input.slice(i+1, input.length)))
                currentCalc = currentCalc + ' = '+ result.toString()
                display.value = result
                break;
            case "-":
                result = Calculate(Number(input.slice(0, i)), "-", Number(input.slice(i+1, input.length)))
                currentCalc = currentCalc + ' = '+ result.toString()
                display.value = result
                break;
            case "×":
                result = Calculate(Number(input.slice(0, i)), "×", Number(input.slice(i+1, input.length)))
                currentCalc = currentCalc + ' = '+ result.toString()
                display.value = result
                break;
            case "÷":
                result = Calculate(Number(input.slice(0, i)), "÷", Number(input.slice(i+1, input.length)))
                currentCalc = currentCalc + ' = '+ result.toString()
                display.value = result
                break;
            default:
                break;
        }
    }
}

function Calculate(firstNumber, operator, secondNumber) {
    switch (operator) {
        case "+":
            return firstNumber + secondNumber;
        case "-":
            return firstNumber - secondNumber;
        case "×":
            return firstNumber * secondNumber;
        case "÷":
            return firstNumber / secondNumber;
        default:
            break;
    }
}