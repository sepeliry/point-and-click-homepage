import {
  Application,
  Container,
  Graphics,
  Sprite,
  Point,
  Polygon,
  Assets,
  Ticker,
} from "pixi.js";
import { playerCollides, directionFunctions } from "./collisionUtils";
import Player from "./player";
import { ASPECT_RATIO } from "../constants/constants.js";
import UI from "./UI";
import Popup from "./popup.js";
import { setupPdf } from "./utils/pdfUtils.js";
import { resizeGame } from "./utils/resize.js";
import { followPlayer, updateCamera } from "./utils/cameraUtils.js";
import gameState, { addObserver } from "../data/gameState.js";
import { WALKABLE_AREA_POINTS, createWalkableAreas } from "./walkableArea.js";
import openPopup from "./interactions/openPopup.js";
import { glowFilter } from "./utils/glowFilter.js";
import fadeOutLoadingScreen from "./utils/fadeOutLoadingScreen.js";

// Fonts
import VCR_OSD_MONO from "url:../resources/fonts/VCR_OSD_MONO.ttf";

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
// isMobile = true enables the cameraContainer
window.isMobile = windowWidth <= 800;

const app = new Application();

(async () => {
  await app.init({
    width: window.isMobile ? Math.min(windowWidth, 1400) : 1400,
    height: window.isMobile ? Math.min(windowHeight, 800) : 800,
    backgroundColor: 0xaaaaaa,
  });

  const container = document.getElementById("game-container");

  container.appendChild(app.canvas);

  const parent = app.canvas.parentNode;
  let newWidth = parent.clientWidth;
  let newHeight = parent.clientHeight;
  let parentAspectRatio = newWidth / newHeight;
  let gameAspectRatio = 1400 / 800;

  if (parentAspectRatio < gameAspectRatio) {
    newWidth = newHeight * gameAspectRatio;
  } else {
    newHeight = newWidth / gameAspectRatio;
  }

  app.renderer.resize(newWidth, newHeight);

  globalThis.__PIXI_APP__ = app;

  // Add font files to the bundle
  Assets.addBundle("fonts", [{ alias: "VCR_OSD_MONO", src: VCR_OSD_MONO }]);
  await Assets.loadBundle("fonts");

  document.getElementById("hide-wiki-content").addEventListener("click", () => {
    document.getElementById("wiki-wrapper").style.display = "none";
  });

  document.getElementById("hide-article-img").addEventListener("click", () => {
    document.getElementById("article-img-container").style.display = "none";
  });

  await Assets.loadBundle("Assets", (progress) => {
    console.log(progress);
  });

  // Construct contents in canvas
  const ui = new UI(app);
  await ui.initialize();

  await Player.initialize(app);

  // this function should be run when the state changes (called from gameState.js)
  function onGameStateChange(property, newValue, oldValue) {
    console.log(`State "${property}" changed from ${oldValue} to ${newValue}`);

    // loop through every item in every scene and check if they have onStateChange logic
    // loop through every item in every scene and check if they have onStateChange logic
    Object.entries(app.scenes).forEach(([sceneName, sceneData]) => {
      if (sceneData.children) {
        const childrenCopy = [...sceneData.children]; // Shallow copy of the children array

        const sceneBackground = childrenCopy[0];

        if (sceneBackground.onStateChange) {
          sceneBackground.onStateChange(app, sceneBackground);
        }

        childrenCopy.forEach((item) => {
          if (!item.onStateChange) {
            return;
          }
          item.onStateChange(app, item);
        });
      }
    });
  }
  // add onStateChange as an observer for gameState so it is run every time the gameState changes
  addObserver(onGameStateChange);

  function getItemAtPosition(position, item) {
    console.log(item);
    // Check if the click is on the item. Ensure item is visible to not block movement after item is picked
    if (
      item instanceof Sprite &&
      item.getBounds().rectangle.contains(position.x, position.y) &&
      item.visible
    ) {
      return item;
    }
    return null;
  }

  function projectPointOntoLineSegment(px, py, ax, ay, bx, by) {
    let axPx = px - ax;
    let axPy = py - ay;
    let abx = bx - ax;
    let aby = by - ay;

    let abDotAp = axPx * abx + axPy * aby;
    let abLenSquared = abx * abx + aby * aby;
    let t = abDotAp / abLenSquared;
    t = Math.max(0, Math.min(1, t));

    let projX = ax + t * abx;
    let projY = ay + t * aby;

    return new Point(projX, projY);
  }

  let targetPosition;
  const walkableAreas = createWalkableAreas(app);
  // Handle click event on the stage
  app.mainScene.eventMode = "static"; // Enable interaction
  app.mainScene.on("pointertap", (event) => {
    const clickedItem = getItemAtPosition(event.global, event.target);
    const localPosition = app.mainScene.toLocal(event.global);
    const yCoordinate = localPosition.y > 603 ? localPosition.y : 602;
    // const targetPosition =
    Player.player.targetPosition = new Point(localPosition.x, yCoordinate);
    // If a item is not clicked, clear the pending action and checkDistanceParams. (To ensure unecceary actions are not performed)
    if (!clickedItem) {
      console.log("Item was not clicked, empty action");
      Player.player.pendingAction = null;
      Player.player.checkDistanceParams = null;
    }

    let insideAnyWalkableArea = false;
    let closestProjection = null;
    let minDistance = Infinity;

    walkableAreas.forEach((walkableAreaGraphics, areaIndex) => {
      // Since we now need to check against each area's points, we use the areaIndex
      // to reference the corresponding points array from WALKABLE_AREA_POINTS
      const areaPoints = WALKABLE_AREA_POINTS[areaIndex];

      // Convert Graphics to a Polygon to use containsPoint method
      const polygon = new Polygon(areaPoints.map((p) => new Point(p.x, p.y)));

      if (
        polygon.contains(
          Player.player.targetPosition.x,
          Player.player.targetPosition.y
        )
      ) {
        // console.log("inside");
        insideAnyWalkableArea = true;
        return; // If inside any area, we can stop checking further
      } else {
        // console.log("outside");
        // For projection, iterate over the specific area's points
        for (let i = 0; i < areaPoints.length; i++) {
          let start = areaPoints[i];
          let end = areaPoints[(i + 1) % areaPoints.length]; // Wrap to first point

          let projection = projectPointOntoLineSegment(
            Player.player.targetPosition.x,
            Player.player.targetPosition.y,
            start.x,
            start.y,
            end.x,
            end.y
          );

          // Calculate distance from the original target position to the projection
          let distance = Math.sqrt(
            (Player.player.targetPosition.x - projection.x) ** 2 +
              (Player.player.targetPosition.y - projection.y) ** 2
          );

          // Update closest projection if this is the shortest distance found
          if (distance < minDistance) {
            closestProjection = projection;
            minDistance = distance;
          }
        }
      }
    });

    // Handle the case where the target position is not inside any walkable area
    if (!insideAnyWalkableArea && closestProjection) {
      console.log("Mapped to closest projection:", closestProjection);
      Player.player.targetPosition = closestProjection; // Update targetPosition to the projection

      /*
    // add a red dot for the adjusted targetPosition
    let redDot = new Graphics();
    redDot.beginFill(0xff0000);
    redDot.drawCircle(targetPosition.x, targetPosition.y, 5);
    redDot.endFill();
    app.mainScene.addChild(redDot);
    */
    }

    /*
  // check for object collision
  for (const object of UI.solidObjects) {
    const bounds = object.getBounds();
    const itemBounds = {
      name: object.name,
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: bounds.height,
    };

    if (
      simplifiedLineIntersectsRect(
        Player.player.position,
        targetPosition,
        itemBounds
      )
    ) {
      console.log(`Path blocked by ${object.name}`);

      // Adjust targetPosition here. This logic will depend on your specific game's needs.
      // Example: Adjust targetPosition to stop in front of the object.
      // You may want to refine how you adjust targetPosition based on the object's position and size.

      // Calculate direction vector from player to target
      let dir = {
        x: targetPosition.x - Player.player.position.x,
        y: targetPosition.y - Player.player.position.y,
      };

      // Normalize the direction vector
      let magnitude = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
      dir.x /= magnitude;
      dir.y /= magnitude;

      // Determine which edge of the object is closest to the line of movement
      // Assume we want to stop a small distance away from the object (e.g., 5 pixels)
      let buffer = 5; // Distance from the object's edge

      // Simple heuristic: check direction to decide which side of the object to target
      if (Math.abs(dir.x) > Math.abs(dir.y)) {
        // Movement is more horizontal
        if (dir.x > 0) {
          // Moving right; target the left edge of the object
          targetPosition.x = itemBounds.x - buffer;
        } else {
          // Moving left; target the right edge of the object
          targetPosition.x = itemBounds.x + itemBounds.width + buffer;
        }
      } else {
        // Movement is more vertical
        if (dir.y > 0) {
          // Moving down; target the top edge of the object
          targetPosition.y = itemBounds.y - buffer;
        } else {
          // Moving up; target the bottom edge of the object
          targetPosition.y = itemBounds.y + itemBounds.height + buffer;
        }
      }

      break; // Optional: break if you only care about the first intersection
    }

  }
  */
  });

  function simplifiedLineIntersectsRect(playerPosition, targetPosition, rect) {
    // Find min and max X, Y for the line segment
    const minX = Math.min(playerPosition.x, targetPosition.x);
    const maxX = Math.max(playerPosition.x, targetPosition.x);
    const minY = Math.min(playerPosition.y, targetPosition.y);
    const maxY = Math.max(playerPosition.y, targetPosition.y);

    // Check if the bounding box of the line segment intersects with the rect
    const intersects = !(
      maxX < rect.x ||
      minX > rect.x + rect.width ||
      maxY < rect.y ||
      minY > rect.y + rect.height
    );

    return intersects;
  }

  let count = 0;
  let delayFinished = false;
  let delayDuration = 30000; // 30 seconds
  let glowStrength = 0;

  fadeOutLoadingScreen();

  // Main game loop which runs every frame
  Ticker.shared.add((ticker) => {
    // Glow filter starts after 30 second delay from game load
    if (!delayFinished) {
      if (count * 16.67 >= delayDuration) {
        delayFinished = true;
        count = 0;
      } else {
        count += ticker.deltaTime;
      }
    } else {
      count += 0.015;
      if (glowStrength < 1) {
        glowStrength += 0.015; // Adjust the rate of increase as needed
      }
      const glowAmount = Math.cos(count);
      glowFilter.outerStrength = 2 * glowAmount * glowStrength;
    }

    if (Player.player.targetPosition) {
      const distance = Math.sqrt(
        Math.pow(Player.player.x - Player.player.targetPosition.x, 2) +
          Math.pow(Player.player.y - Player.player.targetPosition.y, 2)
      );

      if (distance < 3) {
        Player.player.targetPosition = null;
        Player.setIdle();
        //console.log(distance);
      } else {
        Player.move(Player.player.targetPosition, UI.solidObjects);
        // followPlayer(app, app.cameraContainer, Player.player);
        // app.mainScene.updateTransform();
      }
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    // resize to window size
    // followPlayer(app, app.cameraContainer, Player.player);
    resizeGame(app, app.mainScene);
    openPopup(app, "Tervetuloa Sepeli ry:n kotisivuille :>");
  });

  window.addEventListener("resize", () => {
    for (let sceneName in app.scenes) {
      resizeGame(app, app.scenes[sceneName]);
    }
  });

  document.addEventListener("fullscreenchange", () => {
    for (let sceneName in app.scenes) {
      resizeGame(app, app.scenes[sceneName]);
    }
  });

  // window.addEventListener("resize", () => resizeGame(app, app.pdfContainer));
  // }
  // setupPdf(app, app.mainScene);
})();
