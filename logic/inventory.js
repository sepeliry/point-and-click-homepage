import * as PIXI from "pixi.js";
import Player from "./player";
/**
 * Class for the player inventory
 */
class Inventory {
  /**
   * @constructor - Creates inventory system and UI and adds it to the game
   * @param {PIXI.Application} app - Application where the inventory is used
   */
  static inventory = null;
  static inventoryUI = null;
  constructor(app) {
    Inventory.inventory = [];
    Inventory.inventoryUI = new PIXI.Container();
    Inventory.inventoryUI.zIndex = 12;
    Inventory.inventoryUI.position.set(100, app.renderer.height - 60);
    app.stage.addChild(Inventory.inventoryUI);
  }

  // Displays the inventory UI
  static updateInventoryUI() {
    // Clear the existing inventory UI
    Inventory.inventoryUI.removeChildren();
    Inventory.itemSize = 50;
    for (let i = 0; i < Inventory.inventory.length; i++) {
      const inventoryItem = PIXI.Sprite.from(Inventory.inventory[i].texture);
      inventoryItem.width = Inventory.itemSize;
      inventoryItem.height = Inventory.itemSize;
      inventoryItem.x = i * (Inventory.itemSize + 10);
      Inventory.inventoryUI.addChild(inventoryItem);
    }
  }
}

export default Inventory;
