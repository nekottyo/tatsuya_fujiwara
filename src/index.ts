import { Tatsuya } from "./tatsuya";
import { Slack } from "./slack";

function doPost(e) {
  let postUrl: object = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Sheet1")
    .getRange("A1")
    .getValue();

  let oAuthToken: object = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Sheet1")
    .getRange("A2")
    .getValue();

  console.log(e.postData.getDataAsString());
  let jsonData: { [key: string]: { [key: string]: string } } = JSON.parse(
    e.postData.getDataAsString()
  );
  console.log(jsonData);

  let message: string = jsonData.event.text;
  console.log(message);

  const tatsuya = new Tatsuya();
  const slack = new Slack(String(postUrl), String(oAuthToken), jsonData.event);

  if (tatsuya.call(message)) {
    return slack.call(tatsuya.call(message));
  }
}
