import {
  I18nConfig,
  I18nLanguageData,
  I18nScene,
  StringIndexedObject,
} from '../extensions/Interfaces';
import { addExtendedTextGameObjects } from './Utils';

export default class I18nPlugin extends Phaser.Events.EventEmitter {
  protected currentJSON: StringIndexedObject;
  protected currentLanguageData: I18nLanguageData;
  protected previousLanguage: string;

  public static LANGUAGE_CHANGED_EVENT: string = 'languageChanged';

  constructor(protected game: Phaser.Game, public config: I18nConfig) {
    super();
    addExtendedTextGameObjects(this.game);
  }

  public init(language?: string): void {
    this.changeLanguage(language);
  }

  public translate(key: string = '', options: StringIndexedObject): string {
    if (!key || key === '') {
      return '';
    }
    !this.currentJSON && this.updateCurrentLanguageObject();
    if (!this.currentJSON) {
      return key;
    }
    let translation: string = this.currentJSON[key];
    if (!!translation) {
      if (options) {
        const optionKeys: string[] = Object.keys(options);
        for (const optionKey of optionKeys) {
          const valueInjectionString: string = `${
            this.config.valueInjectorOpener
          }${optionKey}${this.config.valueInjectorCloser}`;
          translation = translation.replace(
            valueInjectionString,
            `${options[optionKey]}`,
          );
        }
      }
    }
    return translation || key;
  }

  public changeLanguage(language: string): void {
    this.previousLanguage = this.currentLanguageData
      ? this.currentLanguageData.key
      : null;
    this.currentLanguageData = this.config.languages.find(
      (languageData: I18nLanguageData) => languageData.key === language,
    );
    if (!!this.currentLanguageData) {
      this.config.language = language;
      this.updateCurrentLanguageObject();
      this.emit(I18nPlugin.LANGUAGE_CHANGED_EVENT);
    }
  }

  protected updateCurrentLanguageObject(): void {
    this.currentJSON = this.game.cache.json.get(this.languageKey);
  }

  protected get scenes(): I18nScene[] {
    return this.game.scene.getScenes() as I18nScene[];
  }

  protected get languageKey(): string {
    return this.config.language;
  }

  public getFont(oldFontName: string): string {
    if (this.previousLanguage && this.config.fontMappings) {
      const fontMappingObject: StringIndexedObject = this.config.fontMappings.find(
        (value: StringIndexedObject) => {
          return (
            value[this.previousLanguage] === oldFontName ||
            value[this.languageKey] === oldFontName
          );
        },
      );
      return fontMappingObject
        ? fontMappingObject[this.currentLanguageData.key]
        : oldFontName;
    } else {
      const fontsMappingObject: StringIndexedObject = this.config.fontMappings
        ? this.config.fontMappings.find((value: StringIndexedObject) => {
            return value[this.currentLanguageData.key] === oldFontName;
          })
        : null;
      return fontsMappingObject
        ? fontsMappingObject[this.currentLanguageData.key]
        : oldFontName;
    }
  }
  public getBitmapFont(oldFontName: string): string {
    if (this.previousLanguage && this.config.bitmapFontMappings) {
      const fontMappingObject: StringIndexedObject = this.config.bitmapFontMappings.find(
        (value: StringIndexedObject) => {
          return value[this.previousLanguage] === oldFontName;
        },
      );
      return fontMappingObject
        ? fontMappingObject[this.currentLanguageData.key]
        : oldFontName;
    } else {
      const fontsMappingObject: StringIndexedObject = this.config
        .bitmapFontMappings
        ? this.config.bitmapFontMappings.find((value: StringIndexedObject) => {
            return value[this.currentLanguageData.key] === oldFontName;
          })
        : null;
      return fontsMappingObject
        ? fontsMappingObject[this.currentLanguageData.key]
        : oldFontName;
    }
  }
}
