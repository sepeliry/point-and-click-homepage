import * as PIXI from 'pixi.js';
import backgroundImg from "../images/background_placeholder.png";

class UI {
    constructor(app) {
        // Create background sprite
        const backgroundTexture = PIXI.Texture.from(backgroundImg);
        const background = new PIXI.Sprite(backgroundTexture);
        background.width = app.screen.width;
        background.height = app.screen.height;
        app.stage.addChild(background);
    }
}

export default UI;