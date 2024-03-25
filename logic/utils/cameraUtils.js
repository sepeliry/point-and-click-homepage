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
