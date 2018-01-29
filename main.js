var diceValue = 6;

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