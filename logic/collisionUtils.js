// Checks for collision between a player and an item
export function playerCollides(player, solidObjects) {
    // Initialize default values
    let collisionResult = {
        collided: false,
        direction: null
    };
    const playerBounds = player.getBounds();
  
    // Loop through each solid object
    for (const object of solidObjects) {
        const itemBounds = object.getBounds();
        const collisionX = playerBounds.x < itemBounds.x + itemBounds.width
            && playerBounds.x + playerBounds.width > itemBounds.x;

        const collisionY = playerBounds.y < itemBounds.y + itemBounds.height
            && playerBounds.y + playerBounds.height > itemBounds.y;

        if (collisionX && collisionY) {
            // Determine the collision direction based on overlap along x and y axes
            const xOverlap = Math.min(playerBounds.x + playerBounds.width - itemBounds.x, itemBounds.x + itemBounds.width - playerBounds.x);
            const yOverlap = Math.min(playerBounds.y + playerBounds.height - itemBounds.y, itemBounds.y + itemBounds.height - playerBounds.y);

            if (xOverlap < yOverlap) {
                collisionResult.direction = playerBounds.x < itemBounds.x ? 'left' : 'right';
            } else {
                collisionResult.direction = playerBounds.y < itemBounds.y ? 'up' : 'down';
            }
            // Set collided to true and exit the loop
            collisionResult.collided = true;
            break;
        }
    }
    return collisionResult;
}

export const directionFunctions = {
    'left': (player, value) => player.x -= value,
    'right': (player, value) => player.x += value,
    'up': (player, value) => player.y -= value,
    'down': (player, value) => player.y += value
};
