import * as PIXI from "pixi.js";

class BackButton {
  constructor(app, container, itemData) {
    // Create the sprite using the provided item data
    this.sprite = PIXI.Sprite.from(itemData.image);
    this.sprite.anchor.set(0, 0); // Anchor the sprite at the top-left corner
    this.sprite.x = 20; // Set an initial X margin
    this.sprite.y = 20; // Set an initial Y margin
    this.sprite.zIndex = itemData.zIndex || 1;
    this.sprite.name = itemData.name;
    this.sprite.height = itemData.height;
    this.sprite.width = itemData.width;

    // Interaction and effects
    if (itemData.onInteraction) {
      this.sprite.interactive = true;
      this.sprite.buttonMode = true;
      this.sprite.cursor = "pointer";
      this.sprite.on("pointerdown", itemData.onInteraction(app, this.sprite));
    }

    // Add the sprite to the application stage
    app.stage.addChild(this.sprite);
  }

  adjustPosition() {
    // Always keep the sprite at 20 pixels from the top-left corner
    this.sprite.x = 20;
    this.sprite.y = 20;
  }
}

export default BackButton;
