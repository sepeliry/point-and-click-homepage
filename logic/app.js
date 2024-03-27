import * as PIXI from "pixi.js";
import { playerCollides, directionFunctions } from "./collisionUtils";
import Player from "./player";
import Inventory from "./inventory";
import UI from "./UI";
import Popup from "./popup.js";
import { setupPdf } from "./utils/pdfUtils.js";
import { resizeGame } from "./utils/resize.js";

// Mobiilinäkymän kokeilua varten = true
window.isMobile = true;
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
    width: 600,
    height: 800,
    backgroundColor: 0xaaaaaa,
  });
}

globalThis.__PIXI_APP__ = app;
document.getElementById("game-container").appendChild(app.view);

// Construct contents in canvas
const ui = new UI(app);
const player = new Player(app);
const inventory = new Inventory(app);
// const popup = new Popup(app, popup1TextElements);

// Button for testing bookshelf view
document.addEventListener("DOMContentLoaded", () => {
  const button = document.createElement("button");
  button.textContent = "Avaa kirjahylly";
  button.classList.add("button");
  button.addEventListener("click", ui.toggleBookshelf(app));
  document.getElementById("test-controls").appendChild(button);
});

// Button testing numpad view
document.addEventListener("DOMContentLoaded", () => {
  const button = document.createElement("button");
  button.textContent = "Avaa numpad";
  button.classList.add("button");
  button.addEventListener("click", ui.toggleNumpad(app));
  document.getElementById("test-controls").appendChild(button);
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
app.gameContainer.eventMode = "static"; // Enable interaction
app.gameContainer.on("pointertap", (event) => {
  console.log(app.gameContainer.toLocal(event.global));
  const collisionResult = playerCollides(Player.player, ui.solidObjects);
  if (collisionResult.collided) {
    const direction = collisionResult.direction;
    // Set the player position next to the object based on collision direction
    const moveFunction = directionFunctions[direction];
    if (moveFunction) {
      moveFunction(Player.player, 20); // Adjust the value as needed
    }
  }

  const clickedItem = getItemAtPosition(event.global, event.target);
  if (clickedItem) {
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
          break;
      }
    }
  } else {
    // Set the new target position on click
    // TODO: 502 is set as the y-coordinate just to test the 2.5D-effect. This
    // has to be adjusted in a different way once final designs are done.
    const localPosition = app.gameContainer.toLocal(event.global);
    const yCoordinate = localPosition.y > 603 ? localPosition.y : 602;
    targetPosition = new PIXI.Point(localPosition.x, yCoordinate);
  }
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
  // Check if a targetPos is set and if the player has reached the destination to stop infinite loop  && !player.destinationReached
  if (targetPosition) {
    player.move(targetPosition, ui.solidObjects);
    app.gameContainer.updateTransform();
  }

  inventory.updateInventoryUI();
});
setupPdf(app, app.gameContainer);
if (!window.isMobile) {
  window.addEventListener("resize", () => resizeGame(app, app.gameContainer));
  window.addEventListener("resize", () =>
    resizeGame(app, app.bookshelfContainer)
  );
  window.addEventListener("resize", () => resizeGame(app, app.numpadContainer));
  window.addEventListener("resize", () =>
    resizeGame(app, app.mouseholeContainer)
  );
  window.addEventListener("resize", () => resizeGame(app, app.pdfContainer));
}
