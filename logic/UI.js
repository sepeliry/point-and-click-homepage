import * as PIXI from "pixi.js";
import backgroundImg from "../resources/images/background.png";
import bookshelfBackgroundImg from "../resources/images/bookshelf.jpg";
import numpadBackgroundImg from "../resources/images/num_pad.png";
import back_arrowImg from "../resources/images/back_arrow.png";

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

    // Back button for bookshelf
    const backArrowTexture = PIXI.Texture.from(back_arrowImg);
    const button = new PIXI.Sprite(backArrowTexture);
    button.x = 0.03 * app.screen.width;
    button.y = 0.03 * app.screen.height;
    button.interactive = true;
    button.cursor = "pointer";
    button.buttonMode = true;
    button.addEventListener("click", this.toggleBookshelf(app));
    app.bookshelfContainer.addChild(button);

    // Create sprite for num pad view
    const numpadTexture = PIXI.Texture.from(numpadBackgroundImg);
    const numpadBackground = new PIXI.Sprite(numpadTexture);
    numpadBackground.width = app.screen.width;
    numpadBackground.height = app.screen.height;
    app.numpadContainer.addChild(numpadBackground);

    // Back button for numpad
    const buttonNumpad = new PIXI.Sprite(backArrowTexture);
    buttonNumpad.x = 0.03 * app.screen.width;
    buttonNumpad.y = 0.03 * app.screen.height;
    buttonNumpad.interactive = true;
    buttonNumpad.cursor = "pointer";
    buttonNumpad.buttonMode = true;
    buttonNumpad.addEventListener("click", this.toggleNumpad(app));
    app.numpadContainer.addChild(buttonNumpad);

    // Create clickable area on bookshelf
    const bookshelfMapping = new PIXI.Graphics();
    const width = (12.5 / 100) * app.screen.width;
    const height = (30 / 100) * app.screen.height;
    bookshelfMapping.beginFill(0x00FF00);
    bookshelfMapping.drawRect(0, 0, width, height);
    bookshelfMapping.endFill();
    bookshelfMapping.alpha = 0;
    bookshelfMapping.visible = true;
    bookshelfMapping.x = app.screen.width / 3.72;
    bookshelfMapping.y = app.screen.height / 2.5;
    bookshelfMapping.interactive = true;
    bookshelfMapping.buttonMode = true;
    bookshelfMapping.cursor = "pointer";
    bookshelfMapping.addEventListener("click", this.toggleBookshelf(app));
    app.gameContainer.addChild(bookshelfMapping);

    // Create clickable area on door numpad
    const numpadMapping = new PIXI.Graphics();
    const w = (2 / 100) * app.screen.width;
    const h = (6 / 100) * app.screen.height;
    numpadMapping.beginFill(0x00FF00);
    numpadMapping.drawRect(0, 0, w, h);
    numpadMapping.endFill();
    numpadMapping.alpha = 0;
    numpadMapping.visible = true;
    numpadMapping.x = app.screen.width / 1.94;
    numpadMapping.y = app.screen.height / 1.87;
    numpadMapping.interactive = true;
    numpadMapping.buttonMode = true;
    numpadMapping.cursor = "pointer";
    numpadMapping.addEventListener("click", this.toggleNumpad(app));
    app.gameContainer.addChild(numpadMapping);
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
