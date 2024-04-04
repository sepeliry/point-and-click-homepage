import * as PIXI from "pixi.js";
import { playerCollides, directionFunctions } from "./collisionUtils";
import Player from "./player";
import Inventory from "./inventory";
import UI from "./UI";
import Numpad from "./numpad";
import Popup from "./popup.js";
import { setupPdf } from "./utils/pdfUtils.js";
import { resizeGame } from "./utils/resize.js";
import { followPlayer } from "./utils/cameraUtils.js";

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
if (windowWidth <= 800) {
  window.isMobile = true;
} else {
  window.isMobile = false;
}
let app;

// Create application on page load
if (!window.isMobile) {
  app = new PIXI.Application({
    width: 1400,
    height: 800,
    backgroundColor: 0xaaaaaa,
  });
} else {
  app = new PIXI.Application({
    width: windowWidth >= 1400 ? 1400 : windowWidth,
    height: windowHeight >= 800 ? 800 : windowHeight,
    backgroundColor: 0xaaaaaa,
  });
}

globalThis.__PIXI_APP__ = app;
document.getElementById("game-container").appendChild(app.view);

document.getElementById("hide-wiki-content").addEventListener("click", () => {
  document.getElementById("wiki-wrapper").style.display = "none";
});

// Construct contents in canvas
const ui = new UI(app);
const player = new Player(app);
const inventory = new Inventory(app);
const numpad = new Numpad(app, ui);
// const popup = new Popup(app, popup1TextElements);

document.addEventListener("DOMContentLoaded", () => {
  // Set initial camera position on mobile, or resize to window size
  if (window.isMobile) {
    followPlayer(app, app.cameraContainer, Player.player);
  } else {
    resizeGame(app, app.mainScene);
  }
});
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

let targetPosition;

// Handle click event on the stage
app.mainScene.eventMode = "static"; // Enable interaction
app.mainScene.on("pointertap", (event) => {
  // console.log(app.mainScene.toLocal(event.global));
  const collisionResult = playerCollides(Player.player, UI.solidObjects);
  if (collisionResult.collided) {
    const direction = collisionResult.direction;
    // Set the player position next to the object based on collision direction
    const moveFunction = directionFunctions[direction];
    if (moveFunction) {
      moveFunction(Player.player, 20); // Adjust the value as needed
    }
  }

  const clickedItem = getItemAtPosition(event.global, event.target);
  console.log(clickedItem);
  /*if (clickedItem) {
    // Calculate the distance between the clicked item and the player
    const distance = Math.abs(clickedItem.x - Player.player.x);
    if (distance < 100) {
      switch (clickedItem) {
        case ui.potion:
          // Minimize the player and hide the potion
          player.minimizePlayer();
          ui.potion.visible = false;
          break;
        case ui.mousehole.mousehole:
          if (player.isMiniSize) {
            // Change to mousehole scene
            ui.toggleMousehole(app)();
          }
          break;
        case ui.box_prop:
          break;
        default:
          inventory.addToInventory(clickedItem, Player.player);
          console.log("Player pos: " + Player.player.position);
          break;
      }
    }
  } else {*/
  // Set the new target position on click
  // TODO: 502 is set as the y-coordinate just to test the 2.5D-effect. This
  // has to be adjusted in a different way once final designs are done.
  const localPosition = app.mainScene.toLocal(event.global);
  const yCoordinate = localPosition.y > 603 ? localPosition.y : 602;
  targetPosition = new PIXI.Point(localPosition.x, yCoordinate);
  console.log(targetPosition);
  //}
});

// Main game loop
app.ticker.add((delta) => {
  if (targetPosition) {
    const distance = Math.sqrt(
      Math.pow(Player.player.x - targetPosition.x, 2) +
        Math.pow(Player.player.y - targetPosition.y, 2)
    );
    if (distance < 3) {
      targetPosition = null;
      player.setIdle();
    }
  }
  if (targetPosition) {
    player.move(targetPosition, UI.solidObjects);
    if (window.isMobile) {
      followPlayer(app, app.cameraContainer, Player.player);
    }
    app.mainScene.updateTransform();
  }
});

if (!window.isMobile) {
  window.addEventListener("resize", () => resizeGame(app, app.mainScene));
  document.addEventListener("fullscreenchange", () =>
    resizeGame(app, app.mainScene)
  );
  window.addEventListener("resize", () =>
    resizeGame(app, app.scenes.bookshelfScene)
  );
  window.addEventListener("resize", () =>
    resizeGame(app, app.scenes.numpadScene)
  );
}
// window.addEventListener("resize", () =>
//   resizeGame(app, app.mouseholeContainer)
// );
// window.addEventListener("resize", () => resizeGame(app, app.pdfContainer));
// }

// setupPdf(app, app.mainScene);
