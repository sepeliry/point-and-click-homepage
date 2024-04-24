import { Application, Container, Sprite, Text, Assets } from "pixi.js";
import { GlowFilter } from "@pixi/filter-glow";
/**
 * Class to create items
 * TODO: Parameter to choose if item is interactable
 */
class Book {
  static async create(app, container, itemData) {
    const book = new Book(app, container);
    await book.initialize(itemData);
    return book;
  }

  constructor(app, container) {
    this.app = app;
    this.container = container;
    this.textContainer = new Container();
    this.textContainer.zIndex = 2;
  }

  async initialize(itemData) {
    // Load the asset
    await Assets.load([itemData.image]);

    // Create the sprite from the loaded image
    this.book = Sprite.from(itemData.image);
    this.book.x = itemData.location.x * 1400;
    this.book.y = itemData.location.y * 800;
    this.book.visible = true;
    this.book.zIndex = itemData.zIndex;

    const originalGameWidth = 1400;
    const originalGameHeight = 800;
    const widthRatio = itemData.width / originalGameWidth;
    const heightRatio = itemData.height / originalGameHeight;

    this.book.width = widthRatio * 1400;
    this.book.height = heightRatio * 800;

    // Interaction and glow effect setup
    if (itemData.onInteraction) {
      this.book.eventMode = "dynamic";
      this.book.cursor = "pointer";
      this.book.on("pointerdown", itemData.onInteraction(this.app));
      this.glowEffect = new GlowFilter({
        innerStrength: 0.7,
        outerStrength: 0.7,
        quality: 0.1,
      });
      // this.book.filters = [this.glowEffect]; // Uncomment if glow effect should be visible
    }

    this.setupText(itemData, originalGameWidth, originalGameHeight);

    // Add the book and text container to the scene
    this.container.addChild(this.book);
    this.container.addChild(this.textContainer);
  }

  setupText(itemData, originalGameWidth, originalGameHeight) {
    const currentWidth = 1400;
    const currentHeight = 800;
    const ratio = Math.min(
      currentWidth / originalGameWidth,
      currentHeight / originalGameHeight
    );
    const fontSize = 20; // Or Math.max(20 * ratio, 18)

    const characterSpacing = 11 * (currentHeight / originalGameHeight);

    for (let i = 0; i < itemData.name.length; i++) {
      const character = itemData.name[i];
      const textStyle = {
        fontFamily: "VCR_OSD_MONO",
        fontSize: fontSize,
        fill: 0xffffff,
        stroke: 0x000000,
        strokeThickness: 4,
      };
      const textObject = new Text({ text: character, style: textStyle });
      textObject.rotation = Math.PI / 2;
      const x = this.book.x + this.book.width - 18 * ratio;
      const y = this.book.y + (i + 1.5) * characterSpacing;
      textObject.position.set(x, y);
      textObject.anchor.set(0.5, 0.5);
      this.textContainer.addChild(textObject);
    }
  }
}

export default Book;
