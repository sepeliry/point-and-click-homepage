/**
 * Function to open display wiki content as HTML when a ingame object is clicked
 * @param {PIXI.Application} app - The pixi application where the object is located at
 * @param {PIXI.Container} gameContainer - Main PIXI.Container for the game
 * @param {string} htmlContent - Wiki content transformed from markdown to html to be displayed
 * @returns {function} - Function that opens the wiki content and hides the game
 */
export function handleMarkdownClick(app, gameContainer, htmlContent) {
  return function (event) {
    const container = document.getElementById("markdown-container");
    const backBtn = `<button id="back-btn">Takaisin</button>`;
    container.style.display = "flex";
    container.innerHTML = "";
    container.innerHTML = backBtn + htmlContent;

    // Hide the application and stop it from listening to events
    app.stage.visible = false;
    gameContainer.eventMode = "none";
    document.getElementById("game-container").style.display = "none";

    // Clears the content and turns the game back to visible
    document.getElementById("back-btn").addEventListener("click", () => {
      container.innerHTML = "";
      container.style.display = "none";
      document.getElementById("game-container").style.display = "";
      app.stage.visible = true;
      gameContainer.eventMode = "static";
    });
  };
}
