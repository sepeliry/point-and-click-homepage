const pdfViewer = document.getElementById("pdf-viewer-container");
const pdfObject = document.getElementById("pdf-object");
const mainSceneHTML = document.getElementById("game-container");
const closePdfBtn = document.getElementById("close-pdf");

/**
 * A function to display a PDF file in the game. Hides the PIXIJs mainScene and shows the PDF viewer.
 * Used in gameData for PDF book onInteraction callback.
 * @param {PIXI.Application} app - PIXI.Application
 * @param {PIXI.Container} mainScene - PIXI.Container that holds the game's main scene
 * @param {String} pdfPath - Path to the PDF file to be displayed
 */
function showPdf(app, mainScene, pdfPath) {
  mainScene.visible = !mainScene.visible;
  mainScene.eventMode = "none";
  app.stage.visible = "false";
  pdfViewer.style.display = "flex";
  mainSceneHTML.style.display = "none";
  pdfObject.data = pdfPath; // HTML object element to display the PDF
  closePdfBtn.addEventListener("click", () => closePdf(app, mainScene));
}
/**
 * A function to close the PDF viewer and show the PIXIJs mainScene. Used for the button to close the PDF viewer.
 * @param {PIXI.Application} app - PIXI.Application
 * @param {PIXI.Container} mainScene - PIXI.Container that holds the game's main scene
 */
function closePdf(app, mainScene) {
  mainScene.visible = !mainScene.visible;
  mainScene.eventMode = "static";
  app.stage.visible = "true";
  pdfViewer.style.display = "none";
  mainSceneHTML.style.display = "";
  closePdfBtn.removeEventListener("click", () => closePdf(app, mainScene));
}
export default showPdf;
