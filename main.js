//基盤IDの設定
const UUID = '19b10000-e8f2-537e-4f6c-d104768a1214';
const SERVICE_UUID = '19b10001-e8f2-537e-4f6c-d104768a1214';

//受信データの格納
let g_characteristic = {};

var diceValue = 6;

//接続処理
const main = () => {
    return navigator.bluetooth.requestDevice({acceptAllDevices:true, optionalServices:[UUID]})
    .then(device => {
      console.log(device);
      console.log('> Name:             ' + device.name);
      console.log('> Id:               ' + device.id);
      console.log('> Connected:        ' + device.gatt.connected);
      console.log('--デバイスに接続中です...--');
      return device.gatt.connect();
    })
    .then(server => {
        console.log('Getting ___ Service...');
        return server.getPrimaryService(UUID);
    })
    .then(service => {
        console.log('Getting ____ Characteristic...');
        return service.getCharacteristic(SERVICE_UUID);
      })
    .then(characteristic => {
        g_characteristic = characteristic;
        return characteristic;
      })
    .catch(error => {
      console.log('Argh! ' + error);
    });
}

window.onload = function()
{
    instantiateButton();
    valueReception();
}

//ボタンの生成
function instantiateButton()
{
    var form = document.createElement('form');

    for(i = 1; i <= diceValue; i++)
    {
        form.innerHTML += ['<input type="radio" name="number" value="',i,'">',i,''].join('');
    }

    // //ラジオボタンの消去
    // document.getElementById('page2').removeChild('form');
    //ラジオボタンの再生成
    document.getElementById('page2').insertBefore(form, null);
}

//出目の最大値の設定
function setDiceValue() 
{
    num = window.prompt("出目の最大値を入力してください。", diceValue);
    if(!isNaN(num))
    {
        diceValue = num;
        instantiateButton();
        return;
    }
    alert("数値を入力してください。");
}

//値の受信
const valueReception = () => {
    g_characteristic.readValue()
    .then((val) => {
        let v = val.getUint8(0); //値読み取り
        
        document.getElementById('valDisplay').innerHTML = v;
    })

    requestAnimationFrame(valueReception());
}