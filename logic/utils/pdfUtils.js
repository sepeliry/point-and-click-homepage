// Pikaiset kokeilut PDF esittämiseen käyttäen HTMl <Object>
// PDFJs avulla luultavasti saa viimeisellymmän näkymän ja sulavemmin sisälletyä sisällöt peliin
import { pdfFiles } from "../../data/pdfFiles";
import { Container } from "pixi.js";
const pdfViewer = document.getElementById("pdf-viewer-container");
const pdfObject = document.getElementById("pdf-object");
const mainSceneHTML = document.getElementById("game-container");
const closePdfBtn = document.getElementById("close-pdf");
let pdfContainer = new Container();

// Displays a pdf file
function showPdf(app, mainScene, pdfPath) {
  mainScene.visible = !mainScene.visible;
  pdfViewer.style.display = "flex";
  mainScene.eventMode = "none";
  app.stage.visible = "false";
  mainSceneHTML.style.display = "none";
  pdfObject.data = pdfPath;
  closePdfBtn.addEventListener("click", () => closePdf(app, mainScene));
}
// Closes the pdf viewer and makes the game visible again
function closePdf(app, mainScene) {
  mainScene.visible = !mainScene.visible;
  mainSceneHTML.style.display = "";
  app.stage.visible = "true";
  mainScene.eventMode = "static";
  pdfViewer.style.display = "none";
  closePdfBtn.removeEventListener("click", () => closePdf(app, mainScene));
}
export default showPdf;

// // Creates text elements to open a single pdf file
// export const setupPdf = (app, mainScene) => {
//   // let pdfContainer = new Container();
//   let background = new Graphics();
//   background.beginFill(0x1b1b1b);
//   background.drawRect(0, 0, app.view.width, app.view.height);
//   background.endFill();
//   background.alpha = 0.8;
//   const fontSize = app.view.width >= 600 ? 20 : 16;
//   app.pdfContainer = pdfContainer;

//   app.pdfContainer.addChild(background);
//   app.pdfContainer.setChildIndex(background, 0);
//   pdfFiles.forEach((pdfFile, index) => {
//     let text = new Text(pdfFile.title, {
//       fill: "#ffffff",
//       fontSize: fontSize,
//     });
//     text.anchor.set(0.5, 0);
//     text.cursor = "pointer";
//     text.y = index * 30;
//     text.x = app.view.width / 2;
//     text.eventMode = "static";
//     text.on("pointerdown", () => {
//       showPdf(app, mainScene, pdfFile.path);
//     });
//     app.pdfContainer.addChild(text);
//   });

//   app.pdfContainer.visible = false;

//   closePdfBtn.addEventListener("click", () => {
//     closePdf(app, mainScene);
//   });
//   // Toggles the view between PDF Container and mainScene
//   showPdfBtn.addEventListener("click", () => {
//     closePdf(app, mainScene);
//     pdfContainer.visible = !pdfContainer.visible;
//     mainScene.visible = !mainScene.visible;
//   });
// };
