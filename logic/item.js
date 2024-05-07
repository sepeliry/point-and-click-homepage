import { Sprite, Texture, AnimatedSprite, Assets } from "pixi.js";
import { glowFilter } from "./utils/glowFilter";

class Item {
  static gameObjects = [];

  static async create(app, container, itemData) {
    const item = new Item();
    await item.initialize(app, container, itemData);
    return item;
  }

  async initialize(app, container, itemData) {
    try {
      // Check if the item should be animated or not and preload the required assets
      if (itemData.animation) {
        // Preload all frames for animations
        await Assets.load(itemData.animation.frames);

        // After preloading, create textures from the loaded assets
        const textures = itemData.animation.frames.map((frame) =>
          Texture.from(frame)
        );
        this.sprite = new AnimatedSprite(textures);
        this.sprite.animationSpeed = itemData.animation.animationSpeed || 0.02;
        this.sprite.loop =
          itemData.animation.loop !== undefined
            ? itemData.animation.loop
            : true;
        if (itemData.animation.frames.length > 1) {
          this.sprite.play();
        }
      } else {
        // Preload static image
        await Assets.load([itemData.image]);
        this.sprite = Sprite.from(itemData.image);
      }

      // Initialize common sprite properties
      this.initializeSprite(app, container, itemData);
    } catch (error) {
      console.error("Error loading assets:", error);
    }
  }

  initializeSprite(app, container, itemData) {
    this.sprite.x = itemData.location.x * 1400;
    this.sprite.y = itemData.location.y * 800;
    this.sprite.zIndex = itemData.zIndex || 0;
    this.sprite.label = itemData.name;
    this.sprite.height = itemData.height;
    this.sprite.width = itemData.width;
    this.sprite.anchor.set(0.5, 1); // Anchor to bottom left corner
    this.sprite.interactiveChildren = false;
    this.sprite.onStateChange = itemData.onStateChange;
    this.sprite.draggable = itemData.draggable;
    this.sprite.dragTargetName = itemData.dragTargetName;
    this.sprite.onDragSuccess = itemData.onDragSuccess;

    this.sprite.onInventoryInteraction = itemData.onInventoryInteraction;

    // Check if the object has an interaction/callback
    if (itemData.onInteraction) {
      this.sprite.interactive = true;
      this.sprite.buttonMode = true;
      this.sprite.eventMode = "dynamic";
      this.sprite.cursor = "pointer";
      this.sprite.on("pointerdown", itemData.onInteraction(app, this.sprite));
      this.sprite.filters = [glowFilter];
    } else {
      this.sprite.interactive = false;
    }

    this.sprite.visible = itemData.visible;

    // add the item to its container/scene
    container.addChild(this.sprite);
    Item.gameObjects.push(this.sprite);
  }
}

export default Item;
