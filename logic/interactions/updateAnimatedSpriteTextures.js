import { Texture, AnimatedSprite, Assets } from "pixi.js";

/**
 * Updates the textures of an animated sprite based on provided frame identifiers.
 * It sets the animation speed and loop properties, and ensures textures are loaded before applying.
 *
 * @param {AnimatedSprite} animatedSprite - The animated sprite to update
 * @param {Array<string>} frameIdentifiers - An array of image paths for the animation frames
 * @param {number} animationSpeed - The speed at which the animation should play
 * @param {boolean} loop - whether the animation should loop.
 */
async function updateAnimatedSpriteTextures(
  animatedSprite,
  frameIdentifiers,
  animationSpeed,
  loop
) {
  if (!(animatedSprite instanceof AnimatedSprite)) {
    console.error("Provided item is not an instance of AnimatedSprite");
    return;
  }
  // Load all textures first
  await Assets.load(frameIdentifiers);

  // Create textures from the loaded resources
  const newTextures = frameIdentifiers.map((frame) => Texture.from(frame));

  animatedSprite.textures = newTextures;
  animatedSprite.animationSpeed = animationSpeed;
  animatedSprite.loop = loop;

  if (loop) {
    animatedSprite.play();
  } else {
    animatedSprite.gotoAndPlay(0);
  }
}

export default updateAnimatedSpriteTextures;
