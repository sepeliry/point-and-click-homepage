// Pikaiset kokeilut PDF esittämiseen käyttäen HTMl <Object>
// PDFJs avulla luultavasti saa viimeisellymmän näkymän ja sulavemmin sisälletyä sisällöt peliin
import { pdfFiles } from "../../data/pdfFiles";
import * as PIXI from "pixi.js";
const showPdfBtn = document.getElementById("show-pdf");
const closePdfBtn = document.getElementById("close-pdf");
const pdfViewer = document.getElementById("pdf-viewer-container");
const pdfObject = document.getElementById("pdf-object");
const gameContainerHTML = document.getElementById("game-container");

// Displays a pdf file
export function showPdf(app, gameContainer, pdfPath) {
  pdfViewer.style.display = "flex";
  gameContainer.eventMode = "none";
  app.stage.visible = "false";
  gameContainerHTML.style.display = "none";
  pdfObject.data = pdfPath;
}
// Closes the pdf viewer and makes the game visible again
export function closePdf(app, gameContainer) {
  pdfViewer.style.display = "none";
  gameContainerHTML.style.display = "";
  app.stage.visible = "true";
  gameContainer.eventMode = "static";
}

// Creates text elements to open a single pdf file
export const setupPdf = (app, gameContainer) => {
  // let pdfContainer = new PIXI.Container();
  let background = new PIXI.Graphics();
  background.beginFill(0x1b1b1b);
  background.drawRect(0, 0, app.view.width, app.view.height);
  background.endFill();
  background.alpha = 0.8;
  const fontSize = app.view.width >= 600 ? 20 : 16;

  app.pdfContainer.addChild(background);
  app.pdfContainer.setChildIndex(background, 0);
  pdfFiles.forEach((pdfFile, index) => {
    let text = new PIXI.Text(pdfFile.title, {
      fill: "#ffffff",
      fontSize: fontSize,
    });
    text.anchor.set(0.5, 0);
    text.cursor = "pointer";
    text.y = index * 30;
    text.x = app.view.width / 2;
    text.eventMode = "static";
    text.on("pointerdown", () => {
      showPdf(app, gameContainer, pdfFile.path);
    });
    app.pdfContainer.addChild(text);
  });

  app.pdfContainer.visible = false;

  closePdfBtn.addEventListener("click", () => {
    closePdf(app, gameContainer);
  });
  // Toggles the view between PDF Container and gameContainer
  showPdfBtn.addEventListener("click", () => {
    closePdf(app, gameContainer);
    app.pdfContainer.visible = !app.pdfContainer.visible;
    gameContainer.visible = !gameContainer.visible;
  });
};
