import ExtendedBitmapText from "../extensions/ExtendedBitmapText";
import ExtendedDynamicBitmapText from "../extensions/ExtendedDynamicBitmapText";
import ExtendedText from "../extensions/ExtendedText";

export function addExtendedTextGameObjects(game: Phaser.Game): void {
  game.plugins.registerGameObject(
    'extText',
    ExtendedText.Factory,
    ExtendedText.Creator,
  );
  game.plugins.registerGameObject(
    'extBitmapText',
    ExtendedBitmapText.Factory,
    ExtendedBitmapText.Creator,
  );
  game.plugins.registerGameObject(
    'extDynamicBitmapText',
    ExtendedDynamicBitmapText.Factory,
    ExtendedDynamicBitmapText.Creator,
  );
}