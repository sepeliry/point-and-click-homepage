import updateSpriteTexture from "../interactions/updateSpriteTexture";
import InventoryUI from "./inventoryUI";

class Inventory {
  constructor(changeCallback) {
    this.items = [];
    this.changeCallback = changeCallback; // Callback to notify gameState of changes
  }

  addItem(itemName, sprite) {
    // Check if the item already exists in the inventory
    const exists = this.items.some((entry) => entry.item === itemName);

    // Only add the item if it does not already exist
    if (!exists) {
      this.items.push({ item: itemName, sprite });
      InventoryUI.updateInventoryUI();
      this.changeCallback();
    } else {
      console.log("Item already exists in the inventory.");
    }
  }

  removeItem(itemName) {
    const index = this.items.findIndex((entry) => entry.item === itemName);
    if (index > -1) {
      this.items.splice(index, 1);
      InventoryUI.updateInventoryUI();
      this.changeCallback();
    } else {
      throw new Error("Item not found in inventory");
    }
  }

  updateItemSprite(item, newTexturePath) {
    updateSpriteTexture(item.sprite, newTexturePath);
    InventoryUI.updateInventoryUI();
  }

  itemExists(itemName) {
    return this.items.some((entry) => entry.item === itemName);
  }

  getItems() {
    return this.items;
  }
  getItem(itemName) {
    const item = this.items.find((entry) => entry.item === itemName);
    return item;
  }
}

export default Inventory;
