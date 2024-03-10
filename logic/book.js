import * as PIXI from "pixi.js";
import { GlowFilter } from "@pixi/filter-glow";

/**
 * Class to create items
 * TODO: Parameter to choose if item is interactable
 */
class Book {
    /**
     * @costructor Creates an item from image and sets it coordinates
     * @param {PIXI.Application} app - Pixi application where the item is placed
     * @param {image} image - image to be used for item sprite
     * @param {number} x - x coordinate where the object is placed in the application
     * @param {number} y - y coordinate where the object is placed in the application
     * @returns {PIXI.Sprite} - The item object
     */
    constructor(app, image, x, y, topic) {
        this.book = PIXI.Sprite.from(image);
        this.glowEffect = new GlowFilter({
            innerStrength: 0.7,
            outerStrength: 0.7,
            quality: 0.1,
        });
        this.book.x = x;
        this.book.y = y;
        this.book.eventMode = "static";
        this.book.cursor = "pointer";
        this.book.filters = [this.glowEffect];
        this.book.visible = true;

        // Set book topic to show on the book spine
        this.text = topic;

        // Create a PIXI.Container to hold the text objects
        this.textContainer = new PIXI.Container();

        // Define the style for the text
        const textStyle = {
            fontFamily: 'Consolas',
            fontSize: 18,
            fill: 0xFFFFFF,
            stroke: 0x000000, // Black outline color
            strokeThickness: 2,
        };

        // Calculate the spacing between each character
        const characterSpacing = 13;

        // Loop through each character in the text
        for (let i = 0; i < topic.length; i++) {
            const character = topic[i];

            // Create a PIXI.Text object for the character
            const textObject = new PIXI.Text(character, textStyle);
            // Rotate the text object vertically
            textObject.rotation = Math.PI / 2;

            // Calculate the position of the text object along the book spine
            const x = this.book.x + this.book.width + 15;
            const y = this.book.y + (i + 1) * characterSpacing;

            // Set the position of the text object
            textObject.position.set(x, y);

            // Add the text object to the container
            textObject.anchor.set(0.5, 0.5);
            this.textContainer.addChild(textObject);
        }

        // Add the text container to the stage
        app.bookshelfContainer.addChild(this.book);
        app.bookshelfContainer.addChild(this.textContainer);

        return this.book;
    }
}

export default Book;
