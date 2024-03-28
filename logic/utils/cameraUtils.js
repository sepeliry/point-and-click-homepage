export const moveCamera = (app, cameraContainer, direction) => {
  const gameWorldWidth = 1400;
  const appWidth = app.screen.width;
  if (direction == "left" && cameraContainer.x < 0) {
    cameraContainer.x += 400;
    console.log("Direction left, new x: " + cameraContainer.x);
  } else if (
    direction == "right" &&
    cameraContainer.x > -(gameWorldWidth - appWidth)
  ) {
    cameraContainer.x -= 400;
    console.log("Direction right, new x: " + cameraContainer.x);
  }
};
export const followPlayer = (app, cameraContainer, player) => {
  const gameWorldWidth = 1400;
  const gameWorldHeight = 800;
  const appWidth = app.screen.width;
  const appHeight = app.screen.height;
  const playerX = player.position.x;
  let newX = -playerX + appWidth / 2;
  // Ensure camera doesn't go over the sides
  if (newX > 0) {
    newX = 0;
  } else if (newX < -(gameWorldWidth - appWidth)) {
    newX = -(gameWorldWidth - appWidth);
  }
  cameraContainer.x = newX;

  // Camera only follows the player on x-axis, if screenheight is larger than gameWorld height
  if (appHeight < 800) {
    const playerY = player.position.y;
    let newY = -playerY + appHeight - 80;
    // ensure camera doesn't go over top or bottom
    if (newY > 0) {
      newY = 0;
    } else if (newY < -(gameWorldHeight - appHeight)) {
      newY = -(gameWorldHeight - appHeight);
    }
    cameraContainer.y = newY;
  }
};
