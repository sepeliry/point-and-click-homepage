import * as PIXI from "pixi.js";
import Book from "./book.js";
import { checkDistance } from './utils/distanceCheckUtils.js';
import Player from "./player";
import bookshelfBackgroundImg from "../resources/images/bookshelf2.png";
import back_arrowImg from "../resources/images/back_arrow.png";
import bookImg from "../resources/images/book_placeholder.png";
import bookImg2 from "../resources/images/book2_placeholder.png";
import { CRTFilter } from "@pixi/filter-crt";

class Bookshelf {
    constructor(app, toggleBookshelf) {
        /**
         * @constructor - Creates a Bookshelf instance with books generated on it
         * @param {PIXI.Application} app - The PIXI application
         */

        // Container for bookshelf view
        const bookshelfContainer = new PIXI.Container();
        app.stage.addChild(bookshelfContainer);
        app.bookshelfContainer = bookshelfContainer;
        app.bookshelfContainer.filters = [new CRTFilter()];
        app.bookshelfContainer.visible = false;
        app.bookshelfContainer.sortable = true;

        // Create sprite for bookshelf view
        const bookshelfTexture = PIXI.Texture.from(bookshelfBackgroundImg);
        const bookshelfBackground = new PIXI.Sprite(bookshelfTexture);
        bookshelfBackground.width = app.screen.width;
        bookshelfBackground.height = app.screen.height;
        app.bookshelfContainer.addChild(bookshelfBackground);

        // Back button for bookshelf
        const backArrowTexture = PIXI.Texture.from(back_arrowImg);
        const button = new PIXI.Sprite(backArrowTexture);
        button.x = 0.03 * app.gameContainer.width;
        button.y = 0.03 * app.gameContainer.height;
        button.interactive = true;
        button.cursor = "pointer";
        button.buttonMode = true;
        button.addEventListener("click", toggleBookshelf.bind(this, app));
        app.bookshelfContainer.addChild(button);

        // Create clickable area on bookshelf
        const bookshelfMapping = new PIXI.Graphics();
        const width = (12.5 / 100) * app.gameContainer.width;
        const height = (30 / 100) * app.gameContainer.height;
        bookshelfMapping.beginFill(0x00ff00);
        bookshelfMapping.drawRect(0, 0, width, height);
        bookshelfMapping.endFill();
        bookshelfMapping.alpha = 0;
        bookshelfMapping.visible = true;
        bookshelfMapping.x = app.gameContainer.width / 3.72;
        bookshelfMapping.y = app.gameContainer.height / 2.5;
        console.log(bookshelfMapping.x, bookshelfMapping.y);
        bookshelfMapping.interactive = true;
        bookshelfMapping.buttonMode = true;
        bookshelfMapping.cursor = "pointer";
        app.gameContainer.addChild(bookshelfMapping);

        this.books = [];
        this.books.zIndex = 1;
        this.book1 = bookImg;
        this.book2 = bookImg2;
        this.generateBooks(app);

        bookshelfMapping.on("click", (event) => {
            // Define the maximum distance within which the player can interact with the clickable area
            const maxDistance = 350;

            // Call the checkDistance function with appropriate parameters
            checkDistance(Player.player, bookshelfMapping, maxDistance, () => {
                toggleBookshelf.bind(this, app)();
            });
        });
    }

    generateBooks(app) {
        /**
         * Generate books and populate the bookshelf
         * @param {PIXI.Application} app - The PIXI application
         */

        let rowX = 500;
        let rowY = 170;
        let bookNumber = 1;

        /**
         * Yhden hyllyrivin koko on ~556x140 px
         * Hyllyrivin pohjan korkeus on 20px
         * Vasemman reunan x-koordinaatti on 500
         */

        // Populate the entire bookshelf
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 11; j++) {
                // Quick randomization for the book image
                const currentBookImg = bookNumber % Math.floor(Math.random() * 10) === 0 ? this.book2 : this.book1;
                const book = new Book(app, currentBookImg, rowX, rowY, `${bookNumber}`);
                this.books.push(book);
                rowX += 40;
                bookNumber++;
            }
            rowY += 120;
            rowX = 500;
        }
    }
}

export default Bookshelf;
