import Player from "../player";
/**
 * Function to perform a distance check between the player and a clickable area
 * @param {PIXI.DisplayObject} player - The player object
 * @param {PIXI.DisplayObject} clickableArea - The clickable area object
 * @param {number} maxDistance - The maximum distance within which the player can interact with the clickable area
 * @param {Function} action - The action to perform if the player is within the maximum distance
 */
export function checkDistance(app, x, y, sceneName, action) {
  const maxDistance = 250;
  const player = Player.player;
  // If something is wrong, return
  if (
    !player ||
    !app.scenes[sceneName] ||
    (!Player.isMiniSize && sceneName === "mouseholeScene")
  )
    return;

  // Calculate the distance between the player and the clickable area
  const distance = Math.sqrt(
    (player.x - x * app.mainScene.width) ** 2 +
      (player.y - y * app.mainScene.height) ** 2
  );

  // Check if the player is within the maximum distance. If not store the action to be called later
  if (distance <= maxDistance) {
    // Perform the specified action and reset the pending action and checkDistanceParams
    action();
    Player.player.pendingAction = null;
    Player.player.checkDistanceParams = null;
  } else {
    console.log("Too far away, store action to execute later");
    Player.player.pendingAction = action;
    Player.player.checkDistanceParams = { app, x, y, sceneName };
  }
}
export default checkDistance;
