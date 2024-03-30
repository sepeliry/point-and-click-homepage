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
    // On desktop call resize to ensure scene matches current window size
    if (!window.isMobile) {
      resizeGame(app, app.scenes[newSceneName]);
    }
  } else {
    console.warn("Scene not found:", newSceneName);
  }
}

export default switchScene;
