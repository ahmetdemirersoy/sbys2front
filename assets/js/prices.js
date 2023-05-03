// var lastPrices = {};
// var currencyLists = [
//   {
//     area: "main",
//     currencies: ["GBP", "CHF", "DKK", "SAR"],
//   },
//   {
//     area: "doviz",
//     currencies: [
//       "USD",
//       "EUR",
//       "GBP",
//       "CHF",
//       "DKK",
//       "SAR",
//       "AUD",
//       "CAD",
//       "JPY",
//       "SEK",
//       "NOK",
//     ],
//   },
//   {
//     area: "parite",
//     currencies: [
//       "EURUSD",
//       "GBPUSD",
//       "USDCHF",
//       "USDDKK",
//       "AUDUSD",
//       "USDCAD",
//       "USDJPY",
//       "USDSEK",
//       "USDNOK",
//     ],
//   },
//   {
//     area: "altin",
//     currencies: ["HAS", "GAUUSD", "GAUEUR", "GUMUS", "ONSUSD", "ONSGUMUS"],
//   },
//   {
//     area: "ziynet",
//     currencies: [
//       "CEYREK",
//       "YARIM",
//       "TAM(LIRA)",
//       "GREMSE (2.5)",
//       "ATA LIRA(CUMHURIYET)",
//     ],
//   },
// ];

// const currencyLabels = [
//   {
//     currency: "ONSGUMUS",
//     label: "ONS GÜMÜŞ",
//   },
//   {
//     currency: "ONSUSD",
//     label: "ONS ALTIN",
//   },
//   {
//     currency: "USDNOK",
//     label: "Dolar/Norveç Kronu",
//   },
//   {
//     currency: "USDSEK",
//     label: "Dolar/İsveç Kronu",
//   },
//   {
//     currency: "USDJPY",
//     label: "Dolar/Japon Yeni",
//   },
//   {
//     currency: "USDCAD",
//     label: "Dolar/Kanada Doları",
//   },
//   {
//     currency: "USDDKK",
//     label: "Dolar/Danimarka Kronu",
//   },
//   {
//     currency: "USDCHF",
//     label: "Dolar/İsviçre Frangı",
//   },
//   {
//     currency: "GBP",
//     label: "İngiliz Sterlini",
//   },
//   {
//     currency: "CHF",
//     label: "İsviçre Frangı",
//   },
//   {
//     currency: "DKK",
//     label: "Danimarka Kronu",
//   },
//   {
//     currency: "SAR",
//     label: "S.Arabistan Riyali",
//   },
//   {
//     currency: "AUD",
//     label: "Avustralya Doları",
//   },
//   {
//     currency: "CAD",
//     label: "Kanada Doları",
//   },
//   {
//     currency: "EUR",
//     label: "Euro",
//   },
//   {
//     currency: "USD",
//     label: "Dolar",
//   },
//   {
//     currency: "HAS",
//     label: "Altın",
//   },
//   {
//     currency: "JPY",
//     label: "Japon Yeni",
//   },
//   {
//     currency: "SEK",
//     label: "İsveç Kronu",
//   },
//   {
//     currency: "NOK",
//     label: "Norveç Kronu",
//   },
//   {
//     currency: "GAUUSD",
//     label: "Dolar/Kilo",
//   },
//   {
//     currency: "GAUEUR",
//     label: "Euro/Kilo",
//   },
//   {
//     currency: "EURUSD",
//     label: "Euro/Dolar",
//   },
//   {
//     currency: "GBPUSD",
//     label: "Sterlin/Dolar",
//   },
//   {
//     currency: "AUDUSD",
//     label: "Avustralya Doları/Dolar",
//   },
//   {
//     currency: "CEYREK",
//     label: "Eski Çeyrek",
//   },
//   {
//     currency: "YARIM",
//     label: "Eski Yarım",
//   },
//   {
//     currency: "TAM(LIRA)",
//     label: "Eski Lira",
//   },
//   {
//     currency: "GREMSE (2.5)",
//     label: "Eski Gremse",
//   },
//   {
//     currency: "ATA LIRA(CUMHURIYET)",
//     label: "Eski Cumhuriyet",
//   },
//   {
//     currency: "1GRAMLIK",
//     label: "Gram Altın (22 ayar)",
//   },
//   {
//     currency: "GUMUS",
//     label: "Gümüş",
//   },
// ];

// function createRows() {
//   currencyLists.map(function (x) {
//     console.log(x)
//     var dom = $('.currencyList[area="' + x.area + '"]');
 
//     if (dom.length > 0) {
//       dom.each(function (key, elem) {
        
//         x.currencies.map(function (c) {
//           var label = currencyLabels.find((x) => x.currency === c);
         
//           var labelText = label ? "<br><span>" + label.label + "</span>" : "";
//           console.log("labelText", c);
//           $(elem).append(
//             '<div class="currency-area-body-body-row tr liveCurrency" currency="' +
//               c +
//               '">\n' +
//               '                                        <div class="item td">' +
//               c +
//               labelText +
//               "</div>\n" +
//               '                                        <div class="item td bp"></div>\n' +
//               '                                        <div class="item td sp"></div>\n' +
//               '                                        <div class="item td"><div class="parity-foot"></div></div>\n' +
//               "                                    </div>"
//           );
//         });
//       });
//     }
//   });
// }

// function updatePrices(data) {
//   data.map(function (d) {
//     var currencyDom = $('.liveCurrency[currency="' + d.currency + '"]');
//     if (currencyDom.length > 0) {
//       currencyDom.find(".sp").text(d.sell);
//       currencyDom.find(".bp").text(d.buy);
//       var change = "";
//       if (lastPrices[d.currency]) {
//         change = lastPrices[d.currency] < d.sell ? "p_up" : "p_down";
//       }
//       lastPrices[d.currency] = d.sell;
//       currencyDom.removeClass("p_up").removeClass("p_down").addClass(change);
//     }
//   });
// }

// function parsePrices(rawData) {
//   var fieldData = [
//     {
//       index: 0,
//       key: "currency",
//     },
//     {
//       index: 1,
//       key: "category",
//     },
//     {
//       index: 3,
//       key: "buy",
//     },
//     {
//       index: 4,
//       key: "sell",
//     },
//   ];
//   var rows = [];
//   rawData.split("\r\n").map((row) => {
//     var fields = row.split(";");
//     //console.log(fields)
//     var parsedData = {};
//     fieldData.map(function (d) {
//       parsedData[d.key] = fields[d.index];
//     });
//     rows.push(parsedData);
//   });
//   return rows;
// }

// function initWs() {
//   if ("WebSocket" in window) {
//     createRows();
//     console.log("socketUrl", socketUrl);
//     var ws = new WebSocket(socketUrl);

//     ws.onerror = function (error) {
//       console.log("error ws", error);
//     };

//     ws.onopen = function () {
//       console.log("onopen");
//     };

//     ws.onmessage = function (evt) {
//       var received_msg = evt.data;
//       var data = parsePrices(received_msg);
//       updatePrices(data);
//     };

//     ws.onclose = function () {
//       console.log("closed");
//     };
//   } else {
//     console.log("WebSocket NOT supported by your Browser!");
//   }
// }

// $(document).ready(function () {
//   console.log("document ready");
//   initWs();
// });

// $(function () {
//   console.log("ready!");
// });
