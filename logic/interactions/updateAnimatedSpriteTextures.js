import { Texture, AnimatedSprite } from "pixi.js";

/**
 * Updates the textures of an animated sprite based on provided frame identifiers.
 * It sets the animation speed and loop properties, and ensures textures are loaded before applying.
 *
 * @param {AnimatedSprite} animatedSprite - The animated sprite to update
 * @param {Array<string>} frameIdentifiers - An array of image paths for the animation frames
 * @param {number} animationSpeed - The speed at which the animation should play
 * @param {boolean} loop - whether the animation should loop.
 */
function updateAnimatedSpriteTextures(
  animatedSprite,
  frameIdentifiers,
  animationSpeed,
  loop
) {
  const newTextures = frameIdentifiers.map((frame) => Texture.from(frame));

  const areTexturesLoaded = newTextures.every(
    (texture) => texture.baseTexture.valid
  );

  function applyTextures() {
    animatedSprite.textures = newTextures;
    animatedSprite.animationSpeed = animationSpeed;
    animatedSprite.loop = loop;

    if (loop) {
      animatedSprite.play();
    } else {
      animatedSprite.gotoAndPlay(0);
    }
  }

  if (areTexturesLoaded) {
    applyTextures();
  } else {
    // wait for textures to load
    newTextures.forEach((texture) => {
      texture.baseTexture.on("loaded", applyTextures);
    });
  }
}

export default updateAnimatedSpriteTextures;
