import { Point, Graphics } from "pixi.js";

export const WALKABLE_AREA_POINTS = [
  [
    new Point(470, 580), // upper left corner (x, y)
    new Point(880, 580), // upper right corner (x, y)
    new Point(1300, 800), // bottom right corner (x, y)
    new Point(200, 800), // bottom left corner (x, y)
  ],
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
      walkableArea.fill(index === 0 ? 0x00ff00 : 0xffffff);
      walkableArea.poly(flatPoints);
      walkableArea.visible = true;
      app.mainScene.addChild(walkableArea);

      // store the created area
      walkableAreasInstances.push(walkableArea);
    });
  }

  return walkableAreasInstances;
};