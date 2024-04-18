import * as PIXI from "pixi.js";

class Popup {
  static activePopups = [];

  constructor(app, text, position) {
    this.app = app;
    this.text = text;
    this.position = position;
    this.container = new PIXI.Container();
    this.currentIndex = 0; // index for typing animation
    this.createPopup();
    Popup.activePopups.push(this);
  }

  createPopup() {
    let popupWidth = 600;
    const padding = 20;

    if (window.innerWidth <= 800) {
      popupWidth = window.innerWidth - 20;
    }

    const popupHeight = 90;

    // background for the popup
    const background = new PIXI.Graphics();
    background.lineStyle(2, "#F54483");
    background.beginFill("#020D26");
    background.drawRect(0, 0, popupWidth, popupHeight);
    background.endFill();
    background.alpha = 0.9;
    this.container.addChild(background);

    // text for the popup
    const message = new PIXI.Text("", {
      fill: "#F54483",
      fontSize: 20,
      wordWrap: true,
      wordWrapWidth: popupWidth - 40, // adjusted for padding
    });
    message.anchor.set(0, 0);
    message.position.set(padding, padding);
    this.container.addChild(message);

    // position of the popup
    if (!this.position) {
      this.container.x = (window.innerWidth - popupWidth) / 2;
      this.container.y = window.innerHeight - popupHeight - 20;
    } else {
      this.container.x = this.position.x * window.innerWidth;
      this.container.y = this.position.y * window.innerHeight;
    }

    this.app.stage.addChild(this.container);

    // start typing and setup the closing event listener after it finishes
    this.typeText(message, () => {
      const closePopupHandler = () => {
        this.closePopup();
        // remove the event listener after the popup is closed
        this.app.mainScene.off("pointertap", closePopupHandler);
      };
      this.app.mainScene.on("pointertap", closePopupHandler);
    });
  }

  typeText(message, onComplete) {
    // text typing animation
    const typingAnimationSpeed = 30;
    if (this.currentIndex <= this.text.length) {
      message.text = this.text.substring(0, this.currentIndex);
      this.currentIndex++;
      setTimeout(
        () => this.typeText(message, onComplete),
        typingAnimationSpeed
      );
    } else if (onComplete) {
      onComplete();
    }
  }

  closePopup() {
    this.app.stage.removeChild(this.container);
    Popup.activePopups = Popup.activePopups.filter((popup) => popup !== this);
  }
}

export default Popup;
