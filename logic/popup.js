import * as PIXI from 'pixi.js';
import { Container, TextStyle, Text } from "pixi.js";

class Popup {
    // TODO: set more usable parameters (app, text, ...)
    constructor(app) {
        // Popup for displaying text content
        this.popup = new Container();
        this.popupWidth = app.screen.width / 3;
        this.popupHeight = app.screen.height / 3;
        // Flag var to prevent opening same popup multiple times
        this.isOpen = false;

        // Create background graphic
        this.popupBg = new PIXI.Graphics();
        this.popupBg.beginFill(0xced4da);
        this.popupBg.drawRoundedRect(0, 0, this.popupWidth, this.popupHeight + 75, 15);
        this.popupBg.endFill();
        this.popupBg.alpha = 0.5;


        // Style the text
        this.style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 24,
            fontWeight: "bold",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 5,
            wordWrap: true,
            wordWrapWidth: 440,
        });

        this.text = new Text(
            "Lorem ipsum dolor sit amet, consectetur adipiscing",
            this.style
        );
        this.text.anchor.set(0.5);
        this.text.x = (this.popupWidth) / 2;
        this.text.y = (this.popupHeight) / 2;

        // Create Clickable URL
        this.urlText = new Text("Clickable URL!", this.style);
        this.urlText.interactive = true;
        this.urlText.cursor = "pointer";
        this.urlText.on("pointerdown", (event) => this.openUrl(event));
        this.urlText.anchor.set(0.5);
        this.urlText.x = (this.popupWidth) / 2;
        this.urlText.y = this.text.y + this.text.height;

        // Create Close-button
        this.closeText = new Text("Close", this.style);
        this.closeText.eventMode = "static";
        this.closeText.cursor = "pointer";
        this.closeText.anchor.set(0.5);
        this.closeText.x = (this.popupWidth) / 2;
        this.closeText.y = this.urlText.y + this.urlText.height;

        this.popupCloseBtn = this.closeText;
        this.popupCloseBtn.on("pointerdown", () => this.close(app));

        // Create popup
        this.popup.addChild(this.popupBg);
        this.popup.addChild(this.text);
        this.popup.addChild(this.urlText);
        this.popup.addChild(this.popupCloseBtn);
    }

    open(app) {
        // Opens the popup and sets its visibility.
        if (!this.isOpen) {
            this.isOpen = true;
            this.popup.x = (app.screen.width - this.popupWidth) / 2;
            this.popup.y = (app.screen.height - this.popupHeight) / 2;
            app.stage.interactive = false;
            app.stage.addChild(this.popup);
        }
    }

    openUrl(event) {
        window.open("http://example.com", "_blank");
        event.stopPropagation();
    }

    close(app, obj) {
        this.isOpen = false;

        app.stage.removeChild(this.popup);
        app.stage.eventMode = "static";
    }
}

export default Popup;