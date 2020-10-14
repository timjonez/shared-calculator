let currentCalc = '';
let display = document.querySelector('#calc-display')

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
    var el = document.createElement("h5")
    el.innerHTML = data.calculation
    document.querySelector('#log').appendChild(el)
}

document.querySelector('#enter').onclick = function(e){
    calcSocket.send(JSON.stringify(
        {
            'calculation': currentCalc
        }));
        currentCalc = '';
}