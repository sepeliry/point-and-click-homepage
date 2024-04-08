import * as PIXI from "pixi.js";
import { Container, TextStyle, Text } from "pixi.js";
/**
 *  Class for creating popups that can be passed to an object. Clicking the object opens the popup
 *  Text contents for the popup can be passed to the constructor, including clickable URL text elements
 */
class Popup {
  /**
   * @constructor creates a new closable popup and adds textElements to it
   * @param {PIXI.Application} app -  Pixi application where the popup is added to
   * @param {Object[]} textElements - Array of textElements with the following fields:
   * @param {string} textElements[].text  - The text content of the element
   * @param {Object} textElements[].style - Object that is used to create a PIXI.TextStyle for the element
   * @param {boolean} [textElements[].isUrl=false] - Indicates wheter text element is a clickable URL. Default = false
   * @param {string} [textElements[].url] - the URL to open when the text is clicked (required if isUrl=true)
   */
  constructor(app, textElements, padding = 40, hasCloseButton = false) {
    this.popup = new Container();
    // Flag var to prevent opening same popup multiple times
    this.isOpen = false;

    // Default text styling, used for close button
    this.style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 22,
      fill: "0xffffff",
      lineJoin: "round",
    });

    let maxTextWidth = 0;

    // Determine the longest string and adjust popup width
    // based on its length
    textElements.forEach((element) => {
      const style = new PIXI.TextStyle(element.style);
      const measuredText = new Text(element.text, style);
      maxTextWidth = Math.max(maxTextWidth, measuredText.width);
    });

    this.popupWidth = maxTextWidth + padding;

    //  Loop over the text elements and create text objects for each
    let totalTextHeight = 0;
    this.textElements = textElements.map((element, index) => {
      const style = new TextStyle(element.style);
      const text = new Text(element.text, style);
      text.anchor.set(0.5);
      text.position.set(this.popupWidth / 2, totalTextHeight + padding - 9);
      totalTextHeight += text.height;
      if (element.isUrl) {
        text.eventMode = "static";
        text.cursor = "pointer";
        text.on("pointerdown", (event) => this.openUrl(event, element.url));
      }
      return text;
    });

    if (hasCloseButton) {
      // Close button for the popup
      this.closeText = new Text("Sulje", this.style);
      this.closeText.eventMode = "static";
      this.closeText.cursor = "pointer";
      this.closeText.anchor.set(0.5);
      this.closeText.position.set(this.popupWidth / 2, totalTextHeight + padding)
      totalTextHeight += this.closeText.height;
      this.popupCloseBtn = this.closeText;
      this.popupCloseBtn.on("pointerdown", (event) => {
        this.close(app);
      });
    }

    this.popupHeight = totalTextHeight + padding;

    // Draws a background for the popup
    this.popupBg = new PIXI.Graphics();
    this.popupBg.lineStyle(2, 0xffffff);
    this.popupBg.beginFill(0x1b1b1b);
    this.popupBg.drawRoundedRect(
      0,
      0,
      this.popupWidth,
      this.popupHeight,
      15
    );
    this.popupBg.endFill();
    //this.popupBg.alpha = 0.8;

    this.popup.addChild(this.popupBg);
    this.textElements.forEach((textElement) => {
      this.popup.addChild(textElement);
    });
    hasCloseButton ? this.popup.addChild(this.popupCloseBtn) : null;
  }

  /**
   * Method to open the popup when an object/item is clicked.
   * @param {PIXI.Application} app - Pixi Application where the popup is added
   */
  open(app, x, y, passiveMode = false) {
    if (!this.isOpen) {
      this.isOpen = true;
      this.popup.position.set(x * 1400, y * 800);
      passiveMode ? app.mainScene.eventMode = "passive" : null;
      app.mainScene.addChild(this.popup);

      // Add a slight delay before adding the event listener to close the popup
      setTimeout(() => {
        // Add event listener to close the popup when user clicks anywhere on the screen
        const closePopupHandler = () => {
          this.close(app);
          // Remove the event listener after the popup is closed
          app.stage.off("pointertap", closePopupHandler);
        };
        app.mainScene.on("pointertap", closePopupHandler);
      }, 100);
    }
  }

  /**
   * Method for opening urls leading to other sites when text element is clicked
   * @param {event} -  event Click event
   * @param {string} - url of the page to open when the text is clicked
   */
  openUrl(event, url) {
    window.open(url, "_blank");
    event.stopPropagation();
  }

  /**
   * Method for closing the popup by clicking on text/button
   * @param {PIXI.Application} - app PIXI.Application where the popup is located
   */
  close(app) {
    app.mainScene.removeChild(this.popup);
    app.mainScene.eventMode = "static";
    this.isOpen = false;
  }
}

export default Popup;
