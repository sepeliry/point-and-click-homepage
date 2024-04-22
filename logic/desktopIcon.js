import { Container, Sprite, Text } from "pixi.js";
import { GlowFilter } from "@pixi/filter-glow";
import { ASPECT_RATIO } from "../constants/constants";

class DesktopIcon {
  constructor(app, container, itemData) {
    this.app = app;
    this.container = container;
    this.itemData = itemData;

    // Create a container for the sprite and text
    this.iconContainer = new Container();

    this.iconContainer.x = itemData.location.x * 1400;
    this.iconContainer.y = itemData.location.y * 800;
    this.iconContainer.zIndex = itemData.zIndex || 1;

    // Create the sprite from an image
    this.sprite = Sprite.from(itemData.image);
    this.sprite.name = itemData.name;
    this.sprite.height = itemData.height;
    this.sprite.width = itemData.width;
    this.sprite.anchor.set(0.5, 1);

    // add text label under the sprite
    this.textLabel = new Text(itemData.title || "", {
      fontFamily: "VCR_OSD_MONO",
      fontSize: 18,
      fill: 0xffffff,
      stroke: 0x000000, // Black outline color
      strokeThickness: 4,
      align: "center",
      wordWrap: true,
      wordWrapWidth: this.sprite.width + 10,
      dropShadow: false,
      dropShadowColor: 0x000000,
      dropShadowBlur: 6,
      dropShadowDistance: 4,
    });
    this.textLabel.anchor.set(0.5, 0); // anchor text at the center top
    this.textLabel.y = this.sprite.y + 10; // position text right below the sprite

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
