import { Tatsuya } from "./tatsuya";

function doPost(e) {
  const tatsuya = new Tatsuya();

  let url = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Sheet1")
    .getRange("A1")
    .getValue();
  let rowMessage: string = e.parameter.text;

  let responseText: string = tatsuya.call(rowMessage);

  let payload: { [key: string]: string } = {
    text: responseText
  };
  let options: { [key: string]: string } = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(String(url), options);
}
