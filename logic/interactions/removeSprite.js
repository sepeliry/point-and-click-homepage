function removeSprite(app, sprite) {
  Object.entries(app.scenes).forEach(([sceneName, scene]) => {
    //console.log("Processing scene:", sceneName);

    if (scene.children) {
      if (scene.children.includes(sprite)) {
        scene.removeChild(sprite);
        console.log("Sprite has been removed from the stage.");
      }
    }
  });
}

export default removeSprite;
