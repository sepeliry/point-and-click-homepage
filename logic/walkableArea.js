import { Point, Graphics } from "pixi.js";

export const WALKABLE_AREA_POINTS = [
  [
    new Point(470, 580), // upper left corner (x, y)
    new Point(880, 580), // upper right corner (x, y)
    new Point(1300, 800), // bottom right corner (x, y)
    new Point(200, 800), // bottom left corner (x, y)
  ],
  /*
  [
    new PIXI.Point(370, 570), // upper left corner (x, y)
    new PIXI.Point(450, 570), // upper right corner (x, y)
    new PIXI.Point(370, 640), // bottom right corner (x, y)
    new PIXI.Point(300, 640), // bottom left corner (x, y)
  ],
  [
    new PIXI.Point(950, 570), // upper left corner (x, y)
    new PIXI.Point(1050, 570), // upper right corner (x, y)
    new PIXI.Point(1100, 600), // bottom right corner (x, y)
    new PIXI.Point(997, 600), // bottom left corner (x, y)
  ],
  */
];

let walkableAreasInstances = [];

export const createWalkableAreas = (app) => {
  if (walkableAreasInstances.length === 0 && app) {
    WALKABLE_AREA_POINTS.forEach((areaPoints, index) => {
      // convert each PIXI.Point to a format suitable for drawPolygon (array of numbers)
      const flatPoints = areaPoints.reduce(
        (acc, point) => acc.concat([point.x, point.y]),
        []
      );

      const walkableArea = new Graphics();
      walkableArea.beginFill(index === 0 ? 0x00ff00 : 0xffffff);
      walkableArea.drawPolygon(flatPoints);
      walkableArea.endFill();
      walkableArea.visible = false;
      app.mainScene.addChild(walkableArea);

      // store the created area
      walkableAreasInstances.push(walkableArea);
    });
  }

  return walkableAreasInstances;
};
