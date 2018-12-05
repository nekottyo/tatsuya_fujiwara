export class Slack {
  private postUrl: string;
  private oAuthToken: string;
  private eventJson: { [key: string]: string };

  constructor(postUrl: string, oAuthToken: string, eventJson) {
    this.postUrl = postUrl;
    this.oAuthToken = oAuthToken;
    this.eventJson = eventJson;
  }

  public call(postText: string): any {
    if (this.eventJson.type === "url_verification") {
      return ContentService.createTextOutput(this.eventJson.challenge);
    } else if (
      this.eventJson.subtype &&
      this.eventJson.subtype === "bot_message"
    ) {
      return;
    }

    this.post(postText);
  }

  private post(postText: string) {
    let payload: { [key: string]: string } = {
      token: this.oAuthToken,
      text: encodeURIComponent(postText),
      channel: this.eventJson.channel
    };
    let urlParams = Object.keys(payload)
      .map(key => [key, payload[key]])
      .map(e => e.join("="))
      .join("&");
    console.log(payload);
    console.log(this.postUrl);
    let response = UrlFetchApp.fetch(this.postUrl + urlParams);
    console.log(response);
  }
}
