import { Point, Graphics } from "pixi.js";

export const WALKABLE_AREA_POINTS = [
  [
    new Point(500, window.innerHeight / 1.4), // upper left corner (x, y)
    new Point(1100, window.innerHeight / 1.4), // upper right corner (x, y)
    new Point(1450, window.innerHeight - 20), // bottom right corner (x, y)
    new Point(250, window.innerHeight - 20), // bottom left corner (x, y)
  ],
  /*
  [
    new Point(370, 570), // upper left corner (x, y)
    new Point(450, 570), // upper right corner (x, y)
    new Point(370, 640), // bottom right corner (x, y)
    new Point(300, 640), // bottom left corner (x, y)
  ],
  [
    new Point(950, 570), // upper left corner (x, y)
    new Point(1050, 570), // upper right corner (x, y)
    new Point(1100, 600), // bottom right corner (x, y)
    new Point(997, 600), // bottom left corner (x, y)
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
