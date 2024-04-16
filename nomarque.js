var globalSellingRuleValue; // Global değişkeni tanımla

function renderRules2(data) {
  // Hata Kontrolü
  if (!data) {
    console.error("Hata: Veri yok!");
    return;
  }

  // Kuralların Alınması
  const rules = getRules();
  if (!rules) {
    console.error("Hata: Kurallar alınamadı!");
    return;
  }

  // Döviz Türlerine Göre İşleme
  for (const rule of rules.data) {
    const {
      currencytitle,
      ruleStep: currencyRuleCurrencyStep,
      ruleCode: currencyRuleCode,
      rate,
      rulefk,
      step,
      order: ruleOrder,
      type,
      value,
      carpanintypefk,
      carpaninvalue,
      carpaninbeforevalue,
      carpaninoran,
      carpanincurrencyfk,
      rulePercentage,
      rulebuymore,
      rulesellmore,
      rulebuyRuleFK,
      ruleBuyRate,
      ruleBuyTypeFK,
      beforevalue,

      aliscarpanincurrencyfk,
      aliscarpanintypefk,
      aliscarpanintype,
      aliscarpaninvalue,
      aliscarpaninbeforevalue,
    } = rule.map;

    if (currencytitle.includes("EUR") || currencytitle.includes("Eur")) {
      getRulesEurHarem(rule, data);
    } else if (currencytitle.includes("USD") || currencytitle.includes("Usd")) {
      getRulesDolarHarem(rule, data);
    } else {
      updateCurrencyMarqueeHarem(data, rules);
    }

    // Satış Değerleri
    if (type === "1") {
      // Oto
      otoForex(rule, data);

      // Alış Kuralları
      if (aliscarpanintypefk !== "") {
        const currencya = data["ALTIN"];
        if (currencya && currencya.code === "ALTIN") {
          currencya.code = "HAS";
        }

        if (currencya && currencya.code === "HAS") {
          const sellingRuleValue = parseFloat(currencya.satis) * ruleBuyRate;
          const steppedValue = getSteppedValue(sellingRuleValue, step);
          globalSellingRuleValue = steppedValue;

          if (globalSellingRuleValue) {
            alisUpdateTableAndIcon(
              currencytitle,
              globalSellingRuleValue,
              rulebuymore,
              ruleOrder
            );
          }
        }
      }
    } else if (type === "2") {
      // Sabit
      sabitCarpan(rule);
    } else {
      // Carpan Tipine Göre İşleme
      if (carpanintypefk === "1") {
        // Has ile Çarpılanlar
        handleTypeOne(
          currencyRuleCode,
          currencyRuleCurrencyStep,
          rate,
          step,
          ruleOrder,
          currencytitle,
          rulesellmore,
          data,
          rulebuymore,
          ruleBuyRate
        );

        // if (aliscarpanintypefk !== "") {
        //   alisHandleTypeOne(
        //     ruleBuyRate,
        //     currencyRuleCode,
        //     currencyRuleCurrencyStep,
        //     step,
        //     ruleOrder,
        //     currencytitle,
        //     rulebuymore,
        //     data
        //   );
        // }
      } else if (carpanintypefk === "2") {
        handleTypeTwo(
          currencyRuleCurrencyStep,
          rate,
          step,
          currencytitle,
          carpaninvalue,
          carpaninbeforevalue
        );
      } else {
        handleTypeThree(
          rule,
          currencyRuleCurrencyStep,
          rate,
          step,
          currencytitle,
          carpaninvalue,
          carpaninbeforevalue,
          rulefk,
          carpanincurrencyfk,
          carpaninoran
        );
      }
    }
  }
}

// Yardımcı Fonksiyonlar

function getRules() {
  // API'den veya veri kaynağından kuralları alın
  // Hata kontrolünü ve veri işlemeyi burada yapın
  return JSON.parse(result1);
}
function getRulesEurHarem(rule, data) {
  let rate = rule.map.rate;
  let buyRate = rule.map.ruleBuyRate;
  for (var anahtar in data) {
    var eur = data[anahtar];

    if (eur.code === "USD") {
      console.log(eur);
    }

    if (eur.code === "EUR") {
      let eurSatis = eur.satis;
      let eurAlis = eur.alis;
      $("#eurbuy").html(
        new Intl.NumberFormat("de-DE").format(eurAlis * buyRate)
      );
      $("#eursell").html(
        new Intl.NumberFormat("de-DE").format(eurSatis * rate)
      );
    }
  }
}
function getRulesDolarHarem(rule, data) {
  let rate = rule.map.rate;
  let buyRate = rule.map.ruleBuyRate;
  for (var anahtar in data) {
    var eur = data[anahtar];

    if (eur.code === "USD") {
      let eurSatis = eur.satis;
      let eurAlis = eur.alis;
      $("#usdbuy").html(
        new Intl.NumberFormat("de-DE").format(eurAlis * buyRate)
      );
      $("#usdsell").html(
        new Intl.NumberFormat("de-DE").format(eurSatis * rate)
      );
    }
  }
}

