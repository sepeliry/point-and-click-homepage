import InventoryUI from "./inventoryUI";

class Inventory {
  constructor() {
    this.items = [];
  }

  addItem(itemName, sprite) {
    // Check if the item already exists in the inventory
    const exists = this.items.some((entry) => entry.item === itemName);

    // Only add the item if it does not already exist
    if (!exists) {
      this.items.push({ item: itemName, sprite });
      InventoryUI.updateInventoryUI(); // Update the UI to reflect the new inventory state
    } else {
      console.log("Item already exists in the inventory.");
    }
  }

  removeItem(itemName) {
    const index = this.items.findIndex((entry) => entry.item === itemName);
    if (index > -1) {
      this.items.splice(index, 1);
      InventoryUI.updateInventoryUI(); // Update the UI after item removal
    } else {
      throw new Error("Item not found in inventory");
    }
  }

  itemExists(itemName) {
    return this.items.some((entry) => entry.item === itemName);
  }

  getItems() {
    return this.items;
  }
}

export default Inventory;
