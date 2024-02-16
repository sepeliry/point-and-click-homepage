import * as PIXI from 'pixi.js';
import { GlowFilter } from "@pixi/filter-glow";

// Objects player can interact with
class Object {

    constructor(app, image, x, y, popup) {
        this.obj = PIXI.Sprite.from(image);
        this.glowEffect = new GlowFilter({ innerStrength: 0.5, outerStrength: 0.5, quality: 0.1 });
        this.obj.x = x;
        this.obj.y = y;
        this.obj.eventMode = "static";
        this.obj.cursor = "pointer";
        this.obj.interactive = true;
        this.obj.on("pointerdown", () => popup.open(app, this.obj));
        this.obj.filters = [this.glowEffect];
        app.stage.addChild(this.obj);
        return this.obj;
    }
}

export default Object;

