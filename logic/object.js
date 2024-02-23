import * as PIXI from "pixi.js";
import { GlowFilter } from "@pixi/filter-glow";

/**
 * Class for objects that can be interacted with or be used to open content
 * including popups / etc
 */
class Object {
  /**
   * @constructor Creates the object from image and sets the coordinates
   * @param {PIXI.Application} app - Pixi application where the object is added to
   * @param {image} image - Image to be used for the object sprite
   * @param {number} x - x coordinate where the object is placed in the application
   * @param {number} y - y coordinate where the object is placed in the application
   * @param {object} popup - popup / view that opens when object is clicked
   * @returns {object} - The interactive object created
   */
  constructor(app, image, x, y, popup) {
    this.obj = PIXI.Sprite.from(image);
    this.glowEffect = new GlowFilter({
      innerStrength: 0.5,
      outerStrength: 0.5,
      quality: 0.1,
    });
    this.obj.x = x;
    this.obj.y = y;
    this.obj.eventMode = "static";
    this.obj.cursor = "pointer";
    this.obj.on("pointerdown", () => popup.open(app));
    this.obj.filters = [this.glowEffect];
    app.gameContainer.addChild(this.obj);
    return this.obj;
  }
}

export default Object;
