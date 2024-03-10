import * as PIXI from "pixi.js";
import { GlowFilter } from "@pixi/filter-glow";

/**
 * Class to create items
 * TODO: Parameter to choose if item is interactable
 */
class Item {
  /**
   * @costructor Creates an item from image and sets it coordinates
   * @param {PIXI.Application} app - Pixi application where the item is placed
   * @param {image} image - image to be used for item sprite
   * @param {number} x - x coordinate where the object is placed in the application
   * @param {number} y - y coordinate where the object is placed in the application
   * @returns {PIXI.Sprite} - The item object
   */
  constructor(app, image, x, y) {
    this.item = PIXI.Sprite.from(image);
    this.glowEffect = new GlowFilter({
      innerStrength: 0.5,
      outerStrength: 0.5,
      quality: 0.1,
    });
    this.item.x = x;
    this.item.y = y;
    this.item.zIndex = 1;

    this.item.eventMode = "static";
    this.item.cursor = "pointer";
    this.item.filters = [this.glowEffect];
    this.item.visible = true;
    app.gameContainer.addChild(this.item);
    return this.item;
  }
}

export default Item;
