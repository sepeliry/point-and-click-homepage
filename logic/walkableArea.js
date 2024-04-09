import * as PIXI from "pixi.js";

let walkableAreaInstance = null;

export const walkableAreaPoints = [
  new PIXI.Point(350, 570), // upper left corner (x, y)
  new PIXI.Point(950, 570), // upper right corner (x, y)
  new PIXI.Point(1300, 800), // bottom right corner (x, y)
  new PIXI.Point(100, 800), // bottom left corner (x, y)
];

export const getWalkableArea = (app) => {
  if (!walkableAreaInstance && app) {
    const walkableArea = new PIXI.Graphics();

    walkableArea.beginFill(0x00ff00);
    walkableArea.drawPolygon(walkableAreaPoints);
    walkableArea.endFill();
    // Set visibility based on your needs
    walkableArea.visible = true; // Set to false if you don't want it visible by default
    app.mainScene.addChild(walkableArea);

    walkableAreaInstance = walkableArea;
    console.log("Walkable area created and added to the scene.");
  }

  return walkableAreaInstance;
};
