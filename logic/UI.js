import * as PIXI from "pixi.js";
import backgroundImg from "../resources/images/background_placeholder2.png";
import bookshelfBackgroundImg from "../resources/images/bookshelf.jpg";
import mouseholeImg from "../resources/images/mousehole_background.png";
import backButton from "../resources/images/back_button.png";

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


    // Create sprite for mousehole view
    const mouseholeTexture = PIXI.Texture.from(mouseholeImg);
    const mouseholeBackground = new PIXI.Sprite(mouseholeTexture);
    mouseholeBackground.width = app.screen.width;
    mouseholeBackground.height = app.screen.height;
    app.mouseholeContainer.addChild(mouseholeBackground);
    const button = PIXI.Sprite.from(backButton);
    button.width = 200;
    button.height = 60;
    button.x = 30;
    button.y = 700;
    button.interactive = true;
    button.on('pointerdown', this.toggleViews(app.gameContainer, app.mouseholeContainer));
    app.mouseholeContainer.addChild(button);
  }

  /*************** WIP ! Fix in post to support more views
   * Rudimentary func to swap view visibility
   */
  toggleViews(container1, container2) {
    return () => {
      container1.visible = !container1.visible;
      container2.visible = !container2.visible;
    };
  }
}

export default UI;
