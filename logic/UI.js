import * as PIXI from "pixi.js";
import backgroundImg from "../resources/images/background.png";
import bookshelfBackgroundImg from "../resources/images/bookshelf2.png";
import mouseholeImg from "../resources/images/mousehole_background.png";
import numpadBackgroundImg from "../resources/images/num_pad.png";
import back_arrowImg from "../resources/images/back_arrow.png";
import { resizeGame } from "./utils/resize";
import { checkDistance } from './utils/distanceCheckUtils.js';
import Player from "./player";

class UI {
  constructor(app) {
    /**
     * @constructor - Creates a UI instance with different view containers and adds background to them
     * @param {PIXI.Application} app - Application where the UI is added to
     */
    // Create background sprite
    const backgroundTexture = PIXI.Texture.from(backgroundImg);
    const background = new PIXI.Sprite(backgroundTexture);
    // background.width = app.screen.width;
    // background.height = app.screen.height;
    background.width = 1400;
    background.height = 800;
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
    button.x = 0.03 * app.gameContainer.width;
    button.y = 0.03 * app.gameContainer.height;
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
    buttonNumpad.x = 0.03 * app.gameContainer.width;
    buttonNumpad.y = 0.03 * app.gameContainer.height;
    buttonNumpad.interactive = true;
    buttonNumpad.cursor = "pointer";
    buttonNumpad.buttonMode = true;
    buttonNumpad.addEventListener("click", this.toggleNumpad(app));
    app.numpadContainer.addChild(buttonNumpad);

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

    // Create clickable area on door numpad
    const numpadMapping = new PIXI.Graphics();
    const w = (2 / 100) * app.gameContainer.width;
    const h = (6 / 100) * app.gameContainer.height;
    numpadMapping.beginFill(0x00ff00);
    numpadMapping.drawRect(0, 0, w, h);
    numpadMapping.endFill();
    numpadMapping.alpha = 0;
    numpadMapping.visible = true;
    numpadMapping.x = app.gameContainer.width / 1.94;
    numpadMapping.y = app.gameContainer.height / 1.87;
    numpadMapping.interactive = true;
    numpadMapping.buttonMode = true;
    numpadMapping.cursor = "pointer";
    app.gameContainer.addChild(numpadMapping);

    // Create sprite for mousehole view
    const mouseholeTexture = PIXI.Texture.from(mouseholeImg);
    const mouseholeBackground = new PIXI.Sprite(mouseholeTexture);
    mouseholeBackground.width = app.screen.width;
    mouseholeBackground.height = app.screen.height;
    app.mouseholeContainer.addChild(mouseholeBackground);
    const mouseholeButton = PIXI.Sprite.from(backArrowTexture);
    mouseholeButton.x = 0.03 * app.gameContainer.width;
    mouseholeButton.y = 0.03 * app.gameContainer.height;
    mouseholeButton.interactive = true;
    mouseholeButton.cursor = "pointer";
    mouseholeButton.buttonMode = true;
    mouseholeButton.zIndex = 0;
    mouseholeButton.addEventListener("click", this.toggleMousehole(app));
    app.mouseholeContainer.addChild(mouseholeButton);

    // Functionality to check for player distance from clickable mapped areas

    bookshelfMapping.on("click", (event) => {
      // Define the maximum distance within which the player can interact with the clickable area
      const maxDistance = 350;

      // Call the checkDistance function with appropriate parameters
      checkDistance(Player.player, bookshelfMapping, maxDistance, () => {
        this.toggleBookshelf(app)();
      });
    });

    numpadMapping.on("click", (event) => {
      // Define the maximum distance within which the player can interact with the clickable area
      const maxDistance = 250;

      // Call the checkDistance function with appropriate parameters
      checkDistance(Player.player, numpadMapping, maxDistance, () => {
        this.toggleNumpad(app)();
      });
    });

    mouseholeButton.on("click", (event) => {
      // Define the maximum distance within which the player can interact with the clickable area
      const maxDistance = 200;

      // Call the checkDistance function with appropriate parameters
      checkDistance(Player.player, mouseholeButton, maxDistance, () => {
        this.toggleMousehole(app)();
      });
    });

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
  toggleMousehole(app) {
    /**
     * Function to toggle visibility of mousehole view
     * @param {PIXI.Application} app - Application where the UI is
     */
    return () => {
      app.gameContainer.visible = !app.gameContainer.visible;
      app.mouseholeContainer.visible = !app.mouseholeContainer.visible;
    };
  }
}

export default UI;
