import * as PIXI from "pixi.js";
import backgroundImg from "../resources/images/background.png";
import bookshelfBackgroundImg from "../resources/images/bookshelf.jpg";
import numpadBackgroundImg from "../resources/images/num_pad.png";

class UI {
  constructor(app) {
    /**
     * @constructor - Creates a UI instance with different view containers and adds background to them
     * @param {PIXI.Application} app - Application where the UI is added to
     */
    // Create background sprite
    const backgroundTexture = PIXI.Texture.from(backgroundImg);
    const background = new PIXI.Sprite(backgroundTexture);
    background.width = app.screen.width;
    background.height = app.screen.height;
    app.gameContainer.addChild(background);

    // Create sprite for bookshelf view
    const bookshelfTexture = PIXI.Texture.from(bookshelfBackgroundImg);
    const bookshelfBackground = new PIXI.Sprite(bookshelfTexture);
    bookshelfBackground.width = app.screen.width;
    bookshelfBackground.height = app.screen.height;
    app.bookshelfContainer.addChild(bookshelfBackground);

    // Create sprite for num pad view
    const numpadTexture = PIXI.Texture.from(numpadBackgroundImg);
    const numpadBackground = new PIXI.Sprite(numpadTexture);
    numpadBackground.width = app.screen.width;
    numpadBackground.height = app.screen.height;
    app.numpadContainer.addChild(numpadBackground);
  }

  toggleBookshelf(app) {
    /**
     * Function to toggle visibility of bookshelf view
     * @param {PIXI.Application} app - Application where the UI is
     */
    return () => {
      app.gameContainer.visible = !app.gameContainer.visible;
      app.bookshelfContainer.visible = !app.bookshelfContainer.visible;
    };
  }
  toggleNumpad(app) {
    /**
     * Function to toggle visibility of numpad view
     * @param {PIXI.Application} app - Application where the UI is
     */
    return () => {
      app.gameContainer.visible = !app.gameContainer.visible;
      app.numpadContainer.visible = !app.numpadContainer.visible;
    };
  }
}

export default UI;
