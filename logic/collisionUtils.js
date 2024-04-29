// Checks for collision between a player and an item
export function playerCollides(player, solidObjects) {
  // Initialize default values
  let collisionResult = {
    collided: false,
    direction: null,
  };

  // temporarily disable collision check until it is fixed
  return collisionResult;
  console.log("collision");

  // Player bounds are a low, sprite wide box at player's feet
  // for more natural collision detection
  const playerBounds = {
    x: player.getBounds().x,
    y: player.getBounds().y + player.getBounds().height - 5,
    width: player.getBounds().width - 10,
    height: 5,
  };

  // Loop through each solid object
  for (const object of solidObjects) {
    // Create footprint instead of rectangle
    const itemBounds = {
      x: object.getBounds().x,
      y: object.getBounds().y + object.getBounds().height - 5,
      width: object.getBounds().width,
      height: 5,
    };

    const test = player.getBounds().intersects(object.getBounds());
    console.log(test);

    // Calculate the top and bottom y-coordinates of the footprint
    const footprintTop = itemBounds.y;
    const footprintBottom = itemBounds.y + itemBounds.height;

    // Check if there is a collision along the x-axis
    const collisionX =
      playerBounds.x < itemBounds.x + itemBounds.width &&
      playerBounds.x + playerBounds.width > itemBounds.x;

    // Check if there is a collision along the y-axis
    const collisionY =
      (playerBounds.y < footprintTop &&
        playerBounds.y + playerBounds.height >= footprintTop - 20) ||
      (playerBounds.y > footprintTop &&
        playerBounds.y + playerBounds.height <= footprintBottom + 20);

    if (collisionX && collisionY) {
      // Determine the collision direction based on overlap along x and y axes
      const xOverlap = Math.min(
        playerBounds.x + playerBounds.width - itemBounds.x,
        itemBounds.x + itemBounds.width - playerBounds.x
      );
      const yOverlap = Math.min(
        playerBounds.y + playerBounds.height - footprintTop,
        footprintBottom - playerBounds.y
      );

      if (xOverlap < yOverlap) {
        collisionResult.direction =
          playerBounds.x < itemBounds.x ? "left" : "right";
      } else {
        collisionResult.direction =
          playerBounds.y < footprintTop ? "up" : "down";
      }
      // Set collided to true and exit the loop
      collisionResult.collided = true;
      break;
    }
  }
  return collisionResult;
}

export const directionFunctions = {
  left: (player, value) => (player.x -= value),
  right: (player, value) => (player.x += value),
  up: (player, value) => (player.y -= value),
  down: (player, value) => (player.y += value),
};