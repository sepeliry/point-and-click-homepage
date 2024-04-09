import * as PIXI from "pixi.js";
import { playerCollides, directionFunctions } from "./collisionUtils";
import Player from "./player";
import Inventory from "./inventory";
import UI from "./UI";
import Popup from "./popup.js";
import { setupPdf } from "./utils/pdfUtils.js";
import { resizeGame } from "./utils/resize.js";
import { followPlayer } from "./utils/cameraUtils.js";
import { introTextElements } from "../data/popupTexts.js";
import { walkableAreaPoints, getWalkableArea } from "./walkableArea.js";

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
// isMobile = true enables the cameraContainer
window.isMobile = windowWidth <= 800;
// pending interaction is initially null
let pendingInteraction = null;

// Create application on page load. desktop: 1400x800, mobile: use screensize
const app = new PIXI.Application({
  width: window.isMobile ? Math.min(windowWidth, 1400) : 1400,
  height: window.isMobile ? Math.min(windowHeight, 800) : 800,
  backgroundColor: 0xaaaaaa,
});

globalThis.__PIXI_APP__ = app;
document.getElementById("game-container").appendChild(app.view);

document.getElementById("hide-wiki-content").addEventListener("click", () => {
  document.getElementById("wiki-wrapper").style.display = "none";
});

// Construct contents in canvas
const ui = new UI(app);
const player = new Player(app);
const inventory = new Inventory(app);
const introPopup = new Popup(app, introTextElements);
const walkableArea = getWalkableArea(app);

function getItemAtPosition(position, item) {
  // Check if the click is on the item. Ensure item is visible to not block movement after item is picked
  if (
    item instanceof PIXI.Sprite &&
    item.getBounds().contains(position.x, position.y) &&
    item.visible
  ) {
    return item;
  }
  return null;
}

function checkInteraction(playerPosition, item) {
  // Calculate distance between player and item
  const distance = Math.sqrt(
    Math.pow(playerPosition.x - (item.position.x + item.width), 2) +
      Math.pow(playerPosition.y - item.position.y, 2)
  );

  console.log("check inter", distance);
  // Check if within interaction range
  if (distance <= item.interactionRange) {
    // Trigger interaction
    item.onInteraction();
  }
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

  return new PIXI.Point(projX, projY);
}

let targetPosition;

// Handle click event on the stage
app.mainScene.eventMode = "static"; // Enable interaction
app.mainScene.on("pointertap", (event) => {
  const clickedItem = getItemAtPosition(event.global, event.target);

  const localPosition = app.mainScene.toLocal(event.global);
  const yCoordinate = localPosition.y > 603 ? localPosition.y : 602;
  // targetPosition = new PIXI.Point(localPosition.x, yCoordinate);
  targetPosition = new PIXI.Point(localPosition.x, localPosition.y);
  console.log(targetPosition);
  //console.log(walkableArea);

  // check if target position is in walkable area
  if (walkableArea.containsPoint(targetPosition)) {
    console.log("inside");
  } else {
    console.log("outside");
    // TODO: map targetPosition so that it will be inside walkableArea
    // Implement the logic to find the closest projection onto the walkable area
    let closestProjection = null;
    let minDistance = Infinity;
    for (let i = 0; i < walkableAreaPoints.length; i++) {
      let start = walkableAreaPoints[i];
      let end = walkableAreaPoints[(i + 1) % walkableAreaPoints.length]; // Wrap around to the first point for the last edge

      let projection = projectPointOntoLineSegment(
        targetPosition.x,
        targetPosition.y,
        start.x,
        start.y,
        end.x,
        end.y
      );

      // Calculate distance from the original target position to the projection
      let distance = Math.sqrt(
        (targetPosition.x - projection.x) ** 2 +
          (targetPosition.y - projection.y) ** 2
      );

      // Update closest projection if this is the shortest distance found
      if (distance < minDistance) {
        closestProjection = projection;
        minDistance = distance;
      }
    }

    // Use closestProjection as the new targetPosition
    if (closestProjection) {
      console.log("Mapped to closest projection:", closestProjection);
      targetPosition = closestProjection; // Update targetPosition to the projection
    }
  }
});

// Main game loop
app.ticker.add((delta) => {
  if (targetPosition) {
    const distance = Math.sqrt(
      Math.pow(Player.player.x - targetPosition.x, 2) +
        Math.pow(Player.player.y - targetPosition.y, 2)
    );

    if (distance < 30) {
      targetPosition = null;
      player.setIdle();
      console.log(distance);
      // If there's a pending interaction, call it and then clear it
      if (pendingInteraction) {
        pendingInteraction(); // This calls the stored function
        app.mainScene.updateTransform();
        pendingInteraction = null; // Clear the stored interaction
      }
    } else {
      player.move(targetPosition, UI.solidObjects);
      followPlayer(app, app.cameraContainer, Player.player);
      app.mainScene.updateTransform();
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Set initial camera position on mobile, or resize to window size
  if (window.isMobile) {
    introPopup.open(app, 0.2, 0.2);
  } else {
    introPopup.open(app, 0.37, 0.4);
  }
  followPlayer(app, app.cameraContainer, Player.player);
  resizeGame(app, app.mainScene);
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
