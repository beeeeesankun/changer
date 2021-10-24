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

window.onload = function () {
  transform_half("half");
};

function calcChangeByInputs(total, pay) {
  const err = [];
  let result = {
    change: 0,
    totalOfCoins: 0,
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

  result.change = Math.abs(total - pay);
  let remainder = result.change;

  for (i = 0; i < result.coins.length; i++) {
    result.coins[i].numberOfCoins = Math.floor(remainder / result.coins[i].val);
    remainder = remainder % result.coins[i].val;
  }

  return result;
}

console.log(calcChangeByInputs(298, 1274));
