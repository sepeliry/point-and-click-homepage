import * as PIXI from "pixi.js";
// container containing text for popup/dialogs and to display wiki content / etc
export const textContainer = new PIXI.Container();
const style = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 24,
  fontWeight: "bold",
  fill: "#ffffff",
  stroke: "#000000",
  strokeThickness: 5,
  wordWrap: true,
  wordWrapWidth: 440,
});
const text = new PIXI.Text(
  "Lorem ipsum dolor sit amet, consectetur adipiscing",
  style
);
text.anchor.set(0.5);

const urlText = new PIXI.Text("Clickable URL!", style);
urlText.eventMode = "static";
urlText.cursor = "pointer";
urlText.on("pointerdown", openUrl);
urlText.anchor.set(0.5);
urlText.y = text.y + text.height;

export const closeText = new PIXI.Text("Close", style);
closeText.eventMode = "static";
closeText.cursor = "pointer";
closeText.anchor.set(0.5);
closeText.y = urlText.y + urlText.height;

function openUrl(event) {
  window.open("http://example.com", "_blank");
  event.stopPropagation();
}
textContainer.eventMode = "passvive";
textContainer.addChild(text);
textContainer.addChild(urlText);
textContainer.addChild(closeText);

// window.textContainer = container;
// window.textContainer.closeBtn = closeText;
