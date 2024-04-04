import updateText from "./utils/updateText";

const CORRECT_CODE = "1111";
const CODE_LENGTH = 4;

class Numpad {
  constructor() {
    // keeping track of the current code
    Numpad.currentCode = "";
  }
  static enterCode(app) {
    /**
     * Enters the code and checks if it matches the correct code.
     * If the code is correct, displays "Correct" on the screen.
     * If the code is incorrect, resets the screen.
     */
    if (Numpad.currentCode === CORRECT_CODE) {
      updateText(app.scenes["numpadScene"].children[1], "*Correct*");
    } else {
      updateText(app.scenes["numpadScene"].children[1], "*Incorrect*");

      // Wait for 2 seconds before resetting the screen
      setTimeout(() => {
        this.resetCode(app);
        Numpad.currentCode = "";
      }, 2000);
    }
  }

  static resetCode(app) {
    /**
     * Resets the screen
     */
    updateText(app.scenes["numpadScene"].children[1], "");
  }

  static inputCode(app, numberValue) {
    // is called when player clicks a button on the numpad
    // app.scenes["numpadScene"].children[1].text is the text object from numpadScene's gameData
    Numpad.currentCode = app.scenes["numpadScene"].children[1].text;

    if (Numpad.currentCode.length < CODE_LENGTH) {
      const newValue = (app.scenes["numpadScene"].children[1].text +=
        numberValue);
      Numpad.currentCode = newValue;
      updateText(app.scenes["numpadScene"].children[1], newValue);
    }
  }
}
export default Numpad;
