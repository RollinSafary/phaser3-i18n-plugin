import I18nPlugin from '../plugin/I18nPlugin';
import {
  ExtendedDynamicBitmapTextConfig,
  I18nScene,
  I18nSceneInterface,
} from './Interfaces';

export default class ExtendedDynamicBitmapText extends Phaser.GameObjects
  .BitmapText {
  public static Creator(
    options: ExtendedDynamicBitmapTextConfig,
    addToScene: boolean = false,
  ): ExtendedDynamicBitmapText {
    const gameObject: ExtendedDynamicBitmapText = new ExtendedDynamicBitmapText(
      // @ts-ignore
      this.scene,
      options.x,
      options.y,
      options.font,
      options.text,
      options.size,
      options.align,
      options.i18nOptions,
    );
    // @ts-ignore
    addToScene && this.scene.add.existing(gameObject);
    return gameObject;
  }

  public static Factory(
    x: number,
    y: number,
    font: string,
    text: string,
    size: number,
    align: number,
    i18nOptions: any,
  ): ExtendedDynamicBitmapText {
    const gameObject: ExtendedDynamicBitmapText = new ExtendedDynamicBitmapText(
      // @ts-ignore
      this.scene,
      x,
      y,
      font,
      text,
      i18nOptions,
      size,
      align,
    );
    // @ts-ignore
    this.scene.add.existing(gameObject);
    return gameObject;
  }

  protected i18n: I18nPlugin;
  protected i18nKey: string;

  constructor(
    protected scene: I18nScene | Phaser.Scene & I18nSceneInterface,
    x: number,
    y: number,
    font: string,
    text: string,
    size: number,
    align: number,
    protected i18nOptions: any,
  ) {
    super(scene, x, y, font, text, size, align);
    this.i18nKey = text;
    this.scene.i18n
      ? this.prepare()
      : this.scene.events.once(Phaser.Scenes.Events.CREATE, this.prepare, this);
  }

  protected prepare(): void {
    this.i18n = this.scene.i18n;
    this.setText(this.i18nKey, this.i18nOptions);
    this.i18n.on(
      I18nPlugin.LANGUAGE_CHANGED_EVENT,
      this.onLanguageChange,
      this,
    );
  }

  protected onLanguageChange(): void {
    this.emit(I18nPlugin.LANGUAGE_CHANGED_EVENT);
    this.setText();
  }

  public setText(
    value: string = this.i18nKey,
    options: any = this.i18nOptions,
  ): this {
    this.i18nKey = value;
    this.i18nOptions = options;
    const newFont: string = this.i18n
      ? this.i18n.getBitmapFont(this.font)
      : null;
    !!newFont && this.setFont(newFont);
    return value
      ? this.i18n
        ? super.setText(this.i18n.translate(this.i18nKey, this.i18nOptions))
        : super.setText(value)
      : this;
  }

  public destroy(fromScene?: boolean): void {
    this.i18n.off(
      I18nPlugin.LANGUAGE_CHANGED_EVENT,
      this.onLanguageChange,
      this,
    );
    super.destroy(fromScene);
  }
}
