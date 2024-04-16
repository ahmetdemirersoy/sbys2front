var globalSellingRuleValue; // Global değişkeni tanımla
async function renderRules2(data) {
  //console.log(result1);
  //console.log("HAREM");
  if (notAuth) {
    // return;
  } else if (rules == null) {
    try {
      rules = await JSON.parse(result1);
      //rules = await getallrules();

      if (rules.statusCode == 101) {
        //window.location.reload();
        // $("#authanticationdiv").css("display", "");
        // $("#notfounddiv").css("display", "none");
        // $("#maindiv").css("display", "none");
        // notAuth = true;
        // return;
      } else if (rules.statusCode == -98) {
        // $("#licanceend").css("display", "");
        // $("#maindiv").css("display", "none");
        // notAuth = true;
        // return;
      }
      if (rules.statusCode != -99) {
        if (!initMarq) {
          prepareMarqueeHas(rules, data);
          initMarq = true;
          if (beforeversion != rules.version) {
            window.location.reload();
          }
          setInterval(async () => {
            const currentTime = Date.now();
            if (!lastRequestTime || currentTime - lastRequestTime >= 60000) {
              rules = JSON.parse(result1);
              //rules = await getallrules();
              if (rules.statusCode == 101) {
                // $("#authanticationdiv").css("display", "");
                // $("#notfounddiv").css("display", "none");
                // $("#maindiv").css("display", "none");
              }
              //getallrules();
            } else if (!blockedUntilTime) {
              blockedUntilTime = currentTime + 60000;
            }
          }, 60000);
        }
      } else {
        // $("#notfounddiv").css("display", "");
        // $("#maindiv").css("display", "none");
        // notAuth = true;
        // return;
      }
    } catch (error) {}
  }
  try {
    updateCurrencyMarqueeHarem(data, rules);
  
    if (rules.data != undefined) {
      rules.data.forEach((rule) => {
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
        }
        
        /*** satış değerleri için ***/
  
        if (type == "1") {
          //OTO
          otoForex(rule, data);
          //console.log("burada");
          if (aliscarpanintypefk != "") {
            // //console.log(ruleBuyRate);
            // const currencya = data["ALTIN"];
            // if(currencya != undefined){
            //   if (currencya.code === "ALTIN") {
            //     currencya.code = "HAS";
            //   }
            //   if (currencya.code == "HAS") {
            //     var sellingRuleValue = parseFloat(currencya.satis);
  
            //     sellingRuleValue = sellingRuleValue * ruleBuyRate;
            //     sellingRuleValue = getSteppedValue(sellingRuleValue, step);
            //     globalSellingRuleValue = sellingRuleValue;
            //     if (globalSellingRuleValue != undefined) {
            //       alisUpdateTableAndIcon(
            //         currencytitle,
            //         globalSellingRuleValue,
            //         rulebuymore,
            //         ruleOrder
            //       );
            //     }
            //   }
            // }
            if (typeof data === "object" && data !== null) {
              const currencya = Object.hasOwnProperty.call(data, "ALTIN")
                ? data["ALTIN"]
                : undefined;
  
              if (currencya != undefined) {
                if (currencya.code === "ALTIN") {
                  currencya.code = "HAS";
                }
                if (currencya.code == "HAS") {
                  var sellingRuleValue = parseFloat(currencya.satis);
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
                  }
                }
              }
            }
          }
        } else if (type == "2") {
          //SABİT
          sabitCarpan(rule);
        } else {
          if (carpanintypefk == "1") {
            //has ile çarpılanlar
            handleTypeOne(
              currencyRuleCode,
              currencyRuleCurrencyStep,
              rate,
              step,
              ruleOrder,
              currencytitle,
              rulesellmore,
              data
            );
  
            // if (aliscarpanintypefk != "") {
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
          } else if (carpanintypefk == "2") {
            handleTypeTwo(
              currencyRuleCurrencyStep,
              rate,
              step,
              currencytitle,
              carpaninvalue,
              carpaninbeforevalue
            );
            //console.log(currencytitle)
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
              carpanincurrencyfk
            );
            //console.log(currencytitle)
          }
        }
      });
    }
  } catch (error) {
    
  }

}

