import * as PIXI from "pixi.js";
import { GlowFilter } from "@pixi/filter-glow";

/**
 * Class to create items
 */
class Item {
  /**
   * @costructor Creates an item from image and sets it coordinates
   * @param {PIXI.Application} app - Pixi application where the item is placed
   * @param {PIXI.Container} container - container/scene to which the object will be added
   * @param {image} image - image to be used for item sprite
   * @param {number} x - x coordinate where the object is placed in the application
   * @param {number} y - y coordinate where the object is placed in the application
   * @param {number} zIndex - z index of the object
   * @param {number} height - height of the object
   * @param {number} width - width of the object
   * @param {string} name - name of the object
   * @param {Function} onInteraction - callback function which will be called when the object is clicked
   * @returns {PIXI.Sprite} - The item object
   */
  constructor(
    app,
    container,
    image,
    x,
    y,
    zIndex = 1,
    height,
    width,
    name,
    onInteraction
  ) {
    this.item = PIXI.Sprite.from(image);
    this.item.x = x * 1400;
    this.item.y = y * 800;
    this.item.zIndex = zIndex;
    this.item.name = name;
    this.item.height = height;
    this.item.width = width;

    // Anchor to bottom left corner
    this.item.anchor.set(0.5, 1);

    // check if the object has an interaction/callback
    if (onInteraction) {
      this.item.eventMode = "dynamic";
      this.item.cursor = "pointer";
      this.item.onInteraction = () => onInteraction(app);
      this.item.on("pointerdown", onInteraction(app));

      // add glow effect to items with interaction
      this.glowEffect = new GlowFilter({
        innerStrength: 1,
        outerStrength: 1,
        quality: 0.1,
      });
      this.item.filters = [this.glowEffect];
    } else {
      this.item.eventMode = "static";
    }

    this.item.visible = true;
    // add object to its container/scene
    container.addChild(this.item);

    return this.item;
  }
}

export default Item;
