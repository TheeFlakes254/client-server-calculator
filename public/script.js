const socket = io();
const resultDiv = document.getElementById('result');
const connectionStatus = document.getElementById('connection-status');

// Connection status handling
socket.on('connect', () => {
    connectionStatus.textContent = 'Connected';
    connectionStatus.classList.add('connected');
});

socket.on('disconnect', () => {
    connectionStatus.textContent = 'Disconnected';
    connectionStatus.classList.add('disconnected');
    connectionStatus.classList.remove('connected');
});

// Calculate function
function calculate(operation) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);

    if (isNaN(num1) || isNaN(num2)) {
        resultDiv.textContent = 'Please enter valid numbers';
        return;
    }

    socket.emit('calculate', { num1, num2, operation });
}

// Handle result from server
socket.on('result', (data) => {
    resultDiv.textContent = typeof data.result === 'number' 
        ? data.result.toFixed(2) 
        : data.result;
});