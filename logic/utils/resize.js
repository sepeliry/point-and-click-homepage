export const resizeGame = (app, mainScene) => {
  if (app.mainScene.visible) {
    // #game-container width and height
    const parent = app.view.parentNode;
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
    app.mainScene.width = newWidth;
    app.mainScene.height = newHeight;
  }
};