// function alisHandleTypeOne(
//   ruleBuyRate,
//   currencyRuleCode,
//   currencyRuleCurrencyStep,
//   step,
//   ruleOrder,
//   currencytitle,
//   rulebuymore,
//   data
// ) {
//   for (const currencyCodea in data) {
//     if (Object.hasOwnProperty.call(data, currencyCodea)) {
//       const currencya = data[currencyCodea];
//       if (currencya.code === "ALTIN") {
//         currencya.code = "HAS";
//       }
//       if (currencya.code == currencyRuleCode) {
//         var sellingRuleValue = parseFloat(currencya.satis);
//         sellingRuleValue = getSteppedValue(
//           sellingRuleValue,
//           currencyRuleCurrencyStep
//         );
//         sellingRuleValue = sellingRuleValue * ruleBuyRate;
//         sellingRuleValue = getSteppedValue(sellingRuleValue, step);
//         globalSellingRuleValue = sellingRuleValue;
//         if (globalSellingRuleValue != undefined) {
//           //alisUpdateTableAndIcon(currencytitle, globalSellingRuleValue, ruleOrder);
//           alisUpdateTableAndIcon(
//             currencytitle,
//             globalSellingRuleValue,
//             rulebuymore,
//             ruleOrder
//           );
//         }
//       }
//     }
//     break;
//   }
// }
// function alisHandleTypeOne(
//   ruleBuyRate,
//   currencyRuleCode,
//   currencyRuleCurrencyStep,
//   step,
//   ruleOrder,
//   currencytitle,
//   rulebuymore,
//   data,
//   rate,
//   rulesellmore,
// ) {
//   for (const currencyCodea in data) {
//     if (Object.hasOwnProperty.call(data, currencyCodea)) {
//       const currencya = data[currencyCodea];
//       if (currencya.code === "ALTIN") {
//         currencya.code = "HAS";
//       }
//       if (currencya.code == currencyRuleCode) {
//         var sellingRuleValue = parseFloat(currencya.satis);
//         sellingRuleValue = getSteppedValue(
//           sellingRuleValue,
//           currencyRuleCurrencyStep
//         );
//         sellingRuleValue = sellingRuleValue * ruleBuyRate;
//         sellingRuleValue = getSteppedValue(sellingRuleValue, step);
//         globalSellingRuleValue = sellingRuleValue;
//         if (globalSellingRuleValue != undefined) {
//           //alisUpdateTableAndIcon(currencytitle, globalSellingRuleValue, ruleOrder);
//           alisUpdateTableAndIcon(
//             currencytitle,
//             globalSellingRuleValue,
//             rulebuymore,
//             ruleOrder
//           );
//         }
//       }else if(currencyRuleCode.includes("HASA")){

//         if (currencya.code == "HAS") {
          
//           var sellingRuleValue = parseFloat(currencya.alis);
//           sellingRuleValue = getSteppedValue(
//             sellingRuleValue,
//             currencyRuleCurrencyStep
//           );
//           var satisicin = parseFloat(currencya.satis);
//           satisicin =  getSteppedValue(
//             satisicin,
//             currencyRuleCurrencyStep
//           );
//           satisicin = satisicin * rate;
//           satisicin = getSteppedValue(satisicin, step)

  
//           sellingRuleValue = sellingRuleValue * rate;
//           sellingRuleValue = getSteppedValue(sellingRuleValue, step);
//           globalSellingRuleValue = sellingRuleValue;
//           if (globalSellingRuleValue != undefined) {
//             alisUpdateTableAndIcon(
//               currencytitle,
//               globalSellingRuleValue,
//               rulebuymore,
//               ruleOrder
//             );
//             updateTableAndIcon(
//               currencytitle,
//               satisicin,
//               ruleOrder,
//               rulesellmore
//             );
//           }
//         }

