import i18next from 'i18next';
import _ from 'lodash';

export function setText<T>(
  i18nKey: string = this._i18nKey,
  interpolations: Interpolations = this._interpolations,
): T {
  if (
    i18nKey !== this._i18nKey ||
    !_.isEqual(interpolations, this._interpolations)
  ) {
    this._i18nKey = i18nKey || '';
    this._interpolations = interpolations;
    this.nativeSetText(i18next.t(i18nKey, interpolations));
  }
  return this;
}
export function setTextValue<T>(i18nKey: string = this._i18nKey): T {
  if (i18nKey !== this._i18nKey) {
    this._i18nKey = i18nKey || '';
    this.nativeSetText(i18next.t(i18nKey, this._interpolations));
  }
  return this;
}
export function setTextInterpolations<T>(
  interpolations: Interpolations = this._interpolations,
): T {
  if (!_.isEqual(interpolations, this._interpolations)) {
    this.nativeSetText(i18next.t(this._i18nKey, interpolations));
  }
  return this;
}

export function clearInterpolations<T>(): T {
  this._interpolations = null;
  return this;
}
export type Interpolations = { (key: number | string): number | string };

export interface I18nPlguinTextExtension {
  _i18nKey: string;
  _interpolations: Interpolations;
  nativeSetText: (value?: string) => this;
  setText: (i18nKey?: string, interpolations?: Interpolations) => this;
  setTextValue: (i18nKey?: string) => this;
  setTextInterpolations: (interpolations?: Interpolations) => this;
  clearInterpolations: () => this;
}

export declare type I18nText = Phaser.GameObjects.Text &
  I18nPlguinTextExtension;
export declare type I18nBitmapText = Phaser.GameObjects.Text &
  I18nPlguinTextExtension;
export declare type I18nDynamicBitmapText = Phaser.GameObjects.Text &
  I18nPlguinTextExtension;
