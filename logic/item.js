import * as PIXI from "pixi.js";
import { GlowFilter } from "@pixi/filter-glow";

/**
 * Class to create items
 */
class Item {
  /**
   * @costructor Creates an item from image and sets it coordinates
   * @param {PIXI.Application} app - Pixi application where the item is placed
   * @param {image} image - image to be used for item sprite
   * @param {number} x - x coordinate where the object is placed in the application
   * @param {number} y - y coordinate where the object is placed in the application
   * @param {boolean} interactable - whether object is interactable or not. Default: false
   * @returns {PIXI.Sprite} - The item object
   */
  constructor(app, image, x, y, interactable = false) {
    this.item = PIXI.Sprite.from(image);
    this.glowEffect = new GlowFilter({
      innerStrength: 0.5,
      outerStrength: 0.5,
      quality: 0.1,
    });
    this.item.x = x * app.renderer.width;
    this.item.y = y * app.renderer.height;
    this.item.zIndex = 1;

    // Anchor to bottom left corner
    this.item.anchor.set(0.5, 1);

    if (interactable) {
      this.item.eventMode = "dynamic";
    } else {
      this.item.eventMode = "static";
    }

    this.item.cursor = "pointer";
    this.item.filters = [this.glowEffect];
    this.item.visible = true;
    app.gameContainer.addChild(this.item);

    return this.item;
  }
}

export default Item;
