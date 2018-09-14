function getFuziwara(message) {
  console.log(message); 
  console.log(typeof message);
  var re = /^[kp]+$/;
  if (message === 'session') {
    const term = [':session-se:', ':session-tu:',':session-si:',':session-yo:', ':session-n:']
    var text = ""
    var index = 0
    while(!text.match(/:session-se::session-tu::session-si::session-yo::session-n:/)){
      rand = getRandomInt(index,4)
      text += term[rand]
      if (rand === index) {
        index += 1
      } else {
        index = 0
      }
    }
    return text
  } else if (message === '怒った?') {
    return addSonantMark('怒ってないよ')
  } else if (re.test(message)) {
    return kpp(message)
  } else {
    return addSonantMark(message)
  }
}

function addSonantMark(message) {
  var response = new Array();
  Array.prototype.forEach.call(message, function(s) {
    response += s + "゛"
  });
  return response;
}
 
function getRandomInt(min, max){
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}

function kpp(message) {
  var response = new Array();
  
  Array.prototype.forEach.call(message, function(s) {
    if (s === 'k') {
      response += 'きゃりー'
    } else {
      response += 'ぱみゅ'
    }
  });
  return response;
}

function doPost(e) {
  var url = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1').getRange('A1').getValue();
  var message = e.parameter.text.match(/竜也\s+(.*)/)[1].toString()
  var payload  = {
    'text'      : getFuziwara(message),
  };
  var options = {
    'method'      : 'post'                 ,
    'contentType' : 'application/json'     ,
    'payload'     : JSON.stringify(payload),
  };

  UrlFetchApp.fetch(url, options);
}