import { Container, Graphics, Sprite } from "pixi.js";
import gameState from "../../data/gameState";

class InventoryUI {
  static container = new Container();
  static app = null;

  static initialize(app) {
    this.app = app;
    this.container.x = this.app.screen.width - 20;
    this.container.y = 20;
    this.app.stage.addChild(this.container);
  }

  static updateInventoryUI() {
    const BG_WIDTH = 80;
    const BG_HEIGHT = 80;

    const items = gameState.inventory.getItems();
    this.container.removeChildren();

    items.forEach((entry, index) => {
      const itemContainer = new Container();

      // create a new sprite for the item in the inventory
      const itemSprite = new Sprite(entry.sprite.texture);

      // Calculate the scale factor to fit the sprite within the background dimensions
      const scaleX = (BG_WIDTH - 20) / itemSprite.texture.width;
      const scaleY = (BG_HEIGHT - 20) / itemSprite.texture.height;
      const scale = Math.min(scaleX, scaleY); // Use the smaller scale factor to ensure fit
      itemSprite.scale.set(scale, scale);

      // After scaling, recalculate the sprite's x and y to center it
      itemSprite.x = (BG_WIDTH - itemSprite.width) / 2; // Center horizontally
      itemSprite.y = (BG_HEIGHT - itemSprite.height) / 2; // Center vertically

      const bg = new Graphics();
      bg.beginFill("#020D26", 0.9);
      bg.lineStyle(2, "#F54483");
      bg.drawRect(0, 0, BG_WIDTH, BG_HEIGHT);
      bg.endFill();

      itemContainer.addChild(bg);
      itemContainer.addChild(itemSprite);

      itemContainer.interactive = true;
      itemContainer.buttonMode = true;
      itemContainer.cursor = "pointer";
      itemContainer.on("pointerdown", () =>
        this.onItemClicked(itemContainer, entry, index)
      );

      // Set the position of each item container within the main container
      itemContainer.x = -BG_WIDTH; // Reset this if needed to align correctly
      itemContainer.y = index * (BG_HEIGHT + 20); // Stack items vertically

      this.container.addChild(itemContainer);
    });
  }

  static onItemClicked(itemContainer, entry, index) {
    console.log(`Item clicked: ${entry.item}, at index: ${index}`);
  }
}

export default InventoryUI;
