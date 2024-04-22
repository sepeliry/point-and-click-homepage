import { Application, Container, Sprite, Text, Assets } from "pixi.js";
import { GlowFilter } from "@pixi/filter-glow";
/**
 * Class to create items
 * TODO: Parameter to choose if item is interactable
 */
class Book {
  /**
   * @costructor Creates an item from image and sets it coordinates
   * @param {Application} app - Pixi application where the item is placed
   * @param {image} image - image to be used for item sprite
   * @param {number} x - x coordinate where the object is placed in the application
   * @param {number} y - y coordinate where the object is placed in the application
   * @returns {Sprite} - The item object
   */
  constructor(
    app,
    container,
    image,
    x,
    y,
    zIndex = 1,
    height,
    width,
    name,
    onInteraction
  ) {
    this.book = Sprite.from(image);
    this.book.x = x * 1400;
    this.book.y = y * 800;
    this.book.visible = true;
    // this.book.width = width;
    // this.book.height = height;
    // Calculate width and height for the books relative to screen size to support mobile screens
    const originalGameWidth = 1400;
    const originalGameHeight = 800;
    const widthRatio = width / originalGameWidth;
    const heightRatio = height / originalGameHeight;
    this.book.width = widthRatio * 1400;
    this.book.height = heightRatio * 800;
    this.book.zIndex = zIndex;

    if (onInteraction) {
      this.book.eventMode = "dynamic";
      this.book.cursor = "pointer";

      this.book.on("pointerdown", onInteraction(app));

      // add glow effect to items with interaction
      this.glowEffect = new GlowFilter({
        innerStrength: 0.7,
        outerStrength: 0.7,
        quality: 0.1,
      });
      // this.book.filters = [this.glowEffect];
    }

    // Create a PIXI.Container to hold the text objects
    this.textContainer = new Container();
    this.textContainer.zIndex = 2;

    // // Calculate a fontsize relative to original fontsize (20) on desktop (1400x800)
    const currentWidth = 1400;
    const currentHeight = 800;
    const ratio = Math.min(
      currentWidth / originalGameWidth,
      currentHeight / originalGameHeight
    );
    //
    const fontSize = 20; //Math.max(20 * ratio, 18);

    // Define the style for the text
    const textStyle = {
      fontFamily: "VCR_OSD_MONO",
      fontSize: fontSize,
      fill: 0xffffff,
      stroke: 0x000000, // Black outline color
      strokeThickness: 4,
    };

    // Calculate the spacing between each character
    const spacingHeightRatio = currentHeight / originalGameHeight;
    const characterSpacing = 11 * spacingHeightRatio;

    // Loop through each character in the text
    for (let i = 0; i < name.length; i++) {
      const character = name[i];

      // Create a PIXI.Text object for the character
      const textObject = new Text(character, textStyle);
      // Rotate the text object vertically
      textObject.rotation = Math.PI / 2;

      // Calculate the position of the text object along the book spine
      const x = this.book.x + this.book.width - 18 * ratio;
      const y = this.book.y + (i + 1.5) * characterSpacing;

      // Set the position of the text object
      textObject.position.set(x, y);

      // Add the text object to the container
      textObject.anchor.set(0.5, 0.5);
      this.textContainer.addChild(textObject);
    }

    // Add the text container to the stage
    container.addChild(this.book);
    container.addChild(this.textContainer);

    return this.book;
  }
}

export default Book;
