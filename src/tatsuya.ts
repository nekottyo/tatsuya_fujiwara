export class Tatsuya {
  static kp: RegExp = /^[kp]+$/;
  static x: RegExp = /^.*(紅|く.*れ.*な.*い|kurenai).*$/;
  static police: RegExp = /^.*(逮捕|た.*い.*ほ|タ.*イ.*ホ|taiho).*$/;
  static yudetaro: RegExp = /^.*ゆ.*で.*太.*郎.*$/;

  constructor() {}

  public call(message: string): string {
    let fuziwara = /^竜也\s+(.*)$/;
    let member = /達也/;

    console.log(message);
    if (fuziwara.test(message)) {
      return this.askTatsuya(message.match(fuziwara)[1].toString());
    } else if (member.test(message)) {
      return this.addSonantMark("メンバーじゃない");
    } else {
      return this.tatsuyaForAll(message);
    }
  }

  public askTatsuya(message: string): string {
    if (message === "session") {
      return this.session();
    } else if (message === "怒った?") {
      return this.addSonantMark("怒ってないよ");
    } else if (message == "昼飯") {
      return this.getHirumeshi();
    } else if (message == "カレー") {
      return this.getCurry();
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
    if (Tatsuya.x.test(message)) {
      return this.xJapan();
    } else if (Tatsuya.police.test(message)) {
      return this.police();
    } else if (Tatsuya.yudetaro.test(message)) {
      return "せいや!?";
    }
  }

  private addSonantMark(message: string): string {
    let response: string = "";
    Array.prototype.forEach.call(message, function(s) {
      response += s + "゛";
    });
    return response;
  }

  private shout(baseString): string {
    let text: string = baseString;
    const iter = [
      { count: this.getRandomInt(3, 20), shout: "ー" },
      { count: this.getRandomInt(3, 100), shout: "！" }
    ];

    for (let value of iter) {
      text += this.appendEach(value.count, value.shout);
    }

    return text;
  }

  private xJapan(): string {
    let yoshiki: string = "紅だ";
    return this.shout(yoshiki);
  }

  private police(): string {
    let omawari: string = "逮捕だ";
    return this.shout(omawari);
  }

  private appendEach(count, text): string {
    let value: string = "";
    for (let i: number = 0; i < count; i++) {
      value += text;
    }
    return value;
  }

  private kpp(message): string {
    let response: string = "";

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
    let meshi_list = "ラーメン カフェ カレー 寿司 スイーツ 焼き鳥 タイ料理 しゃぶしゃぶ つけ麺 ファミレス パスタ もつ鍋 ピザ 韓国料理 ホルモン ハンバーグ うどん 餃子 天ぷら 喫茶店 沖縄料理 うなぎ そば（蕎麦） ハンバーガー 居酒屋 焼肉 バー お好み焼き ステーキ バイキング オイスターバー 鉄板焼き ケーキ屋 オムライス おでん とんかつ パン屋 ワインバー 火鍋 ダイニングバー 定食 立ち飲み 水炊き ビストロ 洋食 牛タン スポーツバー サムギョプサル クレープ 肉バル 海鮮丼 たこ焼き 串カツ お土産 親子丼 カツ丼 天丼 ビアバー アイスクリーム 懐石料理 ちゃんこ鍋 四川料理 炉端焼き 甘味処 冷麺 京料理 料亭 牛丼 ゆで太郎".split(
      " "
    );
    return meshi_list[this.getRandomInt(0, meshi_list.length)];
  }

  private getCurry(): string {
    let currys = "エビカレー エビココナッツカレー エビとバターカレー エビと玉子のカレー エビと茄子カレー クミンとじゃがいものカレー シーフードカレー シーフードとなすのカレー チキンカレー チキンココナッツカレー チキンコルマカレー チキン・ド・ピアザカレー チキンと玉子カレー チキンと豆カレー チキンバルタカレー チキンポテトカレー チキンラジュワブカレー チキン茄子カレー とり皮カレー なすとじゃがいものカレー なすとトマトのカレー バターチキンカレー バターチキンカレー・ほうれん草とひき肉のカレー ひき肉とエビのカレー ひき肉となすのカレー ひき肉とほうれん草のカレー ひき肉と玉子のカレー ひき肉のカレー ひよこ豆のカレー フィッシュマサラカレー ブラックカレー ベジタブルカレー ポークカレー ポークとじゃがいものカレー ポークとほうれん草のカレー ポークと玉子のカレー ポークマサラカレー ほうれん草とエビのカレー ほうれん草とじゃがいものカレー ほうれ ん草とチキンカレー ほうれん草と野菜のカレー ほうれん草マトンカレー マトンカレー マトンマサラカレー 本日のカレー 本日のカレー＆チキンバルタカレー 豆とほうれん草のカレー 豆のカレー 魚ココナッツカレー 魚とマッシュルームのカレー 田舎カレー".split(
      " "
    );
    return currys[this.getRandomInt(0, currys.length)];
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
