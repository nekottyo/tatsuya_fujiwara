function getFuziwara(message) {
  console.log(message);
  console.log(typeof message);
  var kp = /^[kp]+$/;
  var x = /^.*(紅|くれない).*$/;
  if (message === "session") {
    return session();
  } else if (message === "怒った?") {
    return addSonantMark("怒ってないよ");
  } else if (message == "昼飯") {
    return getHirumeshi();
  } else if (kp.test(message)) {
    return kpp(message);
  } else if (x.test(message)) {
    return xJapan();
  } else {
    return addSonantMark(message);
  }
}

function session() {
  const term = [
    ":session-se:",
    ":session-tu:",
    ":session-si:",
    ":session-yo:",
    ":session-n:"
  ];
  var text = "";
  var index = 0;
  while (
    !text.match(/:session-se::session-tu::session-si::session-yo::session-n:/)
  ) {
    rand = getRandomInt(index, 4);
    text += term[rand];
    if (rand === index) {
      index += 1;
    } else {
      index = 0;
    }
  }
  return text;
}

function xJapan() {
  var yoshiki = "紅だ";
  const iter = [
    { count: getRandomInt(3, 20), shout: "ー" },
    { count: getRandomInt(3, 20), shout: "！" }
  ];

  for (const value of iter) {
    yoshiki += appendEach(value.count, value.shout);
  }

  return yoshiki;
}

function getHirumeshi() {
  var meshi_list = "ラーメン カフェ カレー 寿司 スイーツ 焼き鳥 タイ料理 しゃぶしゃぶ つけ麺 ファミレス パスタ もつ鍋 ピザ 韓国料理 ホルモン ハンバーグ うどん 餃子 天ぷら 喫茶店 沖縄料理 うなぎ そば（蕎麦） ハンバーガー 居酒屋 焼肉 バー お好み焼き ステーキ バイキング オイスターバー 鉄板焼き ケーキ屋 オムライス おでん とんかつ パン屋 ワインバー 火鍋 ダイニングバー 定食 立ち飲み 水炊き ビストロ 洋食 牛タン スポーツバー サムギョプサル クレープ 肉バル 海鮮丼 たこ焼き 串カツ お土産 親子丼 カツ丼 天丼 ビアバー アイスクリーム 懐石料理 ちゃんこ鍋 四川料理 炉端焼き 甘味処 冷麺 京料理 料亭 牛丼".split(
    " "
  );
  return meshi_list[Math.floor(Math.random() * meshi_list.length)];
}

function appendEach(count, string) {
  var text = "";
  for (var i = 0; i < count; i++) {
    text += string;
  }
  return text;
}

function addSonantMark(message) {
  var response = new Array();
  Array.prototype.forEach.call(message, function(s) {
    response += s + "゛";
  });
  return response;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function kpp(message) {
  var response = new Array();

  Array.prototype.forEach.call(message, function(s) {
    if (s === "k") {
      response += "きゃりー";
    } else {
      response += "ぱみゅ";
    }
  });
  return response;
}

function doPost(e) {
  var url = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Sheet1")
    .getRange("A1")
    .getValue();
  var rowMessage = e.parameter.text;

  var responseText = "";

  var fuziwara = /^竜也\s+(.*)$/;
  var member = /達也/;

  if (fuziwara.test(rowMessage)) {
    responseText = getFuziwara(rowMessage.match(fuziwara)[1].toString());
  } else if (member.test(rowMessage)) {
    responseText = addSonantMark("メンバーじゃない");
  }

  if (responseText.length == 0) {
    return;
  }
  var payload = {
    text: responseText
  };
  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}
