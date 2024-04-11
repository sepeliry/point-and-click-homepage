import * as PIXI from "pixi.js";

// update PixiJS Text object
function updateText(textObject, newText) {
  if (textObject instanceof PIXI.Text) {
    textObject.text = newText;
  } else {
    console.error("Invalid PIXI Text object provided.");
  }
}
export default updateText;