const $ = require('jquery');
const electron = require('electron');
const {remote} = require('electron');
const axios = require('axios');
const path = require('path');
const BrowserWindow = remote.BrowserWindow;
const notifyBtn = document.getElementById('notifyBtn');
const ipc = electron.ipcRenderer;

var price = document.querySelector('h1');
var targetPrice = document.getElementById('targetPrice');
var win = remote.getCurrentWindow();
var result;
var targetPriceVal;

const notification = {
    title: 'BTC Alert',
    body: 'BTC reached your target'
};

notifyBtn.addEventListener('click', function (event) {
    const modelPath = path.join('file://', __dirname, 'add.html');
    let win = new BrowserWindow({width: 400, height: 200, frame: false, transparent: true, alwaysOnTop: true});
    win.on('close', function () {
        win = null
    });
    win.loadURL(modelPath);
    win.show()
});

$('#minimize').click(function () {
    win.minimize();
});

$('#close').click(function () {
    win.close();
});


getBTC = () => {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then(res => {
            const cryptos = res.data.BTC.USD;
            price.innerHTML = '$' + cryptos.toLocaleString('en');
            if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
                const note = new Notification(notification.body, {
                    title: notification.title,
                    message: notification.body,
                    icon: "http://orig07.deviantart.net/d754/f/2011/132/e/4/google_chrome_icon_yellow_by_cameronsagey-d3g75gy.png"
                });
            }
        })
};
getBTC();
setInterval(getBTC, 10000);


ipc.on('targetPriceVal', function (event, arg) {
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = '$' + targetPriceVal.toLocaleString('en');
});