//       }
//     }
//     break;
//   }
// }
function handleTypeOne(
  currencyRuleCode,
  currencyRuleCurrencyStep,
  rate,
  step,
  ruleOrder,
  currencytitle,
  rulesellmore,
  data,
  rulebuymore,
  ruleBuyRate
) {
  for (const currencyCodea in data) {
    if (Object.hasOwnProperty.call(data, currencyCodea)) {
      const currencya = data[currencyCodea];

      // Debug amaçlı
      //console.log("currencyRuleCode:", currencyRuleCode);
      //console.log("currencya.code:", currencya.code);

      if (currencya.code === "ALTIN") {
        currencya.code = "HAS";
      }


      if (currencya.code == currencyRuleCode) {
        var sellingRuleValue = parseFloat(currencya.satis);
        sellingRuleValue = getSteppedValue(
          sellingRuleValue,
          currencyRuleCurrencyStep
        );

        sellingRuleValue = sellingRuleValue * rate;
        sellingRuleValue = getSteppedValue(sellingRuleValue, step);
        globalSellingRuleValue = sellingRuleValue;
        if (globalSellingRuleValue != undefined) {
          updateTableAndIcon(
            currencytitle,
            sellingRuleValue,
            ruleOrder,
            rulesellmore
          );
        }
      }else if(currencyRuleCode.includes("HASA")){

        if (currencya.code == "HAS") {
          
          var sellingRuleValue = parseFloat(currencya.alis);
          sellingRuleValue = getSteppedValue(
            sellingRuleValue,
            currencyRuleCurrencyStep
          );
          var satisicin = parseFloat(currencya.satis);
          satisicin =  getSteppedValue(
            satisicin,
            currencyRuleCurrencyStep
          );
          satisicin = satisicin * rate;
          satisicin = getSteppedValue(satisicin, step)

  
          sellingRuleValue = sellingRuleValue * ruleBuyRate;
          sellingRuleValue = getSteppedValue(sellingRuleValue, step);
          globalSellingRuleValue = sellingRuleValue;
          if (globalSellingRuleValue != undefined) {
            alisUpdateTableAndIcon(
              currencytitle,
              globalSellingRuleValue,
              rulebuymore,
              ruleOrder
            );
            updateTableAndIcon(
              currencytitle,
              satisicin,
              ruleOrder,
              rulesellmore
            );
          }
        }

      }
    }
    break; // Döngüyü kaldırın veya ihtiyaca bağlı olarak yerine ekleyin.
  }
}

function handleTypeTwo(
  currencyRuleCurrencyStep,
  rate,
  step,
  currencytitle,
  carpaninvalue,
  carpaninbeforevalue
) {
  var sellingRuleValue = carpaninvalue;
  sellingRuleValue = getSteppedValue(
    sellingRuleValue,
    currencyRuleCurrencyStep
  );
  sellingRuleValue = sellingRuleValue * rate;
  sellingRuleValue = getSteppedValue(sellingRuleValue, step);
  $("#" + currencytitle).html(
    new Intl.NumberFormat("de-DE").format(sellingRuleValue)
  );
  if (carpaninbeforevalue != undefined) {
    sabitcarpanlıIcon(
      currencytitle,
      carpaninvalue,
      carpaninbeforevalue,
      sellingRuleValue
    );
  }
}

function handleTypeThree(
  rule,
  currencyRuleCurrencyStep,
  rate,
  step,
  currencytitle,
  carpaninvalue,
  carpaninbeforevalue,
  rulefk,
  carpanincurrencyfk,
  carpaninoran
) {
  if (rulefk != carpanincurrencyfk) {
    //katSayi(rule);
    var carpansimdikivalue = carpaninvalue * carpaninoran;
    var sellingRuleValue = carpaninvalue;
    sellingRuleValue = getSteppedValue(
      sellingRuleValue,
      currencyRuleCurrencyStep
    );
    sellingRuleValue = sellingRuleValue * rate;
    sellingRuleValue = getSteppedValue(sellingRuleValue, step);
    $("#" + currencytitle).html(
      new Intl.NumberFormat("de-DE").format(carpaninvalue * rate)
    );
    sabitcarpanlıIcon(
      currencytitle,
      carpaninvalue,
      carpaninbeforevalue,
      sellingRuleValue
    );
  } else {
    $("#" + currencytitle).html(
      new Intl.NumberFormat("de-DE").format(carpaninvalue)
    );
    katsayıCarpanlıIcon(currencytitle, carpaninvalue, carpaninbeforevalue);
  }
}

