let currentCalc = '0';
let display = document.querySelector('#calc-display')
let logElement = document.querySelector('#log')

function addToCalc(e){
    currentCalc = display.value + e.srcElement.innerHTML
    display.value = currentCalc
}

function addClickListen(className, clickFunc){
    elementList = document.getElementsByClassName(className)
    for (i=0; i < elementList.length; i++){
        elementList[i].addEventListener('click', clickFunc)
    }
}

addClickListen('number-button', addToCalc)
addClickListen('operator', addToCalc)


const calcSocket = new WebSocket(
    `ws://${window.location.host}/ws/calculations/`
);

calcSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    childCount = logElement.childElementCount
    if (childCount >= 10) {
        let extra = logElement.lastElementChild
        extra.remove()
    }
    var el = document.createElement("h5")
    el.innerHTML = data.calculation
    logElement.prepend(el)
}

document.querySelector('#enter').addEventListener('click', startCalculation)

function startCalculation(e){
    splitExpression(currentCalc)
    calcSocket.send(JSON.stringify(
        {
            'calculation': currentCalc
        }));
}

document.querySelector('#clearAll').onclick = function(e){
    display.value = currentCalc = '0'
}

document.querySelector('#clear').addEventListener('click', deleteLastChar)
function deleteLastChar(e) {
    lastChar = display.value.length - 1
    display.value = currentCalc = display.value.slice(0, lastChar)
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

document.onkeyup = function(e){
    if (!isNaN(e.key)) {
        display.value = currentCalc = display.value + e.key.toString()
    } else if (e.key=="+" || e.key=="-" || e.key=="×" || e.key=="÷" || e.key==".") {
        display.value = currentCalc = display.value + e.key.toString()
    } else if (e.key == "*") {
        currentCalc = display.value + "×"
        display.value = currentCalc
    } else if (e.key == "/") {
        currentCalc = display.value + "÷"
        display.value = currentCalc
    } else if ( e.key=='Enter' || e.key== "="){
        startCalculation()
    } else if (e.key == 'Backspace') {
        deleteLastChar()
    } else {
        console.log(e)
    }
}