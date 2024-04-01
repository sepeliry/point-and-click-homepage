import * as PIXI from "pixi.js";

export const createWalkableArea = (app) => {
    // Create walkable area
    const walkableArea = new PIXI.Graphics();
    walkableArea.beginFill(0x00ff00);
    const w = app.screen.width;
    const h = app.screen.height;
    //this.walkableArea.drawPolygon([335, 560, 950, 560, 1400, 800, 100, 801]);
    walkableArea.drawPolygon([
        0.25 * w, 0.7 * h,
        0.7 * w, 0.7 * h,
        1 * w, 1 * h,
        0.1 * w, 1 * h
    ]);
    walkableArea.endFill();
    //this.walkableArea.alpha = 0;
    walkableArea.visible = true;
    return walkableArea;
};