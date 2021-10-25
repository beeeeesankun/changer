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
  let err = {
    bool: false,
    mes: [],
  };
  let result = {
    bool: true,
    change: 0,
    totalOfCoins: [],
    coins: [
      {
        name: "10000円",
        val: 10000,
        numberOfCoins: 0,
      },
      {
        name: "5000円",
        val: 5000,
        numberOfCoins: 0,
      },
      {
        name: "1000円",
        val: 1000,
        numberOfCoins: 0,
      },
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

  if (total > pay) err.mes.push("支払額が足りません");
  if (!Number.isInteger(total) || !Number.isInteger(pay))
    err.mes.push("整数で入力してください");

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
  if (err.mes.length > 0) {
    return err;
  } else {
    return result;
  }
}

//htmlを生成
function createResult(obj) {
  //numberOfCoinsが０より大きいフィルター
  let filtered = obj.coins.filter((e) => {
    return e.numberOfCoins > 0;
  });
  //filteredのテキストの作成
  let coins = filtered.map((e) => {
    return "<li>" + e.name + ":<span>" + e.numberOfCoins + "枚</span></li>";
  });
  // coins = coins.join("");

  let text =
    "<div id='result-inner' class='result-inner'>" +
    "<h3>結果</h3>" +
    "<ul class='coins'>" +
    coins.join("") +
    "</ul>" +
    "<div><p>お釣り: <span>" +
    obj.change +
    "円</span></p>" +
    "<p>合計: <span>" +
    obj.totalOfCoins +
    "枚</span></p><div>" +
    "</div>";
  return text;
}

//htmlの挿入
function insert(html) {
  const parent = document.getElementById("result");
  parent.insertAdjacentHTML("afterbegin", html);
}

//既に挿入さてれているhtmlの削除
function removeAlreadyHtml() {
  const parent = document.getElementById("result");
  const inner = document.getElementById("result-inner");
  if (inner != null) {
    parent.removeChild(inner);
  }
}
//値が入っているか確認
function checkEmpty(tgt1, tgt2) {
  if (tgt1 == null || tgt2 == null || tgt1 == "" || tgt2 == "") {
    const mes = "金額を入力してください";
    return mes;
  } else {
    return true;
  }
}
//実行
window.onload = function () {
  transform_half("half");
  const btn = document.getElementById("btn");

  btn.addEventListener("click", () => {
    removeAlreadyHtml();
    const total = Number(document.getElementById("total").value);
    const pay = Number(document.getElementById("pay").value);
    const result = calcChangeByInputs(total, pay);
    const getResult = checkEmpty(total, pay);
    if (result.bool == true && getResult == true) {
      insert(createResult(result));
    } else {
      let pop = [];
      pop.push(result.mes);
      pop.push(getResult);
      //getResultがtrueを受け取った時に消す処理
      pop = pop.filter((e) => {
        if (e !== true) {
          return e;
        }
      });
      alert(pop);
    }
  });
};
