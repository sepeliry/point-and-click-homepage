import gameState from "../../data/gameState";
import { ASPECT_RATIO, MAX_HEIGHT, MAX_WIDTH } from "../../constants/constants";

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

export const updateCamera = (app, cameraContainer, player) => {
  /*
  if (window.innerWidth >= MAX_WIDTH) {
    cameraContainer.x = 0;
    cameraContainer.y = 0;
    return;
  }
  */

  const targetHeight = Math.min(window.innerHeight, screen.height); // Always use the full height of the window
  let targetWidth = targetHeight * ASPECT_RATIO; // Calculate width based on the aspect ratio

  // Check if the calculated width exceeds the window's width
  if (targetWidth > window.innerWidth) {
    targetWidth = window.innerWidth; // Adjust width to fit the window
  }

  // Resize the renderer to the calculated dimensions
  app.renderer.resize(targetWidth, targetHeight);

  // Update game world dimensions to maximum values
  const gameWorldWidth = 1650; // Assumed game world width
  const gameWorldHeight = 1000; // Assumed game world height

  // Calculate new camera positions to keep player centered
  let newX = -player.position.x + targetWidth / 2;
  let newY = -player.position.y + targetHeight / 2;

  // Constrain newX to ensure the camera doesn't go outside the game world
  newX = Math.min(newX, 0); // Prevent camera from showing left beyond game world
  newX = Math.max(newX, targetWidth - gameWorldWidth); // Correct right boundary calculation

  newY = Math.min(newY, 0); // Prevent camera from showing above the game world
  newY = Math.max(newY, -(gameWorldHeight - targetHeight)); // Prevent camera from showing below the game world

  // Set cameraContainer positions
  cameraContainer.x = newX;
  cameraContainer.y = 0;
};

export const followPlayer = (app, cameraContainer, player) => {
  console.log(window.innerWidth);
  if (window.innerWidth <= 1000) {
    const gameWorldWidth = window.innerWidth;
    const gameWorldHeight = 800;
    const appWidth = window.innerWidth;
    const appHeight = app.view.height;
    const playerX = player.position.x;
    let newX = -playerX + appWidth / 2;
    // Ensure camera doesn't go over the sides
    if (appWidth < 1400) {
      if (newX > 0) {
        newX = 0;
      } else if (newX < -(gameWorldWidth - appWidth)) {
        newX = -(gameWorldWidth - appWidth);
      }
      cameraContainer.x = newX;
    }
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
  }
};
