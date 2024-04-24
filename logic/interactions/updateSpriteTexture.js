import { Sprite, Texture, Assets } from "pixi.js";

/**
 *
 * @param {Sprite} sprite
 * @param {string} newTexturePath
 * @returns
 */
async function updateSpriteTexture(sprite, newTexturePath) {
  if (!(sprite instanceof Sprite)) {
    console.error("Provided item is not an instance of Sprite");
    return;
  }

  await Assets.load(newTexturePath);
  const texture = Texture.from(newTexturePath);

  sprite.texture = texture; // Update the texture once it's loaded
  sprite.texture.update(); // This forces an update if necessary
}

export default updateSpriteTexture;