function alisHandleTypeOne(
  ruleBuyRate,
  currencyRuleCode,
  currencyRuleCurrencyStep,
  step,
  ruleOrder,
  currencytitle,
  rulebuymore,
  data
) {
  for (const currencyCodea in data) {
    if (Object.hasOwnProperty.call(data, currencyCodea)) {
      const currencya = data[currencyCodea];
      if (currencya.code === "ALTIN") {
        currencya.code = "HAS";
      }
      if (currencya.code == currencyRuleCode) {
        var sellingRuleValue = parseFloat(currencya.satis);
        sellingRuleValue = getSteppedValue(
          sellingRuleValue,
          currencyRuleCurrencyStep
        );
        sellingRuleValue = sellingRuleValue * ruleBuyRate;
        sellingRuleValue = getSteppedValue(sellingRuleValue, step);
        globalSellingRuleValue = sellingRuleValue;
        if (globalSellingRuleValue != undefined) {
          //alisUpdateTableAndIcon(currencytitle, globalSellingRuleValue, ruleOrder);
          alisUpdateTableAndIcon(
            currencytitle,
            globalSellingRuleValue,
            rulebuymore,
            ruleOrder
          );
        }
      }
    }
    break;
  }
}

function handleTypeOne(
  currencyRuleCode,
  currencyRuleCurrencyStep,
  rate,
  step,
  ruleOrder,
  currencytitle,
  rulesellmore,
  data
) {
  for (const currencyCodea in data) {
    if (Object.hasOwnProperty.call(data, currencyCodea)) {
      const currencya = data[currencyCodea];
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
        }
       
      }
    }
    break;
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
  carpanincurrencyfk
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
      for (
        var secondCounter = 0;
        secondCounter < rules.allSymbols.length;
        secondCounter++
      ) {
        var currency = rules.allSymbols[secondCounter];

        currencya.code = currencya.code.replace("TRY", "");
        if (currencya.code == currency.currencyCode) {
          //console.log("Burada", currency);
          var currencyIcon = currency.currencyIcon;
          var currencyCode = currency.currencyCode;
          var currencyvalue = pad(currencya.alis, 7);
          var currencysvalue = pad(currencya.satis, 7);
          //<img src="" alt="" class="avatar-sm currency_image" id="currency_image" data-id="${currencyCode}">${currencyIcon}
          tempSlipyCur += `
            <span class="currency_title"  data-id="${currencyCode}">${currencyCode}</span>
            <span class="currency_alis"  data-id="${currencyCode}"> Alış :</span> <span style="width: 60px;" id="${currencyCode}buy">${currencyvalue}</span>
            <span class="currency_satis"  data-id="${currencyCode}">- Satış :</span><span style="width: 60px;" id="${currencyCode}sell">${currencysvalue}</span>&nbsp;`;
        }
      }
    }
  }
  //document.getElementById('testacc').innerHTML = fixedCurrHtml
  var currDom = $("#announcements");
  if (currDom.innerHTML != tempSlipyCur) {
    currDom.append(tempSlipyCur);
    currDom.marquee(options);
    // $('#testacc').append(html)
  }
  var announcementsDom = $("#duyurlardiv");
  if (announcementsDom.innerHTML != rules.announcement) {
    announcementsDom.append(rules.announcement);
    announcementsDom.marquee(mOptions);
    // $('#testacc').append(html)
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

function getRulesEurHarem(rule, data) {
  let rate = rule.map.rate;
  let buyRate = rule.map.ruleBuyRate;
  for (var anahtar in data) {
    var eur = data[anahtar];

    if (eur.code === "USD") {
      //console.log(eur);
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
