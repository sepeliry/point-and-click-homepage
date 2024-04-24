import { Container, Sprite, Text, Assets } from "pixi.js";
import { GlowFilter } from "@pixi/filter-glow";
import { ASPECT_RATIO } from "../constants/constants";

class DesktopIcon {
  constructor(app, container, itemData) {
    this.app = app;
    this.container = container;
    this.itemData = itemData;
    this.iconContainer = new Container();
  }

  static async create(app, container, itemData) {
    const icon = new DesktopIcon(app, container, itemData);
    await icon.initialize();
    return icon;
  }

  async initialize() {
    // Load the asset
    await Assets.load([this.itemData.image]);

    // Setup the container properties
    this.iconContainer.x = this.itemData.location.x * 1400;
    this.iconContainer.y = this.itemData.location.y * 800;
    this.iconContainer.zIndex = this.itemData.zIndex || 1;

    // Create the sprite from the loaded image
    this.sprite = Sprite.from(this.itemData.image);
    this.sprite.label = this.itemData.name;
    this.sprite.height = this.itemData.height;
    this.sprite.width = this.itemData.width;
    this.sprite.anchor.set(0.5, 1);

    // Setup text label
    this.setupTextLabel();

    // Add children
    this.iconContainer.addChild(this.sprite);
    this.iconContainer.addChild(this.textLabel);

    // Setup interactions if applicable
    if (this.itemData.onInteraction) {
      this.setupInteraction(this.itemData.onInteraction);
    }

    this.iconContainer.visible = true;
    this.container.addChild(this.iconContainer);
  }

  setupTextLabel() {
    const style = {
      fontFamily: "VCR_OSD_MONO",
      fontSize: 18,
      fill: 0xffffff,
      stroke: { color: 0x000000, width: 4 },
      align: "center",
      wordWrap: true,
      wordWrapWidth: this.sprite.width + 10,
      dropShadow: false,
      dropShadowColor: 0x000000,
      dropShadowBlur: 6,
      dropShadowDistance: 4,
    };
    this.textLabel = new Text({ text: this.itemData.title || "", style });
    this.textLabel.anchor.set(0.5, 0);
    this.textLabel.y = this.sprite.y + 10;
  }

  setupInteraction(onInteraction) {
    this.iconContainer.interactive = true;
    this.iconContainer.buttonMode = true;
    this.iconContainer.cursor = "pointer";
    this.iconContainer.on("pointerdown", onInteraction(this.app));
    // Optional: Apply effects like a glow filter here
  }
}

export default DesktopIcon;
