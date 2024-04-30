import { Container, Graphics, Text } from "pixi.js";

class Popup {
  static activePopups = [];

  constructor(app, text, position) {
    this.app = app;
    this.text = text;
    this.position = position;
    this.container = new Container();
    this.currentIndex = 0; // index for typing animation
    this.createPopup();
    Popup.activePopups.push(this);

    const updatePosition = () => {
      setTimeout(() => this.updatePopupPosition(), 100);
    };
    window.addEventListener("resize", updatePosition);
    window.addEventListener("fullscreenchange", updatePosition);
    window.addEventListener("orientationchange", updatePosition);
  }
  updatePopupPosition() {
    let popupWidth = 700;
    if (window.innerWidth <= 800) {
      popupWidth = window.innerWidth - 20;
    }

    let popupHeight = 90;
    if (window.innerWidth <= 800) {
      popupHeight = 70;
    }
    if (window.innerWidth < 500) {
      popupHeight = 60;
    }

    if (!this.position) {
      this.container.x = (this.app.screen.width - popupWidth) / 2;
      this.container.y = this.app.screen.height - popupHeight - 10;
    } else {
      this.container.x = this.position.x * this.app.screen.width;
      this.container.y = this.position.y * this.app.screen.height;
    }
  }
  createPopup() {
    let popupWidth = 700;
    const padding = 20;

    // Adjust popup width for smaller screens
    if (window.innerWidth <= 800) {
      popupWidth = window.innerWidth - 20;
    }

    // Adjust popup height dynamically
    let popupHeight = 90; // Default height for large screens

    // Adjust font size dynamically
    let baseFontSize = 20;
    if (window.innerWidth <= 800) {
      baseFontSize = 16; // Smaller base font size for smaller screens
      popupHeight = 70; // Slightly smaller height for medium screens
    }
    if (window.innerWidth < 500) {
      baseFontSize = 14; // Even smaller for very small screens
      popupHeight = 60; // Even smaller height for small screens
    }

    // Create background for the popup
    const background = new Graphics();
    background.rect(0, 0, popupWidth, popupHeight);
    background.fill("#020D26");
    background.stroke({ width: 2, color: "#F54483" });
    background.alpha = 0.9;
    this.container.addChild(background);

    // Apply scaling factor for high DPI screens
    const scaleFactor = window.devicePixelRatio > 1 ? 0.8 : 1;
    const fontSize = baseFontSize * scaleFactor;

    // Text configuration with dynamic font size and adjusted word wrap width
    const style = {
      fontFamily: "VCR_OSD_MONO",
      fill: "#F54483",
      fontSize: fontSize,
      wordWrap: true,
      wordWrapWidth: popupWidth - 40,
    };
    const message = new Text({ text: "", style });
    message.anchor.set(0, 0);
    message.position.set(padding, padding);
    this.container.addChild(message);

    // Position of the popup
    if (!this.position) {
      this.container.x = (this.app.screen.width - popupWidth) / 2;
      this.container.y = this.app.screen.height - popupHeight - 10;
    } else {
      this.container.x = this.position.x * this.app.screen.width;
      this.container.y = this.position.y * this.app.screen.height;
    }

    this.app.stage.addChild(this.container);

    // Start typing and setup the closing event listener after it finishes
    this.typeText(message, () => {
      const closePopupHandler = () => {
        this.closePopup();
        this.app.mainScene.off("pointertap", closePopupHandler);
        if (this.closeCallback) {
          this.closeCallback();
        }
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

  onClose(callback) {
    this.closeCallback = callback;
  }
}

export default Popup;
