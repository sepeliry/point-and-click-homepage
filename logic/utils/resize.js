// A function to resize scenes in the game while maintaining the original aspect ratio (7:4)
// Resizes the PixiJs renderer and 'scene' container to match new width and height
export const resizeGame = (app, scene) => {
  if (scene.visible) {
    // #game-container width and height
    const parent = app.canvas.parentNode;
    let newWidth = parent.clientWidth;
    let newHeight = parent.clientHeight;
    let parentAspectRatio = newWidth / newHeight;
    let gameAspectRatio = 1400 / 800;

    // Resize PIXI application to match the new size of the #game-container div

    if (parentAspectRatio < gameAspectRatio) {
      newWidth = newHeight * gameAspectRatio;
    } else {
      newHeight = newWidth / gameAspectRatio;
    }
    app.renderer.resize(newWidth, newHeight);
    scene.width = newWidth;
    scene.height = newHeight;
  }
};
