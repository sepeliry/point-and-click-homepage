import * as PIXI from "pixi.js";
import { checkDistance } from "./interactions/distanceCheckUtils";
import Player from "./player";
import { GlowFilter } from "@pixi/filter-glow";
import switchScene from "./interactions/switchScene";

class Numpad {
  /**
   * @costructor Creates a numpad instance with a screen and number buttons
   * @param {PIXI.Application} app - Pixi application where the numpad is placed
   */
  constructor(app, ui) {
    this.numpadScene = ui.getScene(app, "numpadScene");

    /* TODO: interactions: add distance check to gameData
            checkDistance(Player.player, numpadMapping, maxDistance, () => {
                switchScene(app, "numpadScene");
            });
        */

    // Text style for code display
    const screenstyle = new PIXI.TextStyle({
      breakWords: true,
      dropShadow: true,
      dropShadowAlpha: 0.1,
      dropShadowAngle: 0.6,
      dropShadowDistance: 3,
      fill: "#fff0ff",
      fontFamily: "Lucida Console",
      fontSize: 60,
      align: "left",
      fontWeight: "bold",
      letterSpacing: 20,
      stroke: "#edceeb",
      strokeThickness: 1,
      wordWrap: false,
      wordWrapWidth: 600,
      lineHeight: 117,
    });

    // Create screen for code display
    this.screenContainer = new PIXI.Container();
    this.screen = new PIXI.Text("", screenstyle);
    this.screen.x = this.numpadScene.width / 4;
    this.screen.y = this.numpadScene.height / 6.8;
    this.screen.visible = true;
    this.numpadScene.addChild(this.screen);
    this.numpadScene.addChild(this.screenContainer);

    this.glowEffect = new GlowFilter({
      innerStrength: 0.7,
      outerStrength: 0.7,
      quality: 0.1,
    });

    // Create buttons for numpad
    this.one = this.createNumpadButton(app, 0.31, 0.41, 0.2, 0.1, 1);
    this.two = this.createNumpadButton(app, 0.5, 0.41, 0.2, 0.1, 2);
    this.three = this.createNumpadButton(app, 0.7, 0.41, 0.2, 0.1, 3);

    this.four = this.createNumpadButton(app, 0.31, 0.56, 0.2, 0.1, 4);
    this.five = this.createNumpadButton(app, 0.5, 0.56, 0.2, 0.1, 5);
    this.six = this.createNumpadButton(app, 0.7, 0.56, 0.2, 0.1, 6);

    this.seven = this.createNumpadButton(app, 0.31, 0.71, 0.2, 0.1, 7);
    this.eight = this.createNumpadButton(app, 0.5, 0.71, 0.2, 0.1, 8);
    this.nine = this.createNumpadButton(app, 0.7, 0.71, 0.2, 0.1, 9);

    this.reset = this.createNumpadButton(app, 0.31, 0.86, 0.2, 0.1, "reset");
    this.zero = this.createNumpadButton(app, 0.5, 0.86, 0.2, 0.1, 0);
    this.ok = this.createNumpadButton(app, 0.7, 0.86, 0.2, 0.1, "OK");
  }

  enterCode() {
    /**
     * Enters the code and checks if it matches the correct code.
     * If the code is correct, displays "Correct" on the screen.
     * If the code is incorrect, resets the screen.
     */
    const correctCode = "1111";
    if (this.screen.text === correctCode) {
      this.screen.text = "**Correct**";
    } else {
      this.screen.text = "Incorrect";

      // Wait for 2 seconds before resetting the screen
      setTimeout(() => {
        this.resetScreen();
      }, 2000);
    }
  }

  resetScreen() {
    /**
     * Resets the screen
     */
    this.screen.text = "";
  }
  updateScreen(numberValue) {
    /**
     * Updates the screen when a number button is pressed.
     * @param {number} numberValue - Numerical value to be added to screen.
     */
    // Update the above screen with the clicked number
    if (numberValue !== "OK") {
      if (this.screen.text.length < 4) {
        if (this.screen.text == "") {
          this.screen.text = numberValue;
        } else {
          this.screen.text += numberValue;
        }
      }
    }
  }
  createNumpadButton(app, x, y, width, height, value) {
    /**
     * Creates clickable, numbered buttons for numpad instance.
     * Creates reset and OK buttons
     * @param {PIXI.Application} app - Pixi application where the object is placed
     * @param {number} x - button x-position
     * @param {number} y - button y-position
     * @param {number} width - button width
     * @param {number} height - button height
     * @param {string} value - button value
     * @returns {PIXI.Graphics} - button as graphics object
     */

    const button = new PIXI.Graphics();

    //button.beginFill(0x00FF00);
    button.drawRect(x, y, width, height);
    button.x = x * app.renderer.width;
    button.y = y * app.renderer.height;
    button.interactive = true;
    button.buttonMode = true;
    button.cursor = "pointer";
    button.numberValue = value;

    // Calculate a fontsize using the original fontsize (55) to support smaller screens
    const originalWidth = 1400;
    const originalHeight = 800;
    const currentWidth = app.renderer.width;
    const currentHeight = app.renderer.height;
    const ratio = Math.min(
      currentWidth / originalWidth,
      currentHeight / originalHeight
    );

    // Calculate the font size based on the ratio
    const fontSize = 55 * ratio;

    // Text style for code display
    const style = new PIXI.TextStyle({
      breakWords: true,
      dropShadow: true,
      dropShadowAlpha: 0.1,
      dropShadowAngle: 0.6,
      dropShadowDistance: 3,
      fill: "#fff0ff",
      fontFamily: "Lucida Console",
      fontSize: fontSize,
      fontWeight: "bold",
      stroke: "#edceeb",
      strokeThickness: 1,
      wordWrap: true,
      wordWrapWidth: 600,
      lineHeight: 117,
    });

    const number = new PIXI.Text(value, style);
    //number.eventMode = "static";
    number.visible = true;
    number.anchor.set(0.5); // Center the text within the button
    number.position.set(x + width / 2, y + height / 2);
    button.addChild(number);

    // Number buttons can be clicked -> add clicked number to screen
    if (value === "OK") {
      button.on("pointerdown", () => {
        this.enterCode();
      });
    }
    if (value !== "reset") {
      button.on("pointerdown", () => {
        this.updateScreen(button.numberValue);
      });
    } else {
      button.on("pointerdown", () => {
        this.resetScreen();
      });
    }

    this.numpadScene.addChild(button);
    return button;
  }
}
export default Numpad;
