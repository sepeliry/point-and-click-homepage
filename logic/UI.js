import * as PIXI from "pixi.js";
import backgroundImg from "../resources/images/background_placeholder2.png";
import bookshelfBackgroundImg from "../resources/images/bookshelf.jpg";

class UI {
  constructor(app) {
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
  }

  /*************** WIP ! Fix in post to support more views
   * Rudimentary func to swap view visibility
   */
  toggleViews(app) {
    return () => {
      app.gameContainer.visible = !app.gameContainer.visible;
      app.bookshelfContainer.visible = !app.bookshelfContainer.visible;
    };
  }
}

export default UI;
