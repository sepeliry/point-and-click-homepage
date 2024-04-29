import { Text } from "pixi.js";

// update a PixiJS Text object
function updateText(textObject, newText) {
  if (textObject instanceof Text) {
    textObject.text = newText;
  } else {
    console.error("Invalid PIXI Text object provided.");
  }
}
export default updateText;