//フォーカスが外れた時に数字を半角に変換。
function transform_half(targetClass) {
  const targets = Array.from(document.getElementsByClassName(targetClass));
  function transformFullToHalf(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
  }

  targets.forEach((tgt) => {
    tgt.addEventListener("blur", (event) => {
      const val = tgt.value;
      tgt.value = transformFullToHalf(val);
      if (isNaN(tgt.value)) {
        tgt.value = "数字を入力してください";
      }
    });
  });
}

//下記がメインロジック
function calcChangeByInputs(total, pay) {
  const err = [];
  let result = {
    change: 0,
    totalOfCoins: [],
    coins: [
      {
        name: "500円",
        val: 500,
        numberOfCoins: 0,
      },
      {
        name: "100円",
        val: 100,
        numberOfCoins: 0,
      },
      {
        name: "50円",
        val: 50,
        numberOfCoins: 0,
      },
      {
        name: "10円",
        val: 10,
        numberOfCoins: 0,
      },
      {
        name: "5円",
        val: 5,
        numberOfCoins: 0,
      },
      {
        name: "1円",
        val: 1,
        numberOfCoins: 0,
      },
    ],
  };

  if (total > pay) err.push("支払額が足りません");
  //整数で入力してください

  //絶対値で取得
  result.change = Math.abs(total - pay);

  //ループの準備
  let remainder = result.change;
  for (i = 0; i < result.coins.length; i++) {
    //各valで割る。整数値のみnumberOfCoinsに格納
    result.coins[i].numberOfCoins = Math.floor(remainder / result.coins[i].val);
    //後で合計枚数を出す為に各numberOfCoinsをtotalOfCoinsへpush
    result.totalOfCoins.push(result.coins[i].numberOfCoins);
    //あまりを自己代入。次のループへ
    remainder = remainder % result.coins[i].val;
  }
  //合計枚数を出す
  result.totalOfCoins = result.totalOfCoins.reduce((a, b) => a + b, 0);

  return result;
}

//htmlを生成
function createResult(obj) {
  //numberOfCoinsが０より大きいフィルター
  let filtered = obj.coins.filter((e) => {
    return e.numberOfCoins > 0;
  });
  //filteredのテキストの作成
  const coins = filtered.map((e) => {
    return "<p>" + e.name + ": <span>" + e.numberOfCoins + "枚</span>";
  });

  let text =
    "<h3>結果</h3>" +
    "<p>お釣り: <span>" +
    obj.change +
    "円</span>" +
    "<div class='coins'>" +
    coins +
    "</p></div>" +
    "<p>合計: <span>" +
    obj.totalOfCoins +
    "枚</span></p>";

  return text;
}

//htmlの挿入
function insert(html) {
  const parent = document.getElementById("result");
  parent.insertAdjacentHTML("afterbegin", html);
}

console.log(calcChangeByInputs(298, 670));

//実行
window.onload = function () {
  transform_half("half");
  const btn = document.getElementById("btn");

  btn.addEventListener("click", () => {
    const total = document.getElementById("total").value;
    const pay = document.getElementById("pay").value;

    console.log(total);
    console.log(pay);
  });
  // insert(createResult(calcChangeByInputs(298, 670)));
};
