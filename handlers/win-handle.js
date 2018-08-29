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




getExchange = () => {
    axios.get('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=GBP&to_currency=USD&apikey=WL1I2IGZAZKHBXBP')
        .then(res => {
            var data = res.data["Realtime Currency Exchange Rate"];
            console.log(data);

            var result = data["5. Exchange Rate"];

            var asNumber = result.toLocaleString('en');

            var roundedNum = precise_round(asNumber, 3);

            price.innerHTML = '$' + roundedNum;
            if (targetPrice.innerHTML != '' && targetPriceVal >= roundedNum) {
                const note = new Notification(notification.body, {
                    title: notification.title,
                    message: notification.body,
                    icon: "btc.png"
                });
            }
        })
};

precise_round = (num, dec) => {

    var num_sign = num >= 0 ? 1 : -1;

    return (Math.round((num * Math.pow(10, dec)) + (num_sign * 0.0001)) / Math.pow(10, dec)).toFixed(dec);
};

getExchange();
setInterval(getExchange, 30000);


ipc.on('targetPriceVal', function (event, arg) {
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = '$' + targetPriceVal.toLocaleString('en');
});