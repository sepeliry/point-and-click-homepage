import * as PIXI from 'pixi.js';
import Player from './player';

class Inventory {
    constructor(app) {
        // Inventory system and UI
        this.inventory = [];
        this.inventoryUI = new PIXI.Container();
        this.inventoryUI.position.set(0, app.screen.height - 60); // Adjust as needed
        app.stage.addChild(this.inventoryUI);
    }

    addToInventory(item, player) {
        // Adds item to inventory, checks for distance and duplicates
        this.distance = Math.abs(item.x - player.player.x);
        // console.log(item.x + " " + player.player.x + " " + this.distance);
        // Player can't teleport
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
    updateInventoryUI() {
        // Displays collected items in inventory
        // Clear the existing inventory UI
        this.inventoryUI.removeChildren();
        this.itemSize = 50;
        for (let i = 0; i < this.inventory.length; i++) {
            this.inventoryItem = PIXI.Sprite.from(this.inventory[i].texture);
            this.inventoryItem.width = this.itemSize;
            this.inventoryItem.height = this.itemSize;
            this.inventoryItem.x = i * (this.itemSize + 10); // Adjust spacing
            this.inventoryUI.addChild(this.inventoryItem);
        }
    }
}

export default Inventory;