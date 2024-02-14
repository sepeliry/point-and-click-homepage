import * as PIXI from "pixi.js";
import { textContainer, closeText } from "./textContainer";
import backgroundImg from "../images/background_placeholder.png";
import playerIdle1 from "../images/player_idle1.png";
import playerIdle2 from "../images/player_idle2.png";
import playerWalk1 from "../images/player_walk1.png";
import playerWalk2 from "../images/player_walk2.png";
import playerWalk3 from "../images/player_walk3.png";
import playerWalk4 from "../images/player_walk4.png";
import keyImage from "../images/key.png";
import boxPropImage from "../images/box_prop.png";
const app = new PIXI.Application({
  width: 1200,
  height: 800,
  backgroundColor: 0xaaaaaa,
});
document.body.appendChild(app.view);

// Load player idle and walk animation frames
const playerIdleFrames = [
  PIXI.Texture.from(playerIdle1),
  PIXI.Texture.from(playerIdle2),
];
const playerWalkFrames = [
  PIXI.Texture.from(playerWalk1),
  PIXI.Texture.from(playerWalk2),
  PIXI.Texture.from(playerWalk3),
  PIXI.Texture.from(playerWalk4),
];

// Create background sprite
const backgroundTexture = PIXI.Texture.from(backgroundImg);
const background = new PIXI.Sprite(backgroundTexture);
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);

// Create player sprite with idle animation
const player = new PIXI.AnimatedSprite(playerIdleFrames);
player.position.set(200, 625);
player.anchor.set(0.5);
player.animationSpeed = 0.05;
player.loop = true; // Set the loop property to true
player.play();
app.stage.addChild(player);
let targetPosition = new PIXI.Point(player.x, player.y);

// Create and add an item to the stage
const item = PIXI.Sprite.from(keyImage);
item.x = 900;
item.y = 590;
item.eventMode = "static";
item.cursor = "pointer";
app.stage.addChild(item);

const box_prop = PIXI.Sprite.from(boxPropImage);
box_prop.x = 120;
box_prop.y = 670;
box_prop.eventMode = "static";
box_prop.cursor = "pointer";
box_prop.on("pointerdown", openPopup);
app.stage.addChild(box_prop);

// Inventory system and UI
const inventory = [];
const inventoryUI = new PIXI.Container();
inventoryUI.position.set(0, app.screen.height - 100); // Adjust as needed
app.stage.addChild(inventoryUI);

function getItemAtPosition(position) {
  // Check if the click is on the item. Ensure item is visible to not block movement after item is picked
  if (item.getBounds().contains(position.x, position.y) && item.visible) {
    return item;
  }
  return null;
}

// Adds item to inventory, checks for distance and duplicates
function addToInventory(item) {
  const distance = Math.abs(item.x - player.x);
  console.log(item.x + " " + player.x + " " + distance);
  // Player can't teleport
  if (distance < 100) {
    if (!inventory.includes(item)) {
      console.log("Item collected!");
      inventory.push(item);
      item.visible = false;
      item.eventMode = "none";
      updateInventoryUI();
    }
  }
}
// Displays collected items in inventory
function updateInventoryUI() {
  // Clear the existing inventory UI
  inventoryUI.removeChildren();
  const itemSize = 50;
  for (let i = 0; i < inventory.length; i++) {
    const inventoryItem = PIXI.Sprite.from(inventory[i].texture);
    inventoryItem.width = itemSize;
    inventoryItem.height = itemSize;
    inventoryItem.x = i * (itemSize + 10); // Adjust spacing
    inventoryUI.addChild(inventoryItem);
  }
}
// Popup for displaying text content
let popup = textContainer;
const popupWidth = app.screen.width / 3;
const popupHeight = app.screen.height / 3;
let popupCloseBtn = closeText;
let popupBg;

// Opens the popup and adds a background color to it.
function openPopup() {
  popup.width = popupWidth;
  popup.height = popupHeight;
  popup.x = app.screen.width / 2;
  popup.y = app.screen.height / 2;
  popupBg = new PIXI.Graphics();
  popupBg.beginFill(0xced4da);
  popupBg.drawRoundedRect(
    -popup.width / 2,
    -popup.height / 2,
    popup.width,
    popup.height + 75,
    15
  );
  popupBg.endFill();
  popupBg.alpha = 0.5;
  popup.addChildAt(popupBg, 0);
  app.stage.addChild(popup);
  app.stage.eventMode = "passive"; // To ensure game doesn't register clicks if popup is open
}

function closePopup() {
  popup.removeChild(popupBg);
  app.stage.removeChild(popup);
  app.stage.eventMode = "static";
}

popupCloseBtn.on("pointerdown", closePopup);
// Handle click event on the stage
app.stage.eventMode = "static"; // Enable interaction
app.stage.on("pointertap", (event) => {
  const clickedItem = getItemAtPosition(event.data.global);

  if (clickedItem) {
    // If an item is clicked, add it to the inventory
    addToInventory(clickedItem);
  } else {
    // Set the new target position on click
    targetPosition.x = event.data.global.x;

    // Play the walk animation when the player moves
    player.textures = playerWalkFrames;
    player.play();
  }
});

// Main game loop
app.ticker.add((delta) => {
  // Calculate the distance to the target position
  const dx = targetPosition.x - player.x;
  const distance = Math.abs(dx);

  if (distance > 3) {
    // Move the player towards the target position
    const directionX = dx / distance;
    const speed = 2.5; // Adjust speed if needed

    player.x += directionX * speed;

    // Mirror player Sprite according to the direction of movement
    if (directionX < 0) {
      player.rotation = Math.PI;
      player.scale.y = -1;
    } else {
      player.rotation = 0;
      player.scale.y = 1;
    }
  } else if (player.textures !== playerIdleFrames) {
    // If the player has reached the target, switch back to idle animation
    player.textures = playerIdleFrames;
    player.animationSpeed = 0.05; // Set animationSpeed for the idle animation
    player.gotoAndPlay(0);
  }
});
