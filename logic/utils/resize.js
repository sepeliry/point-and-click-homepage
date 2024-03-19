// TODO: Pienille ruuduille (puhelin), siirry näkymään jossai vain osa taustasta näkyy ja kamera seuraa pelaajaa
export const resizeGame = (app, gameContainer) => {
  if (gameContainer.visible) {
    // #game-container width and height
    const parent = app.view.parentNode;
    let newWidth = parent.clientWidth;
    let newHeight = parent.clientHeight;

    // Resize the PIXI application to match the new size of the #game-container div
    app.renderer.resize(newWidth, newHeight);
    gameContainer.width = newWidth;
    gameContainer.height = newHeight;
  }
};
