// Remove sprite from overworld
function removeSprite(app, sprite) {
  Object.entries(app.scenes).forEach(([sceneName, scene]) => {
    if (scene.children) {
      if (scene.children.includes(sprite)) {
        sprite.visible = false;
        //scene.removeChild(sprite);
      }
    }
  });
}

export default removeSprite;
