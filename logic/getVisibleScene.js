export function getVisibleScene(app) {
    // Iterate through all scenes and return the first visible one
    for (const sceneName in app.scenes) {
        if (app.scenes.hasOwnProperty(sceneName)) {
            const scene = app.scenes[sceneName];
            if (scene.visible) {
                return scene;
            }
        }
    }
    // Return null if no visible scene is found
    return null;
}