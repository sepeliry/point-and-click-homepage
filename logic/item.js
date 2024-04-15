import * as PIXI from "pixi.js";
import { GlowFilter } from "@pixi/filter-glow";

class Item {
  constructor(
    app,
    container,
    itemData // Pass itemData as a single parameter to handle both static and animated items
  ) {
    // check if the item should be animated or not
    if (itemData.animation) {
      // create an animated sprite
      const textures = itemData.animation.frames.map((frame) =>
        PIXI.Texture.from(frame)
      );
      this.sprite = new PIXI.AnimatedSprite(textures);

      this.sprite.animationSpeed = itemData.animation.animationSpeed || 0.02;
      this.sprite.loop =
        itemData.animation.loop !== undefined ? itemData.animation.loop : true;

      // play the animation only if there are more than 1 frames
      if (itemData.animation.frames.length > 1) {
        this.sprite.play();
      }
    } else {
      // if the item has no animation, create a static sprite
      this.sprite = PIXI.Sprite.from(itemData.image);
    }

    // common properties for both static and animated sprites
    this.initializeSprite(app, container, itemData);
  }

  initializeSprite(app, container, itemData) {
    this.sprite.x = itemData.location.x * 1400;
    this.sprite.y = itemData.location.y * 800;
    this.sprite.zIndex = itemData.zIndex || 1;
    this.sprite.name = itemData.name;
    this.sprite.height = itemData.height;
    this.sprite.width = itemData.width;
    this.sprite.anchor.set(0.5, 1); // Anchor to bottom left corner

    this.sprite.onStateChange = itemData.onStateChange;

    // Check if the object has an interaction/callback
    if (itemData.onInteraction) {
      this.sprite.interactive = true;
      this.sprite.buttonMode = true;
      this.sprite.eventMode = "dynamic";
      this.sprite.cursor = "pointer";
      this.sprite.on("pointerdown", itemData.onInteraction(app, this.sprite));

      const glowEffect = new GlowFilter({
        innerStrength: 1,
        outerStrength: 1,
        quality: 0.1,
      });
      // this.sprite.filters = [glowEffect];
    } else {
      this.sprite.interactive = false;
    }

    this.sprite.visible = true;
    // add the item to its container/scene
    container.addChild(this.sprite);
  }
}

export default Item;
