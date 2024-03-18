// Pikaiset kokeilut PDF esittämiseen käyttäen HTMl <Object>
// PDFJs avulla luultavasti saa viimeisellymmän näkymän ja sulavemmin sisälletyä sisällöt peliin

export function showPdf(app, gameContainer, pdfPath) {
  const pdfViewer = document.getElementById("pdf-viewer-container");
  const showPdf = document.getElementById("show-pdf");
  const pdfObject = document.getElementById("pdf-object");
  const gameContainerHTML = document.getElementById("game-container");
  // Hides showpdf button, game stage and opens the pdf viewer
  showPdf.style.display = "none";
  pdfViewer.style.display = "flex";
  gameContainer.eventMode = "none";
  app.stage.visible = "false";
  gameContainerHTML.style.display = "none";
  pdfObject.data = pdfPath;
}
// Closes the pdf viewer and makes the game visible again
export function closePdf(app, gameContainer) {
  const pdfViewer = document.getElementById("pdf-viewer-container");
  const showPdf = document.getElementById("show-pdf");
  const gameContainerHTML = document.getElementById("game-container");
  showPdf.style.display = "";
  pdfViewer.style.display = "none";
  gameContainerHTML.style.display = "";
  app.stage.visible = "true";
  gameContainer.eventMode = "static";
}
// Kokeiluja varten setuppaa buttonit pdf avaamiseen ja sulkemiseen
export const setupPdf = (app, gameContainer) => {
  const pelienSuunittelu = "./docs/input/pelienSuunnittelu.pdf";

  document
    .getElementById("show-pdf")
    .addEventListener("click", () =>
      showPdf(app, gameContainer, pelienSuunittelu)
    );

  document.getElementById("close-pdf").addEventListener("click", () => {
    closePdf(app, gameContainer);
  });
};
