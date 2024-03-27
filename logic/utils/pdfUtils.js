// Pikaiset kokeilut PDF esittämiseen käyttäen HTMl <Object>
// PDFJs avulla luultavasti saa viimeisellymmän näkymän ja sulavemmin sisälletyä sisällöt peliin
import { pdfFiles } from "../../data/pdfFiles";
import * as PIXI from "pixi.js";
const showPdfBtn = document.getElementById("show-pdf");
const closePdfBtn = document.getElementById("close-pdf");
const pdfViewer = document.getElementById("pdf-viewer-container");
const pdfObject = document.getElementById("pdf-object");
const mainSceneHTML = document.getElementById("game-container");
let pdfContainer = new PIXI.Container();
// Displays a pdf file
export function showPdf(app, mainScene, pdfPath) {
  pdfViewer.style.display = "flex";
  mainScene.eventMode = "none";
  app.stage.visible = "false";
  mainSceneHTML.style.display = "none";
  pdfObject.data = pdfPath;
}
// Closes the pdf viewer and makes the game visible again
export function closePdf(app, mainScene) {
  pdfViewer.style.display = "none";
  mainSceneHTML.style.display = "";
  app.stage.visible = "true";
  mainScene.eventMode = "static";
}

// Creates text elements to open a single pdf file
export const setupPdf = (app, mainScene) => {
  pdfFiles.forEach((pdfFile, index) => {
    let text = new PIXI.Text(pdfFile.title, { fill: "#ffffff" });
    text.eventMode = "static";
    text.cursor = "pointer";
    text.y = index * 30;

    text.on("pointerdown", () => {
      showPdf(app, mainScene, pdfFile.path);
    });
    pdfContainer.addChild(text);
  });

  app.stage.addChild(pdfContainer);
  pdfContainer.visible = false;

  closePdfBtn.addEventListener("click", () => {
    closePdf(app, mainScene);
  });
  // Toggles the view between PDF Container and mainScene
  showPdfBtn.addEventListener("click", () => {
    closePdf(app, mainScene);
    pdfContainer.visible = !pdfContainer.visible;
    mainScene.visible = !mainScene.visible;
  });
};
