import {
  I18nPlguinTextExtension,
  setText,
  setTextInterpolations,
} from '../interfaces/TextExtensions';

function applyMixins(): void {
  applyPropertyChanges('Text');
  applyPropertyChanges('BitmapText');
  applyPropertyChanges('DynamicBitmapText');
}

function applyPropertyChanges(Name: string): void {
  const targetClass: any = (Phaser.GameObjects as any)[Name];
  Object.defineProperty(
    targetClass.prototype,
    'nativeSetText',
    targetClass.prototype.setText,
  );
  Object.defineProperty(targetClass.prototype, 'setText', setText);
  Object.defineProperty(
    targetClass.prototype,
    'setTextInterpolations',
    setTextInterpolations,
  );
  Object.defineProperty(targetClass.prototype, '_i18nKey', '');
  Object.defineProperty(targetClass.prototype, '_interpolations', null);
  const name: string = Name.toLowerCase();
  // creator function change
  const creator: any = Phaser.GameObjects.GameObjectCreator;
  const targetClassNativeCreator = creator.prototype[name];
  delete creator.prototype[name];
  Object.defineProperty(
    creator.prototype,
    `_${name}`,
    targetClassNativeCreator,
  );
  Object.defineProperty(creator.prototype, name, function<T>(
    config: any,
    addToScene?: boolean,
  ): T & I18nPlguinTextExtension {
    const gameObject: T & I18nPlguinTextExtension = this.scene.make[`_${name}`](
      config,
      addToScene,
    );
    (gameObject as any)._interpolations = config.interpolations;
    (gameObject as any).setText();
    return gameObject;
  });
  // factory function change
  const factory: any = Phaser.GameObjects.GameObjectFactory;
  const targetClassNativeFactory = factory.prototype[name];
  delete factory.prototype[name];
  Object.defineProperty(
    factory.prototype,
    `_${name}`,
    targetClassNativeFactory,
  );
  Object.defineProperty(factory.prototype, name, function<T>(
    ...args: any[]
  ): T & I18nPlguinTextExtension {
    const gameObject: T & I18nPlguinTextExtension = this.scene.add[`_${name}`](
      ...args,
    );
    (gameObject as any)._interpolations = args[args.length - 1](
      gameObject as any,
    ).setText();
    return gameObject;
  });
}

export default applyMixins;
