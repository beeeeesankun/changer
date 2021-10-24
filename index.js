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
