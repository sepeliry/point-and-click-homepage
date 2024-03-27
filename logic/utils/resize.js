export const resizeGame = (app, mainScene) => {
  if (mainScene.visible) {
    // #game-container width and height
    const parent = app.view.parentNode;
    let newWidth = parent.clientWidth;
    let newHeight = parent.clientHeight;

    // Resize the PIXI application to match the new size of the #game-container div
    app.renderer.resize(newWidth, newHeight);
    mainScene.width = newWidth;
    mainScene.height = newHeight;
  }
};