function updateTableAndIcon(
  currencytitle,
  sellingRuleValue,
  ruleOrder,
  rulesellmore
) {
  var element = $('tr[data-order="' + ruleOrder + '"]');
  if (element.length > 0) {
    //console.log(rulesellmore)
    if (rulesellmore != undefined && rulesellmore != 0) {
      sellingRuleValue = sellingRuleValue + rulesellmore;
    }
    var formattedNumber = formatNumber(
      new Intl.NumberFormat("de-DE").format(sellingRuleValue)
    );

    element.find(".table_currency_title").html(currencytitle);
    element.find(".table_currency_satis").html(formattedNumber + " ");
  }
  prepareIcon(currencytitle, sellingRuleValue, ruleOrder);
}

function alisUpdateTableAndIcon(
  currencytitle,
  sellingRuleValue,
  rulebuymore,
  ruleOrder
) {
  var element = $('tr[data-order="' + ruleOrder + '"]');
  if (element.length > 0) {
    if (rulebuymore != undefined && rulebuymore != 0) {
      sellingRuleValue = sellingRuleValue + rulebuymore;
    }
    var formattedNumber = formatNumber(
      new Intl.NumberFormat("de-DE").format(sellingRuleValue)
    );
    element.find(".table_currency_alis").html(formattedNumber + " ");
  }
  prepareIconAlis(currencytitle, sellingRuleValue, ruleOrder);
}

function otoForex(rule, data) {
  const { currencytitle, step, order, rulePercentage } = rule.map;
  for (const currencyCode in data) {
    const currency = data[currencyCode];

    if (currency.code !== currencytitle) continue;

    let sellingRuleValue = getSteppedValue(parseFloat(currency.satis), step);
    if (rulePercentage) {
      sellingRuleValue += sellingRuleValue * (rulePercentage / 100);
    }
    const formattedValue = new Intl.NumberFormat("de-DE").format(
      sellingRuleValue
    );
    const element = $(`tr[data-order="${order}"]`);
    if (element.length > 0) {
      element.find(".table_currency_title").html(currencytitle);
      element.find(".table_currency_satis").html(`${formattedValue} `);
    }
    prepareIcon(currencytitle, sellingRuleValue, order);
    break;
  }
}

function sabitCarpan(rule) {
  const { currencytitle, order, value, beforevalue } = rule.map;
  const element = $(`tr[data-order="${order}"]`);
  if (element.length > 0) {
    element.find(".table_currency_title").html(currencytitle);
    element
      .find(".table_currency_satis")
      .html(`${new Intl.NumberFormat("de-DE").format(value)} `);
  }
  logPrepareIcon(currencytitle, value, beforevalue, order);
}

//
function prepareMarqueeHas(rules, data) {
  var tempSlipyCur = "";
  for (const currencyCodea in data) {
    if (Object.hasOwnProperty.call(data, currencyCodea)) {
      const currencya = data[currencyCodea];
      if (currencya.code.includes("EURT") || currencya.code.includes("USDT")) {
        currencya.code = currencya.code.replace("TRY", "");

        $("#" + currencya.code.toLowerCase() + "sell").html(currencya.satis);
        $("#" + currencya.code.toLowerCase() + "buy").html(currencya.alis);
      }
    }
  }
}

function updateCurrencyMarqueeHarem(data) {
  for (const currencyCodea in data) {
    if (Object.hasOwnProperty.call(data, currencyCodea)) {
      try {
        const currencya = data[currencyCodea];
        if (
          currencya.code.includes("EURT") ||
          currencya.code.includes("USDT")
        ) {
          currencya.code = currencya.code.replace("TRY", "");
          $("#" + currencya.code.toLowerCase() + "sell").html(currencya.satis);
          $("#" + currencya.code.toLowerCase() + "buy").html(currencya.alis);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
function formatNumber(sellingRuleValue) {
  var numberString = sellingRuleValue.toString();
  var decimalIndex = numberString.indexOf(".") + 1;
  if (decimalIndex > 0) {
    var secondDecimalIndex = numberString.indexOf(".", decimalIndex);
    if (secondDecimalIndex > 0) {
      numberString =
        numberString.slice(0, secondDecimalIndex) +
        "," +
        numberString.slice(secondDecimalIndex + 1);
    }
  }
  return numberString;
}
