import * as PIXI from "pixi.js";
import { playerCollides, directionFunctions } from "./collisionUtils";
import Player from "./player";
import Inventory from "./inventory";
import UI from "./UI";
import Popup from "./popup.js";
import Item from "./item";
import Object from "./object";
import keyImage from "../resources/images/key.png";
import boxPropImage from "../resources/images/box_prop.png";
import { generateWikiList, showWikiList } from "./utils/markdownUtils.js";
import { closePdf, showPdf } from "./utils/pdfUtils.js";
import Book from "./book.js";
import bookImg from "../resources/images/book_placeholder.png";
import bookImg2 from "../resources/images/book2_placeholder.png";
import Numpad from "./numpad.js";
import { CRTFilter } from '@pixi/filter-crt';

// Create application on page load
const app = new PIXI.Application({
  width: 1200,
  height: 800,
  backgroundColor: 0xaaaaaa,
});
globalThis.__PIXI_APP__ = app;
document.getElementById("game-container").appendChild(app.view);

/** 
 ** CONTAINERS
 **/

// Container for main game elements
const gameContainer = new PIXI.Container();
gameContainer.sortableChildren = true;
app.stage.addChild(gameContainer);
app.gameContainer = gameContainer;
gameContainer.filters = [new CRTFilter()];
gameContainer.visible = true;

// Container for bookshelf view
const bookshelfContainer = new PIXI.Container();
app.stage.addChild(bookshelfContainer);
app.bookshelfContainer = bookshelfContainer;
bookshelfContainer.filters = [new CRTFilter()];
bookshelfContainer.visible = false;

// Container for numpad view
const numpadContainer = new PIXI.Container();
app.stage.addChild(numpadContainer);
app.numpadContainer = numpadContainer;
numpadContainer.filters = [new CRTFilter()];
numpadContainer.visible = false;

// Generate content 
let solidObjects = [];
solidObjects.sortableChildren = true;

// Create collectable items
const key = new Item(app, keyImage, 800, 590);

// Create interactable object
const box_prop = new Item(app, boxPropImage, 850, 750);
box_prop.height = 100;
box_prop.width = 100;
generateWikiList();
box_prop.on("pointerdown", () => showWikiList(app, gameContainer))
solidObjects.push(box_prop);

// Test object for collision dev
const box_propCollision = new Item(app, boxPropImage, 650, 650);
box_propCollision.height = 100;
box_propCollision.width = 100;
box_prop.on("pointerdown", () => console.log("box_propCollision"))
solidObjects.push(box_propCollision);

// Construct contents in canvas
const ui = new UI(app);
const player = new Player(app);
const inventory = new Inventory(app);
const numpad = new Numpad(app);
// const popup = new Popup(app, popup1TextElements);

// Button for testing bookshelf view
// TODO: bookshelf can be opened from canvas
document.addEventListener("DOMContentLoaded", () => {
  const button = document.createElement("button");
  button.textContent = "Avaa kirjahylly";
  button.classList.add("button");
  button.addEventListener("click", ui.toggleBookshelf(app));
  document.getElementById("game-container").appendChild(button);
});

// Button testing numpad view
// TODO: numpad opened from canvas
document.addEventListener("DOMContentLoaded", () => {
  const button = document.createElement("button");
  button.textContent = "Avaa numpad";
  button.classList.add("button");
  button.addEventListener("click", ui.toggleNumpad(app));
  document.getElementById("game-container").appendChild(button);
});

// Create books for bookshelf
// TODO: Move to more appropriate module
let books = [];
const blender = new Book(app, bookImg, 440, 400, "Blender");
const unity = new Book(app, bookImg2, 630, 650, "Unity");
books.push(blender);
books.push(unity);

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
gameContainer.eventMode = "static"; // Enable interaction
gameContainer.on("pointertap", (event) => {
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
  if (clickedItem && clickedItem !== box_prop) {
    // If an item is clicked, add it to the inventory
    inventory.addToInventory(clickedItem, player);
  } else {
    // Set the new target position on click
    // TODO: 502 is set as the y-coordinate just to test the 2.5D-effect. This
    // has to be adjusted in a different way once final designs are done.
    const yCoordinate = event.global.y > 603 ? event.global.y : 602;
    targetPosition = new PIXI.Point(event.global.x, yCoordinate);
    // Move the player towards the target position
    player.move(targetPosition, solidObjects);
  }
});

// Main game loop
app.ticker.add((delta) => {
  if (targetPosition) {
    player.move(targetPosition, solidObjects);
    gameContainer.updateTransform();
  }
  inventory.updateInventoryUI();
});
// PDF tiedoston avaamisen testausta varten
const pelienSuunittelu = "./docs/input/pelienSuunnittelu.pdf";
document
  .getElementById("show-pdf")
  .addEventListener("click", () =>
    showPdf(app, gameContainer, pelienSuunittelu)
  );

document.getElementById("close-pdf").addEventListener("click", () => {
  closePdf(app, gameContainer);
});
