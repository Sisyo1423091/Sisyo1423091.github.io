//--------------------------------------------------
//Global変数
//--------------------------------------------------
//BlueJellyのインスタンス生成
var ble = new BlueJelly();
//--------------------------------------------------
//ロード時の処理
//--------------------------------------------------
window.onload = function () {
  //UUIDの設定
  ble.setUUID("UUID", "19b10000-e8f2-537e-4f6c-d104768a1214");  //BLEnano SimpleControl rx_uuid
}
//--------------------------------------------------
//Scan後の処理
//--------------------------------------------------
ble.onScan = function (deviceName) {
  document.getElementById('device_name').innerHTML = deviceName;
  document.getElementById('status').innerHTML = "found device!";
}
//--------------------------------------------------
//ConnectGATT後の処理
//--------------------------------------------------
ble.onConnectGATT = function (uuid) {
  console.log('> connected GATT!');
  document.getElementById('uuid_name').innerHTML = uuid;
  document.getElementById('status').innerHTML = "connected GATT!";
}
//-------------------------------------------------
//ボタンが押された時のイベント登録
//--------------------------------------------------
document.getElementById('scan').addEventListener('click', function() {
      ble.scan('UUID');
});
document.getElementById('connect').addEventListener('click', function(){
      ble.connectGATT('UUID');
});