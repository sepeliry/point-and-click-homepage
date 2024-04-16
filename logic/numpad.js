import gameState from "../data/gameState";
import updateText from "./utils/updateText";

const CORRECT_CODE = "3216";
const CODE_LENGTH = 4;

class Numpad {
  constructor() {
    // Reference to the text element
    this.codeTextElement = null;
  }

  // Method to set the reference to the text element
  static setCodeText(textElement) {
    this.codeTextElement = textElement;
  }

  static enterCode() {
    /**
     * Enters the code and checks if it matches the correct code.
     * If the code is correct, displays "Correct" on the screen.
     * If the code is incorrect, resets the screen.
     */
    if (this.codeTextElement.text === CORRECT_CODE) {
      this.updateText("*Correct*");
      // wait
      setTimeout(() => {
        gameState.hasUnlockedDoor = true;
      }, 1000);
    } else {
      this.updateText("*Incorrect*");

      // Wait before resetting the screen
      setTimeout(() => {
        this.resetCode();
      }, 1500);
    }
  }

  static resetCode() {
    /**
     * Resets the screen
     */
    this.updateText("");
  }

  static inputCode(numberValue) {
    // is called when player clicks a button on the numpad
    // this.codeTextElement.text is the text object from numpadScene's gameData
    const newText = this.codeTextElement.text + numberValue;

    // Update the screen text only if the new text length is less than or equal to the code length
    if (newText.length <= CODE_LENGTH) {
      this.updateText(newText);
    }
  }

  static updateText(newText) {
    if (this.codeTextElement) {
      this.codeTextElement.text = newText;
    }
  }
}

export default Numpad;
