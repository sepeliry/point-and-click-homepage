import { Container, TextStyle, Text } from "pixi.js";

class TextContainer {
  constructor() {
    this.container = new Container();
    const style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 24,
      fontWeight: "bold",
      fill: "#ffffff",
      stroke: "#000000",
      strokeThickness: 5,
      wordWrap: true,
      wordWrapWidth: 440,
    });
  }
}

export { TextContainer };