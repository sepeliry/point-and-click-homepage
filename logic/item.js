import * as PIXI from 'pixi.js';
import { GlowFilter } from "@pixi/filter-glow";

// Items player can pick up
class Item {

    constructor(app, image, x, y) {
        this.item = PIXI.Sprite.from(image);
        this.glowEffect = new GlowFilter({ innerStrength: 0.5, outerStrength: 0.5, quality: 0.1 });
        this.item.x = x;
        this.item.y = y;
        this.item.eventMode = "static";
        this.item.cursor = "pointer";
        this.item.filters = [this.glowEffect];
        this.item.visible = true;
        app.stage.addChild(this.item);
        return this.item;
    }
}

export default Item;

