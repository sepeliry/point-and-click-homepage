import { Container, Graphics, Sprite } from "pixi.js";
import gameState from "../../data/gameState";
import openPopup from "../interactions/openPopup";
import Player from "../player";
import Item from "../item";
import { GlowFilter } from "pixi-filters";

class InventoryUI {
  static container = new Container();
  static app = null;

  static initialize(app) {
    this.app = app;
    this.container.x = app.renderer.width - 10;
    this.container.y = 10;
    this.app.stage.addChild(this.container);
  }

  static updateInventoryUI() {
    // Responsive size adjustments based on screen width
    let bgWidth = 80; // Default width
    let bgHeight = 80; // Default height

    if (window.innerWidth <= 800) {
      bgWidth = 60; // Smaller width for medium screens
      bgHeight = 60; // Smaller height for medium screens
    }
    if (window.innerWidth < 500) {
      bgWidth = 40; // Even smaller for small screens
      bgHeight = 40; // Even smaller for small screens
    }

    const items = gameState.inventory.getItems();
    this.container.removeChildren();
    items.forEach((entry, index) => {
      const itemContainer = new Container();

      // Create a new sprite for the item in the inventory
      const itemSprite = new Sprite(entry.sprite.texture);

      // Calculate the scale factor to fit the sprite within the background dimensions
      const scaleX = (bgWidth - 20) / itemSprite.texture.width;
      const scaleY = (bgHeight - 20) / itemSprite.texture.height;
      const scale = Math.min(scaleX, scaleY); // Use the smaller scale factor to ensure fit
      itemSprite.scale.set(scale, scale);

      // After scaling, recalculate the sprite's x and y to center it
      itemSprite.x = (bgWidth - itemSprite.width) / 2; // Center horizontally
      itemSprite.y = (bgHeight - itemSprite.height) / 2; // Center vertically

      const bg = new Graphics();
      bg.rect(0, 0, bgWidth, bgHeight);
      bg.fill({ color: "#020D26", alpha: 0.9 });
      bg.stroke({ width: 2, color: "#F54483" });

      itemContainer.addChild(bg);
      itemContainer.addChild(itemSprite);

      // Adjusting interaction settings
      itemContainer.interactive = true; // Ensuring item is interactive
      itemContainer.buttonMode = true; // Shows pointer on hover
      itemContainer.cursor = "pointer";
      itemContainer.on("pointerdown", () =>
        this.onItemClicked(itemContainer, entry, index)
      );
      this.makeItemDraggable(itemContainer, entry, itemSprite);

      // Set the position of each item container within the main container
      itemContainer.x = -bgWidth; // Reset this if needed to align correctly
      itemContainer.y = index * (bgHeight + 20); // Stack items vertically

      this.container.addChild(itemContainer);
    });
  }

  static onItemClicked(itemContainer, entry, index) {
    console.log(`Item clicked: ${entry.item}, at index: ${index}`);
  }

  static makeItemDraggable(itemContainer, entry, itemSprite) {
    const gameObject = Item.gameObjects.find((obj) => obj.label === entry.item);
    if (!gameObject && !gameObject.draggable) {
      return;
    }
    // Find the dragtarget from gameObjects
    const dragTarget = Item.gameObjects.find(
      (obj) => obj.label === gameObject.dragTargetName
    );
    if (!dragTarget) {
      console.log("Dragtarget not found");
      return;
    }
    const originalFilters = dragTarget.filters;
    const activeGlowEffect = new GlowFilter({
      innerStrength: 0,
      outerStrength: 3,
      quality: 0.1,
      alpha: 0.9,
      color: "c061cb",
    });

    // A rectangle to represent the drag target's bounds
    let dragTargetBounds = dragTarget.getBounds().rectangle;
    const player = Player.player;
    let draggedItem = null;

    const onDragMove = (event) => {
      if (draggedItem) {
        this.app.mainScene.toLocal(
          event.data.global,
          null,
          draggedItem.position
        );
      }
      dragTarget.filters = [activeGlowEffect];
    };

    const onDragEnd = (event) => {
      if (draggedItem) {
        if (
          dragTargetBounds.contains(event.data.global.x, event.data.global.y)
        ) {
          if (checkDistance(dragTarget.getGlobalPosition())) {
            gameObject.onDragSuccess(this.app, dragTarget);
          } else {
            openPopup(this.app, `En aivan ylety ${dragTarget.name}iin.`);
          }
        }
        this.app.mainScene.removeChild(draggedItem);
        draggedItem = null;
        dragTarget.filters = originalFilters;
        // Remove the pointermove event listener from the mainScene
        this.app.mainScene.off("pointermove", onDragMove);
      }
    };

    const onDragStart = (event) => {
      if (this.app.mainScene.visible) {
        draggedItem = new Sprite(itemSprite.texture);
        draggedItem.anchor.set(0.5);
        draggedItem.alpha = 0.6;
        draggedItem.scale.set(itemSprite.scale.x, itemSprite.scale.y);
        draggedItem.interactiveChildren = false;
        draggedItem.eventMode = "none";
        this.app.mainScene.toLocal(
          event.data.global,
          null,
          draggedItem.position
        );
        this.app.mainScene.addChild(draggedItem);

        this.app.mainScene.on("pointermove", onDragMove);
      }
    };

    // Add event listeners to the itemContainer
    itemContainer.on("pointerup", onDragEnd);
    itemContainer.on("pointerupoutside", onDragEnd);
    itemContainer.on("pointerdown", onDragStart);

    // To check if the player is close enough to drag target
    const checkDistance = (dragTargetPosition) => {
      const dragTargetLocalPosition =
        this.app.mainScene.toLocal(dragTargetPosition);
      if (!player || !dragTargetPosition) return;
      const distance = Math.sqrt(
        (player.x - dragTargetLocalPosition.x) ** 2 +
        (player.y - dragTargetLocalPosition.y) ** 2
      );
      const maxDistance = 250;
      return distance <= maxDistance;
    };
  }
}

export default InventoryUI;
