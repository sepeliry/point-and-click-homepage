import * as PIXI from "pixi.js";
import mouseholeBackGroundImg from "../resources/images/mousehole_background.png";
import mouseholeImg from "../resources/images/mousehole_placeholder.png";
import back_arrowImg from "../resources/images/back_arrow.png";
import { checkDistance } from "./utils/distanceCheckUtils";
import Player from "./player";
import Item from "./item";

class Mousehole {
  constructor(app, toggleView) {
    // Container for mousehole view

    app.mouseholeContainer.visible = false;

    // Create sprite for mousehole background
    const mouseholeTexture = PIXI.Texture.from(mouseholeBackGroundImg);
    const mouseholeBackground = new PIXI.Sprite(mouseholeTexture);
    mouseholeBackground.width = app.screen.width;
    mouseholeBackground.height = app.screen.height;
    app.mouseholeContainer.addChild(mouseholeBackground);

    // Create sprite for mousehole button
    const backArrowTexture = PIXI.Texture.from(back_arrowImg);
    const mouseholeButton = PIXI.Sprite.from(backArrowTexture);
    mouseholeButton.x = 0.03 * app.mainScene.width;
    mouseholeButton.y = 0.03 * app.mainScene.height;
    mouseholeButton.interactive = true;
    mouseholeButton.cursor = "pointer";
    mouseholeButton.buttonMode = true;
    mouseholeButton.zIndex = 0;
    mouseholeButton.addEventListener("pointertap", toggleView.bind(this, app));
    app.mouseholeContainer.addChild(mouseholeButton);

    // Test object for mousehole
    this.mousehole = new Item(app, mouseholeImg, 0.78, 0.8);
    this.mousehole.height = 50;
    this.mousehole.width = 50;

    mouseholeButton.on("click", (event) => {
      // Define the maximum distance within which the player can interact with the clickable area
      const maxDistance = 200;

      // Call the checkDistance function with appropriate parameters
      checkDistance(Player.player, mouseholeButton, maxDistance, () => {
        toggleView.bind(this, app)();
      });
    });
  }
}

export default Mousehole;
