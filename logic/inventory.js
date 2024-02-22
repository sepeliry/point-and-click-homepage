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
  constructor(app) {
    this.inventory = [];
    this.inventoryUI = new PIXI.Container();
    this.inventoryUI.position.set(0, app.screen.height - 60); // Adjust as needed
    app.stage.addChild(this.inventoryUI);
  }
  /**
   *
   * @param {object} item - item object to add to player inventory
   * @param {object} player - player object to whose inventory the item is added
   */
  addToInventory(item, player) {
    // Adds item to inventory, checks for distance and duplicates
    this.distance = Math.abs(item.x - player.player.x);
    if (this.distance < 100) {
      if (!this.inventory.includes(item)) {
        console.log("Item collected!");
        this.inventory.push(item);
        item.visible = false;
        item.eventMode = "none";
        this.updateInventoryUI();
      }
    }
  }
  // Displays the inventory UI
  updateInventoryUI() {
    // Clear the existing inventory UI
    this.inventoryUI.removeChildren();
    this.itemSize = 50;
    for (let i = 0; i < this.inventory.length; i++) {
      this.inventoryItem = PIXI.Sprite.from(this.inventory[i].texture);
      this.inventoryItem.width = this.itemSize;
      this.inventoryItem.height = this.itemSize;
      this.inventoryItem.x = i * (this.itemSize + 10);
      this.inventoryUI.addChild(this.inventoryItem);
    }
  }
}

export default Inventory;
