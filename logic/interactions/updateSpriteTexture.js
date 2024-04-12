import * as PIXI from "pixi.js";

/**
 *
 * @param {PIXI.Sprite} sprite
 * @param {string} newTexturePath
 * @returns
 */
function updateSpriteTexture(sprite, newTexturePath) {
  console.log("Updating texture for sprite:", sprite);

  if (!(sprite instanceof PIXI.Sprite)) {
    console.error("Provided item is not an instance of PIXI.Sprite");
    return;
  }

  const texture = PIXI.Texture.from(newTexturePath);

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
