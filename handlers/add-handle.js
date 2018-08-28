const $ = require('jquery');
const {remote} = require('electron');
const path = require('path');

var window = remote.getCurrentWindow();

$('#closeBtn').click(function () {
    window.close();
});