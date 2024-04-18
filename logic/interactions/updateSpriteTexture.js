import { Sprite, Texture } from "pixi.js";

/**
 *
 * @param {Sprite} sprite
 * @param {string} newTexturePath
 * @returns
 */
function updateSpriteTexture(sprite, newTexturePath) {
  if (!(sprite instanceof Sprite)) {
    console.error("Provided item is not an instance of Sprite");
    return;
  }

  const texture = Texture.from(newTexturePath);

  // Check if the texture is already loaded
  if (texture.baseTexture.valid) {
    sprite.texture = texture;
  } else {
    // If the texture is not loaded yet, listen for the 'loaded' event
    texture.baseTexture.once("loaded", () => {
      sprite.texture = texture; // Update the texture once it's loaded
      sprite.texture.update(); // This forces an update if necessary
    });
  }
}

export default updateSpriteTexture;
