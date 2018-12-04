export class Tatsuya {
  static kp: RegExp = /^[kp]+$/;
  static x: RegExp = /^.*(紅|くれない).*$/;

  constructor() {}

  public call(message: string): string {
    let fuziwara = /^竜也\s+(.*)$/;
    let member = /達也/;

    if (fuziwara.test(message)) {
      return this.askTatsuya(message.match(fuziwara)[1].toString());
    } else if (member.test(message)) {
      return this.addSonantMark("メンバーじゃない");
    } else {
      return this.tatsuyaForAll(message);
    }
  }

  public askTatsuya(message): string {
    if (message === "session") {
      return this.session();
    } else if (message === "怒った?") {
      return this.addSonantMark("怒ってないよ");
    } else if (message == "昼飯") {
      return this.getHirumeshi();
    } else if (Tatsuya.kp.test(message)) {
      return this.kpp(message);
    } else if (Tatsuya.x.test(message)) {
      return this.xJapan();
    } else {
      return this.addSonantMark(message);
    }
  }

  private session(): string {
    const term: string[] = [
      ":session-se:",
      ":session-tu:",
      ":session-si:",
      ":session-yo:",
      ":session-n:"
    ];
    let text: string = "";
    let index: number = 0;
    while (
      !text.match(/:session-se::session-tu::session-si::session-yo::session-n:/)
    ) {
      let rand: number = this.getRandomInt(index, 4);
      text += term[rand];
      if (rand === index) {
        index += 1;
      } else {
        index = 0;
      }
    }
    return text;
  }

  private tatsuyaForAll(message): string {
    let x: RegExp = /^.*(紅|くれない).*$/;
    if (x.test(message)) {
      return this.xJapan();
    }
  }

  private addSonantMark(message): string {
    let response: string;
    Array.prototype.forEach.call(message, function(s) {
      response += s + "゛";
    });
    return response;
  }

  private xJapan(): string {
    let yoshiki: string = "紅だ";

    const iter = [
      { count: this.getRandomInt(3, 20), shout: "ー" },
      { count: this.getRandomInt(3, 100), shout: "！" }
    ];

    for (let value of iter) {
      yoshiki += this.appendEach(value.count, value.shout);
    }

    return yoshiki;
  }

  private appendEach(count, text): string {
    let value: string = "";
    for (let i: number = 0; i < count; i++) {
      value += text;
    }
    return value;
  }

  private kpp(message): string {
    let response: string;

    Array.prototype.forEach.call(message, function(s) {
      if (s === "k") {
        response += "きゃりー";
      } else {
        response += "ぱみゅ";
      }
    });
    return response;
  }

  private getHirumeshi(): string {
    let meshi_list = "ラーメン カフェ カレー 寿司 スイーツ 焼き鳥 タイ料理 しゃぶしゃぶ つけ麺 ファミレス パスタ もつ鍋 ピザ 韓国料理 ホルモン ハンバーグ うどん 餃子 天ぷら 喫茶店 沖縄料理 うなぎ そば（蕎麦） ハンバーガー 居酒屋 焼肉 バー お好み焼き ステーキ バイキング オイスターバー 鉄板焼き ケーキ屋 オムライス おでん とんかつ パン屋 ワインバー 火鍋 ダイニングバー 定食 立ち飲み 水炊き ビストロ 洋食 牛タン スポーツバー サムギョプサル クレープ 肉バル 海鮮丼 たこ焼き 串カツ お土産 親子丼 カツ丼 天丼 ビアバー アイスクリーム 懐石料理 ちゃんこ鍋 四川料理 炉端焼き 甘味処 冷麺 京料理 料亭 牛丼".split(
      " "
    );
    return meshi_list[this.getRandomInt(0, meshi_list.length)];
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
