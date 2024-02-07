const app = new PIXI.Application({
  width: 1200,
  height: 800,
  backgroundColor: 0xaaaaaa,
});

document.body.appendChild(app.view);

const backgroundTexture = PIXI.Texture.from("images/background.png");

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
player.position.set(100, 100);
player.anchor.set(0.5);
player.animationSpeed = 0.05;
player.loop = true; // Set the loop property to true
player.play();
app.stage.addChild(player);

let targetPosition = new PIXI.Point(player.x, player.y);

// Inventory array to store collected items
const inventory = [];

// Create and add an item to the stage
const item = PIXI.Sprite.from("images/key.png");
item.x = 800;
item.y = 500;
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

function addToInventory(item) {
  if (!inventory.includes(item)) {
    console.log("Item collected!");
    inventory.push(item);
  }

  // Update the inventory UI
  updateInventoryUI();
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
    targetPosition.set(event.data.global.x, event.data.global.y);

    // Play the walk animation when the player moves
    player.textures = playerWalkFrames;
    player.play();
  }
});

// Fetch data function
function fetchData() {
  // Using JSONPlaceholder's posts endpoint to fetch posts
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((posts) => {
      // Update the span content with the title of the first post
      updateDataSpan(posts);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Function to update the content of the span element
function updateDataSpan(posts) {
  const dataSpan = document.getElementById("data-span");
  if (dataSpan && posts.length > 0) {
    dataSpan.textContent = `First post title: ${posts[0].title}`;
  } else {
    dataSpan.textContent = "No posts available.";
  }
}

// Call the fetchData function to initiate the data fetch
fetchData();

// Main game loop
app.ticker.add((delta) => {
  // Calculate the distance to the target position
  const dx = targetPosition.x - player.x;
  const dy = targetPosition.y - player.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 1) {
    // Move the player towards the target position
    player.x += dx * 0.05; // You can adjust the speed
    player.y += dy * 0.05;
  } else {
    // If the player has reached the target, switch back to idle animation
    player.textures = playerIdleFrames;
    player.animationSpeed = 0.05; // Set animationSpeed for the idle animation
    player.gotoAndPlay(0);
  }
});
