'use strict';

const UUID = '19b10000-e8f2-537e-4f6c-d104768a1214';
const SERVICE_UUID = '19b10001-e8f2-537e-4f6c-d104768a1214';
let   g_characteristic = {};
// const $light = document.querySelector('#light');
// const $bulb = document.querySelector('.bulb');

//接続後にon/off切り替え
const ledToggel = () => {
  g_characteristic.readValue()
  .then((val) => {
    let led_state = val.getUint8(0); //値読み取り
    led_state = led_state ? 0 : 1;
    g_characteristic.writeValue(new Uint8Array([led_state]));
    toggelClass(led_state);
  })
}

//サイコロの出目を表示
function valueDisplay()
{
  g_characteristic.readValue()
  .then((val) => {
    let led_state = val.getUint8(0); //値読み取り、形式変換
    document.getElementById('valueDisplay').textContent = led_state;
  })

  requestAnimationFrame(valueDisplay());
}

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
      $light.removeEventListener('click',main);
      $light.addEventListener('click',ledToggel);
      valueDisplay();
      return characteristic;
    })
  .catch(error => {
    console.log('Argh! ' + error);
  });
}

/**
 * domのclass付け替え(表示切り替え)
 */
// function toggelClass(led_state){
//   if(led_state){
//     addClass('#ff0000');
//   }else{
//     removeClass();
//   }
// }

// function removeClass(){
//     $bulb.style.background = '#bbb';
//     $bulb.style.boxShadow = '';
//     $bulb.classList.remove("light_up");
// }

// function addClass(color){
//     $bulb.style.background = color;
//     $bulb.style.boxShadow = `0 -10px 100px ${color}`;
//     $bulb.classList.add("light_up");
// }

document.getElementById('connect').addEventListener('click', main);