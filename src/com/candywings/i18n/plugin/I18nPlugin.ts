import { I18nConfig, I18nLangaugeData, I18nScene, StringIndexedObject } from "../extensions/Interfaces";
import { addExtendedTextGameObjects } from "./Utils";

export default class I18nPlugin extends Phaser.Events.EventEmitter {
  protected currentJSON: any;
  protected currentLanguageData: I18nLangaugeData;
  protected previuseLanguage: string;

  public static LANGUAGE_CHANGED_EVENT: string = 'languageChanged';

  constructor(protected game: Phaser.Game, public config: I18nConfig) {
    super();
    addExtendedTextGameObjects(this.game);
  }

  public init(language?: string): void {
    this.changeLanguage(language);
  }

  public translate(key: string = '', options: any): string {
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
          const valueIjectionString: string = `${this.config.valueInjectorOpener}${optionKey}${this.config.valueInjectorCloser}`;
          translation = translation.replace(
            valueIjectionString,
            `${options[optionKey]}`,
          );
        }
      }
    }
    return translation || key;
  }

  public changeLanguage(language: string): void {
    this.previuseLanguage = this.currentLanguageData ? this.currentLanguageData.key : null
    this.currentLanguageData = this.config.languages.find(
      (languageData: I18nLangaugeData) => languageData.key === language,
    );
    if (!!this.currentLanguageData) {
      this.config.language = language;
      this.updateCurrentLanguageObject();
      this.emit(I18nPlugin.LANGUAGE_CHANGED_EVENT);
    }
  }

  protected updateCurrentLanguageObject(): void {
    this.currentJSON = this.game.cache.json.get(this.langaugeKey);
  }

  protected get scenes(): I18nScene[] {
    return this.game.scene.getScenes() as I18nScene[];
  }

  protected get langaugeKey(): string {
    return this.config.language
  }

  public getFont(oldFontName: string): string {
    if (this.previuseLanguage && this.config.fontMappings) {
      const fontMappingObject: StringIndexedObject = this.config.fontMappings.find((value: StringIndexedObject) => {
        return value[this.previuseLanguage] === oldFontName
      })
      return fontMappingObject[this.currentLanguageData.key] || oldFontName
    } else {
      return this.config.fontMappings ? this.config.fontMappings.find((value: StringIndexedObject) => {
        return value[this.currentLanguageData.key] === oldFontName
      })[this.currentLanguageData.key] : oldFontName
    }
  }
  public getBitmapFont(oldFontName: string): string {
    if (this.previuseLanguage && this.config.bitmapFontMappings) {
      const fontMappingObject: StringIndexedObject = this.config.bitmapFontMappings.find((value: StringIndexedObject) => {
        return value[this.previuseLanguage] === oldFontName
      })
      return fontMappingObject[this.currentLanguageData.key] || oldFontName
    } else {
      return this.config.bitmapFontMappings ? this.config.bitmapFontMappings.find((value: StringIndexedObject) => {
        return value[this.currentLanguageData.key] === oldFontName
      })[this.currentLanguageData.key] : oldFontName
    }
  }
}
