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
import { setupPdf } from "./utils/pdfUtils.js";
import { resizeGame } from "./utils/resize.js";
import Book from "./book.js";
import bookImg from "../resources/images/book_placeholder.png";
import bookImg2 from "../resources/images/book2_placeholder.png";
import mouseholeImg from "../resources/images/mousehole_placeholder.png";
import potionImg from "../resources/images/potion.png";
import Numpad from "./numpad.js";
import { CRTFilter } from "@pixi/filter-crt";
import arrow_left from "../resources/images/arrow_left.png";
import arrow_right from "../resources/images/arrow_right.png";
import { moveCamera } from "./utils/cameraUtils.js";

// Mobiilinäkymän kokeilua varten = true
window.isMobile = false;
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

/**
 ** CONTAINERS
 **/

// Container for main game elements
const gameContainer = new PIXI.Container();
gameContainer.sortableChildren = true;
// If the user is on mobile, gameContainer is instead added to cameraContainer later
window.isMobile ? null : app.stage.addChild(gameContainer);
app.gameContainer = gameContainer;
gameContainer.filters = [new CRTFilter()];
gameContainer.visible = true;

// Camera container
if (window.isMobile) {
  const cameraContainer = new PIXI.Container();
  // app.cameraContainer = cameraContainer;
  cameraContainer.addChild(gameContainer);
  app.stage.addChild(cameraContainer);
  const leftArrowTexture = PIXI.Texture.from(arrow_left);
  const leftButton = new PIXI.Sprite(leftArrowTexture);
  leftButton.eventMode = "static";
  leftButton.buttonMode = true;
  leftButton.on("pointerdown", () => {
    moveCamera(app, cameraContainer, "left");
  });
  app.stage.addChild(leftButton);

  const rightArrowTexture = PIXI.Texture.from(arrow_right);
  const rightButton = new PIXI.Sprite(rightArrowTexture);
  rightButton.eventMode = "static";
  rightButton.buttonMode = true;
  rightButton.on("pointerdown", () => {
    moveCamera(app, cameraContainer, "right");
  });
  app.stage.addChild(rightButton);
  rightButton.x = app.renderer.width - 50;
  rightButton.y = 50;
  leftButton.x = 50;
  leftButton.y = 50;
}

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

// Container for mousehole view
const mouseholeContainer = new PIXI.Container();
app.stage.addChild(mouseholeContainer);
app.mouseholeContainer = mouseholeContainer;
mouseholeContainer.visible = false;

// Construct contents in canvas
const ui = new UI(app);
const player = new Player(app);
const inventory = new Inventory(app);
const numpad = new Numpad(app);
// const popup = new Popup(app, popup1TextElements);

// Generate content
let solidObjects = [];
solidObjects.sortableChildren = true;

// Create collectable items
const key = new Item(app, keyImage, 0.66, 0.735);

// Create interactable object
const box_prop = new Item(app, boxPropImage, 0.71, 0.93);
box_prop.height = 100;
box_prop.width = 100;
generateWikiList();
box_prop.on("pointerdown", () => showWikiList(app, gameContainer));
solidObjects.push(box_prop);

// Test object for collision dev
const box_propCollision = new Item(app, boxPropImage, 0.3, 0.95);
box_propCollision.height = 100;
box_propCollision.width = 100;
box_propCollision.eventMode = "none";
solidObjects.push(box_propCollision);

// Test object for mousehole
const mousehole = new Item(app, mouseholeImg, 0.78, 0.8);
mousehole.height = 50;
mousehole.width = 50;

// Drinkable potion, makes player small
const potion = new Item(app, potionImg, 0.1, 0.95);
potion.height = 100;
potion.width = 100;

// Button for testing bookshelf view
// TODO: bookshelf can be opened from canvas
document.addEventListener("DOMContentLoaded", () => {
  const button = document.createElement("button");
  button.textContent = "Avaa kirjahylly";
  button.classList.add("button");
  button.addEventListener("click", ui.toggleBookshelf(app));
  document.getElementById("test-controls").appendChild(button);
});

