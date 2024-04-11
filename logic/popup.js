import * as PIXI from "pixi.js";

class Popup {
  constructor(app, text, position) {
    this.app = app;
    this.text = text; // string
    this.position = position; // for example: {x: 10, y: 20}
    this.container = new PIXI.Container();
    this.createPopup();
  }

  createPopup() {
    let popupWidth = 600;
    const padding = 20;

    if (this.app.screen.width <= 800) {
      popupWidth = this.app.screen.width - 20;
    }

    const popupHeight = 90;

    // background for the popup
    const background = new PIXI.Graphics();
    background.lineStyle(2, "#F54483", 1);
    background.beginFill("#020D26");
    background.drawRect(0, 0, popupWidth, popupHeight);
    background.endFill();
    background.alpha = 0.9;
    this.container.addChild(background);

    // text for the popup
    const message = new PIXI.Text(this.text, {
      fill: "#F54483",
      fontSize: 20,
      wordWrap: true,
      wordWrapWidth: popupWidth - 20, // -20 so text does not go too close to the right border
    });

    // If no position is provided, center the popup horizontally and place it at the bottom vertically
    if (!this.position) {
      // Horizontally center: (app's width - container's width) / 2
      // Vertically at the bottom: app's height - container's height - some margin (e.g., 20px)
      this.container.x = (this.app.screen.width - this.container.width) / 2;
      this.container.y = this.app.screen.height - this.container.height - 20;
    } else {
      // otherwise use the provided position
      this.container.x = this.position.x * this.app.screen.width;
      this.container.y = this.position.y * this.app.screen.height;
    }

    message.anchor.set(0, 0);
    message.position.set(padding, padding); // padding from background
    this.container.addChild(message);
    // dd the container to the PixiJS application
    this.app.stage.addChild(this.container);

    // Add a slight delay before adding the event listener to close the popup
    setTimeout(() => {
      // Add event listener to close the popup when user clicks anywhere on the screen
      const closePopupHandler = () => {
        this.closePopup();
        // Remove the event listener after the popup is closed
        this.app.stage.off("pointertap", closePopupHandler);
      };
      this.app.mainScene.on("pointertap", closePopupHandler);
    }, 100);
  }

  closePopup() {
    this.app.stage.removeChild(this.container);
  }
}

export default Popup;
