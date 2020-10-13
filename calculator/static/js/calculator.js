let currentCalc = '';

let buttonList = document.getElementsByClassName('number-button')
for (i=0; i < buttonList.length; i++){
    buttonList[i].addEventListener('click', addToCalc)
}

let operatorList = document.getElementsByClassName('operators')
for (i=0; i < operatorList.length; i++){
    operatorList[i].addEventListener('click', addToCalc)
}


function addToCalc(e){
    currentCalc = currentCalc + e.srcElement.innerHTML
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

document.querySelector('#submit').onclick = function(e) {
    const calcDOM = document.querySelector('#input');
    const calc = calcDOM.value;
    calcSocket.send(JSON.stringify({
        'calculation': calc
    }));
    calcDOM.value = '';
}