// Button testing numpad view
// TODO: numpad opened from canvas
document.addEventListener("DOMContentLoaded", () => {
  const button = document.createElement("button");
  button.textContent = "Avaa numpad";
  button.classList.add("button");
  button.addEventListener("click", ui.toggleNumpad(app));
  document.getElementById("test-controls").appendChild(button);
});

// Create books for bookshelf
// TODO: Move to more appropriate module
let books = [];
//const blender = new Book(app, bookImg, 500, 170, "Unity");
//const unity = new Book(app, bookImg2, 500, 300, "Blender");
//books.push(blender);
//books.push(unity);

/**
 * Yhden hyllyrivin koko on ~556x140 px
 * Hyllyrivin pohjan korkeus on 20px
 * Vasemman reunan x-koordinaatti on 500
 */

// Populate the entire bookshelf
let row1X = 500;
let row1Y = 170;
let bookNumber = 1;
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 11; j++) {
    // Quick randomization for the book image
    if (bookNumber % Math.floor(Math.random() * 10) === 0) {
      const book = new Book(app, bookImg2, row1X, row1Y, `${bookNumber}`);
      books.push(book);
    } else {
      const book = new Book(app, bookImg, row1X, row1Y, `${bookNumber}`);
      books.push(book);
    }
    row1X += 40;
    bookNumber++;
  }
  row1Y += 120;
  row1X = 500;
}

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
  console.log(gameContainer.toLocal(event.global));
  // console.log("localposition:" + gameContainer.toLocal(event.global));
  const collisionResult = playerCollides(player.player, solidObjects);
  if (collisionResult.collided) {
    const direction = collisionResult.direction;
    // Set the player position next to the object based on collision direction
    const moveFunction = directionFunctions[direction];
    if (moveFunction) {
      moveFunction(player.player, 20); // Adjust the value as needed
    }
    // player.destinationReached = true;
  }

  const clickedItem = getItemAtPosition(event.global, event.target);
  if (clickedItem) {
    // Calculate the distance between the clicked item and the player
    const distance = Math.abs(clickedItem.x - player.player.x);
    switch (clickedItem) {
      case potion:
        if (distance < 100) {
          // Minimize the player and hide the potion
          player.minimizePlayer();
          potion.visible = false;
        }
        break;
      case mousehole:
        if (distance < 100 && player.isMiniSize) {
          // Change to mousehole scene
          ui.toggleMousehole(app)();
        }
        break;
      case box_prop:
        break;
      default:
        inventory.addToInventory(clickedItem, player);
        break;
    }
  } else {
    // Set the new target position on click
    // TODO: 502 is set as the y-coordinate just to test the 2.5D-effect. This
    // has to be adjusted in a different way once final designs are done.
    const localPosition = gameContainer.toLocal(event.global);
    const yCoordinate = localPosition.y > 603 ? localPosition.y : 602;
    targetPosition = new PIXI.Point(localPosition.x, yCoordinate);
    // player.destinationReached = false;
    // targetPosition = new PIXI.Point(localPosition.x, localPosition.y);
    // Move the player towards the target position
    // player.move(targetPosition, solidObjects);
  }
});

// Main game loop
app.ticker.add((delta) => {
  if (targetPosition) {
    const distance = Math.sqrt(
      Math.pow(player.player.x - targetPosition.x, 2) +
        Math.pow(player.player.y - targetPosition.y, 2)
    );
    if (distance < 3) {
      targetPosition = null;
      player.setIdle();
    }
  }
  // Check if a targetPos is set and if the player has reached the destination to stop infinite loop  && !player.destinationReached
  if (targetPosition) {
    player.move(targetPosition, solidObjects);
    gameContainer.updateTransform();
  }

  inventory.updateInventoryUI();
});

if (!window.isMobile) {
  window.addEventListener("resize", () => resizeGame(app, gameContainer));
  window.addEventListener("resize", () => resizeGame(app, bookshelfContainer));
  window.addEventListener("resize", () => resizeGame(app, numpadContainer));
  window.addEventListener("resize", () => resizeGame(app, mouseholeContainer));
}

setupPdf(app, gameContainer);
