import Player from '../player';
/**
 * Function to perform a distance check between the player and a clickable area
 * @param {PIXI.DisplayObject} player - The player object
 * @param {PIXI.DisplayObject} clickableArea - The clickable area object
 * @param {number} maxDistance - The maximum distance within which the player can interact with the clickable area
 * @param {Function} action - The action to perform if the player is within the maximum distance
 */
function checkDistance(app, x, y, sceneName, action) {
    const maxDistance = 250;
    const player = Player.player;
    if (!player || !app.scenes[sceneName]) return;
    // Calculate the distance between the player and the clickable area
    const distance = Math.sqrt(
        (player.x - x * app.renderer.width) ** 2 + (player.y - y * app.renderer.height) ** 2
    );

    // Check if the player is within the maximum distance
    if (distance <= maxDistance) {
        // Perform the specified action
        action();
    }
}
export default checkDistance;
