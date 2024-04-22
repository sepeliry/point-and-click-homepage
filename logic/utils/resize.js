// A function to resize scenes in the game while maintaining the original aspect ratio (7:4)
// Resizes the PixiJs renderer and 'scene' container to match new width and height
export const resizeGame = (app, scene) => {
  if (
    scene.visible //&& !window.isMobile
  ) {
    // #game-container width and height
    const parent = app.view.parentNode;
    let newWidth = parent.clientWidth;
    let newHeight = parent.clientHeight;
    let parentAspectRatio = newWidth / newHeight;
    let gameAspectRatio = 1400 / 800;

    // Resize PIXI application to match the new size of the #game-container div

    if (parentAspectRatio < gameAspectRatio) {
      newWidth = newHeight * gameAspectRatio;
      console.log("new width", newWidth);
    } else {
      newHeight = newWidth / gameAspectRatio;
      console.log("new height:", newHeight);
    }
    app.renderer.resize(newWidth, newHeight);
    scene.width = newWidth;
    scene.height = newHeight;

    console.log(parentAspectRatio);
    console.log("scene", scene.width);
    console.log("scene height:", scene.height);
  }
};
