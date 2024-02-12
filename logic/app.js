const app = new PIXI.Application({
  width: 1200,
  height: 800,
  backgroundColor: 0xaaaaaa,
});

document.body.appendChild(app.view);

const backgroundTexture = PIXI.Texture.from(
  "images/background_placeholder.png"
);

// Load player idle and walk animation frames
const playerIdleFrames = [];
for (let i = 1; i <= 2; i++) {
  playerIdleFrames.push(PIXI.Texture.from(`images/player_idle${i}.png`));
}
const playerWalkFrames = [];
for (let i = 1; i <= 4; i++) {
  playerWalkFrames.push(PIXI.Texture.from(`images/player_walk${i}.png`));
}

// Create background sprite
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

app.stage.addChild(player);

let targetPosition = new PIXI.Point(player.x, player.y);

// Inventory array to store collected items
const inventory = [];

// Create and add an item to the stage
const item = PIXI.Sprite.from("images/key.png");
item.x = 900;
item.y = 590;
item.interactive = true;
item.buttonMode = true;
app.stage.addChild(item);

// Inventory UI
const inventoryUI = new PIXI.Container();
inventoryUI.position.set(0, app.screen.height - 100); // Adjust as needed
app.stage.addChild(inventoryUI);

function getItemAtPosition(position) {
  // Check if the click is on the item
  if (item.getBounds().contains(position.x, position.y)) {
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
      // Update the inventory UI
      updateInventoryUI();
    }
  }
}

function updateInventoryUI() {
  // Clear the existing inventory UI
  inventoryUI.removeChildren();

  // Display collected items in the inventory UI
  const itemSize = 50; // Adjust as needed
  for (let i = 0; i < inventory.length; i++) {
    const inventoryItem = PIXI.Sprite.from(inventory[i].texture);
    inventoryItem.width = itemSize;
    inventoryItem.height = itemSize;
    inventoryItem.x = i * (itemSize + 10); // Adjust spacing
    inventoryUI.addChild(inventoryItem);
  }
}

// Handle click event on the stage
app.stage.interactive = true; // Enable interaction
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
  } else {
    // If the player has reached the target, switch back to idle animation
    player.textures = playerIdleFrames;
    player.animationSpeed = 0.05; // Set animationSpeed for the idle animation
    player.gotoAndPlay(0);
  }
});
