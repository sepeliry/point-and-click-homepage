import { Application } from "pixi.js";

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
window.isMobile = windowWidth <= 800;

export function setupPixiApp() {
  const container = document.getElementById("game-container");
  if (!container) {
    console.error("game-container not found");
    return null; // Or handle this scenario appropriately
  }

  const app = new Application < Renderer > ({
    width: window.isMobile ? Math.min(windowWidth, 1400) : 1400,
    height: window.isMobile ? Math.min(windowHeight, 800) : 800,
    backgroundColor: 0xaaaaaa,
  });

  container.appendChild(app.view);

  const parent = app.view.parentNode;
  let newWidth = parent.clientWidth;
  let newHeight = parent.clientHeight;
  let parentAspectRatio = newWidth / newHeight;
  let gameAspectRatio = 1400 / 800;

  if (parentAspectRatio < gameAspectRatio) {
    newWidth = newHeight * gameAspectRatio;
  } else {
    newHeight = newWidth / gameAspectRatio;
  }

  app.renderer.resize(newWidth, newHeight);

  return app;
}
