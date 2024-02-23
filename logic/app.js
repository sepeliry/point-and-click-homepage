import * as PIXI from "pixi.js";
import { GlowFilter } from "@pixi/filter-glow";
import { playerCollides, directionFunctions } from "./collisionUtils";
import Player from "./player";
import Inventory from "./inventory";
import UI from "./UI";
import Popup from "./popup.js";
import Item from "./item";
import Object from "./object";
import { popup1TextElements } from "../data/popupTexts";
import keyImage from "../resources/images/key.png";
import boxPropImage from "../resources/images/box_prop.png";

// Create application on page load
const app = new PIXI.Application({
  width: 1200,
  height: 800,
  backgroundColor: 0xaaaaaa,
});
document.body.appendChild(app.view);

// Construct contents in canvas
const ui = new UI(app);
const player = new Player(app);
const inventory = new Inventory(app);
const popup = new Popup(app, popup1TextElements);

let solidObjects = [];
// Create collectable items
const key = new Item(app, keyImage, 900, 590);
// Create interactable objects
const box_prop = new Object(app, boxPropImage, 1050, 650, popup);
box_prop.height = 100;
box_prop.width = 100;
solidObjects.push(box_prop);

function getItemAtPosition(position, item) {
  // Check if the click is on the item. Ensure item is visible to not block movement after item is picked
  // console.log(item);
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
app.stage.eventMode = "static"; // Enable interaction
app.stage.on("pointertap", (event) => {
  const collisionResult = playerCollides(player.player, solidObjects);
  if (collisionResult.collided) {
    const direction = collisionResult.direction;
    // Set the player position next to the object based on collision direction
    const moveFunction = directionFunctions[direction];
    if (moveFunction) {
      moveFunction(player.player, 20); // Adjust the value as needed
    }
  }

  const clickedItem = getItemAtPosition(event.global, event.target);
  if (clickedItem) {
    // console.log("tried to pick up", clickedItem);
    // If an item is clicked, add it to the inventory
    inventory.addToInventory(clickedItem, player);
  } else {
    // Set the new target position on click
    // TODO: 502 is set as the y-coordinate just to test the 2.5D-effect. This
    // has to be adjusted in a different way once final designs are done.
    const yCoordinate = event.global.y > 503 ? event.global.y : 502;
    targetPosition = new PIXI.Point(event.global.x, yCoordinate);
    // Move the player towards the target position
    player.move(targetPosition, solidObjects);
  }
});

// Main game loop
app.ticker.add((delta) => {
  if (targetPosition) {
    player.move(targetPosition, solidObjects);
  }
  inventory.updateInventoryUI();
});
