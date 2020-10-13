
const calcSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/calculations/'
);

calcSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    document.querySelector('#log').value += (data.calculation + '\n');
}

document.querySelector('#submit').onclick = function(e) {
    const calcDOM = document.querySelector('#input');
    const calc = calcDOM.value;
    calcSocket.send(JSON.stringify({
        'calculation': calc
    }));
    calcDOM.value = '';
}