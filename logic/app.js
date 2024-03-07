import * as PIXI from "pixi.js";
import { GlowFilter } from "@pixi/filter-glow";
import { playerCollides, directionFunctions } from "./collisionUtils";
import Player from "./player";
import Inventory from "./inventory";
import UI from "./UI";
import Popup from "./popup.js";
import Item from "./item.js";
import Book from "./book.js";
import { popup1TextElements } from "../data/popupTexts";
import keyImage from "../resources/images/key.png";
import boxPropImage from "../resources/images/box_prop.png";
import bookImg from "../resources/images/book_placeholder.png";
import { fetchPage, handleMarkdownClick } from "./wiki/markdownUtils.js";
import { pages } from "./wiki/pages.js";
import { closePdf, showPdf } from "./wiki/pdfUtils.js";

// Create application on page load
const app = new PIXI.Application({
  width: 1200,
  height: 800,
  backgroundColor: 0xaaaaaa,
});
document.getElementById("game-container").appendChild(app.view);

// Container for main game elements
const gameContainer = new PIXI.Container();
app.stage.addChild(gameContainer);
app.gameContainer = gameContainer;
gameContainer.visible = true;

// Container for bookshelf view
const bookshelfContainer = new PIXI.Container();
app.stage.addChild(bookshelfContainer);
app.bookshelfContainer = bookshelfContainer;
bookshelfContainer.visible = false;

// Construct contents in canvas
const ui = new UI(app);
const player = new Player(app);
const inventory = new Inventory(app);
const popup = new Popup(app, popup1TextElements);

// Button for view swap testing
const button = document.createElement('button');
button.textContent = 'Vaihda näkymää';
button.addEventListener("click", ui.toggleViews(app));
document.body.appendChild(button);

let solidObjects = [];
// Create collectable items
const key = new Item(app, keyImage, 900, 590);

// Create interactable objects
// const box_prop = new Object(app, boxPropImage, 1050, 650, popup);
const box_prop = new Item(app, boxPropImage, 1050, 650);
box_prop.height = 100;
box_prop.width = 100;
const pageUrl = pages[1].url;
const pageTitle = pages[1].title;
box_prop.on("pointerdown", async () => {
  const htmlContent = await fetchPage(pageUrl);
  handleMarkdownClick(app, gameContainer, pageTitle, htmlContent);
});
solidObjects.push(box_prop);

// Create books for bookshelf
let books = [];
const book = new Book(app, bookImg, 440, 400, "Blender");
books.push(book);

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

const pelienSuunittelu = "/docs/input/pelienSuunnittelu.pdf";
document
  .getElementById("show-pdf")
  .addEventListener("click", () =>
    showPdf(app, gameContainer, pelienSuunittelu)
  );

document.getElementById("close-pdf").addEventListener("click", () => {
  closePdf(app, gameContainer);
});
