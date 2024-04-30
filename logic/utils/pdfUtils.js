// Pikaiset kokeilut PDF esittämiseen käyttäen HTMl <Object>
// PDFJs avulla luultavasti saa viimeisellymmän näkymän ja sulavemmin sisälletyä sisällöt peliin

const pdfViewer = document.getElementById("pdf-viewer-container");
const pdfObject = document.getElementById("pdf-object");
const mainSceneHTML = document.getElementById("game-container");
const closePdfBtn = document.getElementById("close-pdf");

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