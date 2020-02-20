## Description

This is i18n plugin for phaser 3 (https://github.com/photonstorm/phaser)
It works only with phaser, because it uses jsons, that must be loaded into phaser game cache.

This plugin doesn't mutate original `Phaser.GameObjects.Text`, `Phaser.GameObjects.BitmapText` and `Phaser.GameObjects.DynamicBitmapText` types. It bring it's own text types for each of these types `ExtendedText`, `ExtendedBitmapText`, `ExtendedDynamicBitmapText`.
This plugin adds factory and creator methods in `Scene` class for added types.
It doesn't load json files again and again, it doesn't copy something or change something.
It works automatically when I18nPlugin language is being chnaged. Every added game object type will emit `I18nPlugin.LANGUAGE_CHANGED_EVENT` event, when updates language.

## How to use

I18nPlugin game objects will try to translate a value given to `text` property, if there's no translation given value will be shown.

```

this.make.extBitmapText(
  {
  ...other params,
  text: 'word-hello'.
  },
  true // addToScene?: boolean
)
// returns object of type ExtendedBitmapText that extends Phaser.GameObjects.BitmapText



// English: hello
// Russian: привет
```

---

You can use dynamic translations, for example you can have a json like this

```
// en.json
{
  "word-hello": "hello",
  "phrase-my-name": "my name is {{playerName}}"
}
```

```
// ru.json
{
  "word-hello": "привет",
  "phrase-my-name": "меня зовут {{playerName}}"
}
```

and you can concate the translations

```

this.make.extText(
  {
  ...other params,
  text: this.scene.i18n.translate('word-hello') + ', ', + this.scene.i18n.translate('phrase-my-name', {
    playerName: "Rollin Safary",
  }).
  },
  true // addToScene?: boolean
)
// returns object of type ExtendedText that extends Phaser.GameObjects.Text



// English: hello, my name is Rollin Safary
// Russian: привет, меня зовут Rollin Safary
```

`npm install @candywings/phaser3-i18n-plugin`

##Setup
Example codes are provided on TypeScript.

#### Game

```
import { I18nGame, I18nPlugin } from '@candywings/phaser3-i18n-plugin';

export default class Game extends I18nGame {
  constructor(config: Phaser.Core.Config) {
    super(generateGameConfiguration());
    this.setupI18n();
  }

  public setupI18n(): void {
    this.i18n = new I18nPlugin(this, {
      languages: [
        { key: 'en', keyJSON: 'translation-en' },
        { key: 'ru', keyJSON: 'translation-ru' },
      ],
      language: 'en',
      valueInjectorOpener: '{{',
      valueInjectorCloser: '}}',
    });
  }
}
```

#### BaseScene

(if you aren't using other plugin that adds something to scene's factory and creator)

```
import { I18nScene } from '@candywings/phaser3-i18n-plugin';

export default class BaseScene extends I18nScene {

  public init():void {
     this.i18n = this.game.i18n;
  }
}
```

(if you are using other plugin that adds something to scene's factory and creator, for example "@koreez/phaser3-ninepatch@^1.2.5 plugin)

```
import { I18nCreator, I18nFactory, I18nPlugin } from '@candywings/phaser3-i18n-plugin';
import { INinePatchCreator, INinePatchFactory } from '@koreez/phaser3-ninepatch';


export default class BootScene extends Phaser.Scene {
  public add: INinePatchFactory & I18nFactory;
  public make: INinePatchCreator & I18nCreator;
  public i18n: I18nPlugin

  public init():void {
     this.i18n = this.game.i18n;
  }
}
```

#### BootScene

```
import { I18nCreator, I18nFactory, I18nScene } from '@candywings/phaser3-i18n-plugin';

export default class BootScene extends BaseScene {
  public preload():void {
    // load your translation jsons here via phaser loader
  }

  public create():void {
    this.i18n.init();
  }
}
```

