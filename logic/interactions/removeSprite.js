function removeSprite(app, sprite) {
  Object.entries(app.scenes).forEach(([sceneName, scene]) => {
    //console.log("Processing scene:", sceneName);

    if (scene.children) {
      if (scene.children.includes(sprite)) {
        scene.removeChild(sprite);
      }
    }
  });
}

export default removeSprite;
