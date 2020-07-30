import I18nPlugin from '../plugin/I18nPlugin';
import {
  ExtendedTextConfig,
  I18nScene,
  I18nSceneInterface,
} from './Interfaces';

export default class ExtendedText extends Phaser.GameObjects.Text {
  public static Creator(
    options: ExtendedTextConfig,
    addToScene: boolean = false,
  ): ExtendedText {
    const gameObject: ExtendedText = new ExtendedText(
      // @ts-ignore
      this.scene,
      options.x,
      options.y,
      options.text,
      options.style,
      options.i18nOptions,
    );
    // @ts-ignore
    addToScene && this.scene.add.existing(gameObject);
    return gameObject;
  }

  public static Factory(
    x: number,
    y: number,
    text: string,
    style: any,
    i18nOptions: any,
  ): ExtendedText {
    const gameObject: ExtendedText = new ExtendedText(
      // @ts-ignore
      this.scene,
      x,
      y,
      text,
      style,
      i18nOptions,
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
    text: string,
    style: any,
    protected i18nOptions: any,
  ) {
    super(scene, x, y, text || ' ', style);
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
  ): Phaser.GameObjects.Text {
    this.i18nKey = value;
    this.i18nOptions = options;
    const newFont: string = this.i18n
      ? this.i18n.getFont(this.style.fontFamily)
      : null;
    !!newFont && this.setFontFamily(newFont);
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
