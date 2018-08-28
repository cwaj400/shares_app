const $ = require('jquery');
const electron = require('electron');
const path = require('path');
const remote = electron.remote;
const ipc = electron.ipcRenderer;

var window = remote.getCurrentWindow();

$('#closeBtn').click(function () {
    window.close();
});

const updateBtn = document.getElementById('updateBtn');

updateBtn.addEventListener('click', function () {
    ipc.send('update-notify-value', document.getElementById('notifyVal').value)
    var window = remote.getCurrentWindow();
    window.close();
});