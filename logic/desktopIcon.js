import * as PIXI from "pixi.js";
import { GlowFilter } from "@pixi/filter-glow";

class DesktopIcon {
  constructor(app, container, itemData) {
    this.app = app;
    this.container = container;
    this.itemData = itemData;

    // Create a container for the sprite and text
    this.iconContainer = new PIXI.Container();
    this.iconContainer.x = itemData.location.x * app.renderer.width;
    this.iconContainer.y = itemData.location.y * app.renderer.height;
    this.iconContainer.zIndex = itemData.zIndex || 1;

    // Create the sprite from an image
    this.sprite = PIXI.Sprite.from(itemData.image);
    this.sprite.name = itemData.name;
    this.sprite.height = itemData.height;
    this.sprite.width = itemData.width;
    this.sprite.anchor.set(0.5, 1);

    // add text label under the sprite
    this.textLabel = new PIXI.Text(itemData.title || "", {
      fontFamily: "Arial",
      fontSize: 16,
      fontWeight: "bold",
      fill: 0xffffff,
      align: "center",
      wordWrap: true,
      wordWrapWidth: this.sprite.width,
      dropShadow: true,
      dropShadowColor: 0x000000,
      dropShadowBlur: 6,
      dropShadowDistance: 4,
    });
    this.textLabel.anchor.set(0.5, 0); // anchor text at the center top
    this.textLabel.y = this.sprite.y + 4; // position text right below the sprite

    this.iconContainer.addChild(this.sprite);
    this.iconContainer.addChild(this.textLabel);

    if (itemData.onInteraction) {
      this.setupInteraction(itemData.onInteraction);
    }

    this.iconContainer.visible = true;
    container.addChild(this.iconContainer);
  }

  setupInteraction(onInteraction) {
    this.iconContainer.interactive = true;
    this.iconContainer.buttonMode = true;
    this.iconContainer.cursor = "pointer";

    this.iconContainer.on("pointerdown", onInteraction(this.app));

    const glowEffect = new GlowFilter({
      innerStrength: 1,
      outerStrength: 1,
      quality: 0.1,
    });

    //  this.iconContainer.filters = [glowEffect];
  }
}

export default DesktopIcon;
