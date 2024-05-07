import { GlowFilter } from "pixi-filters";
import { Text } from "pixi.js";

class TextItem {
  constructor(app, container, itemData) {
    const style = itemData.style;
    const text = new Text({ text: itemData.text, style });
    text.x = itemData.location.x * 1400;
    text.y = itemData.location.y * 800;
    text.visible = true;
    text.zIndex = itemData.zIndex;
    text.onStateChange = itemData.onStateChange;
    text.anchor.set(0.5, 0);
    text.interactiveChildren = false;
    if (itemData.identifier) {
      text.identifier = itemData.identifier;
    }

    if (itemData.onInteraction) {
      text.interactive = true;
      text.buttonMode = true;
      text.eventMode = "dynamic";
      text.cursor = "pointer";
      text.on("pointerdown", itemData.onInteraction(app, text));

      const glowEffect = new GlowFilter({
        innerStrength: 0,
        outerStrength: 1.8,
        quality: 0.1,
        alpha: 0.6,
        color: "c061cb",
      });
      text.filters = [glowEffect];
    } else {
      text.interactive = false;
    }

    container.addChild(text);
    return text;
  }
}

export default TextItem;
