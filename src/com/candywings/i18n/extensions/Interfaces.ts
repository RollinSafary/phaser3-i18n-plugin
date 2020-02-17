import I18nPlugin from "../plugin/I18nPlugin";
import ExtendedBitmapText from "./ExtendedBitmapText";
import ExtendedDynamicBitmapText from "./ExtendedDynamicBitmapText";
import ExtendedText from "./ExtendedText";

export class I18nScene extends Phaser.Scene {
  public add: Phaser.GameObjects.GameObjectFactory & I18nFactory
  public make: Phaser.GameObjects.GameObjectCreator & I18nCreator
  public i18n: I18nPlugin
}
export class I18nGame extends Phaser.Game {
  public i18n: I18nPlugin
}

export interface I18nSceneInterface {
  add: Phaser.GameObjects.GameObjectFactory & I18nFactory
  make: Phaser.GameObjects.GameObjectCreator & I18nCreator
  i18n: I18nPlugin
}
export interface I18nGameInterface {
  i18n: I18nPlugin
}

export interface I18nConfig {
  languages: I18nLangaugeData[];
  language: string;
  valueInjectorOpener: string;
  valueInjectorCloser: string;
  fontMappings?: StringIndexedObject[]
  bitmapFontMappings?: StringIndexedObject[]
}

export interface I18nLangaugeData {
  key: string;
  keyJSON: string;
}

export interface I18nCreator {
  extText: (options: ExtendedTextConfig, addToScene?: boolean) => ExtendedText;
  extBitmapText: (
    options: ExtendedBitmapTextConfig,
    addToScene?: boolean,
  ) => ExtendedBitmapText;
  extDynamicBitmapText: (
    options: ExtendedDynamicBitmapTextConfig,
    addToScene?: boolean,
  ) => ExtendedDynamicBitmapText;
}

export interface I18nFactory {
  extText: (
    x: number,
    y: number,
    text: string,
    style?: any,
    i18nOptions?: any,
  ) => ExtendedText;
  extBitmapText: (
    x: number,
    y: number,
    font: string,
    text: string,
    size?: number,
    align?: number,
    i18nOptions?: any,
  ) => ExtendedBitmapText;
  extDynamicBitmapText: (
    x: number,
    y: number,
    font: string,
    text: string,
    size?: number,
    align?: number,
    i18nOptions?: any,
  ) => ExtendedDynamicBitmapText;
}


export interface ExtendedTextConfig {
  x: number;
  y: number;
  text: string;
  style?: any;
  i18nOptions?: any;
}

export interface ExtendedBitmapTextConfig {
  x: number;
  y: number;
  font: string;
  text: string;
  size?: number;
  align?: number;
  i18nOptions?: any;
}

export interface ExtendedDynamicBitmapTextConfig {
  x: number;
  y: number;
  font: string;
  text: string;
  size?: number;
  align?: number;
  i18nOptions?: any;
}

export type StringIndexedObject = { [key: string]: string }