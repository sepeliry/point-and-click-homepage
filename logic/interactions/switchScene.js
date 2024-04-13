import { resizeGame } from "../utils/resize";
function switchScene(app, newSceneName) {
  // hide wiki text
  document.getElementById("wiki-wrapper").style.display = "none";

  // Hide all scenes
  Object.values(app.scenes).forEach((scene) => (scene.visible = false));
  // Show the new scene
  const newSceneContainer = app.scenes[newSceneName];
  if (newSceneContainer) {
    newSceneContainer.visible = true;
    app.gameState.currentScene = newSceneName;
    // Call resize to ensure scene matches current window size
    resizeGame(app, app.scenes[newSceneName]);
  } else {
    console.warn("Scene not found:", newSceneName);
  }
}

export default switchScene;
