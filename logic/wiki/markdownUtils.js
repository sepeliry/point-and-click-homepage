import { pages } from "./pages";
import { marked } from "marked";

/**
 * Function to open display wiki content as HTML when a ingame object is clicked
 * @param {PIXI.Application} app - The pixi application where the object is located at
 * @param {PIXI.Container} gameContainer - Main PIXI.Container for the game
 * @param {string} pageTitle - Title of the wiki page
 * @param {string} htmlContent - Wiki content transformed from markdown to html to be displayed
 * @returns {function} - Function that opens the wiki content and hides the game
 */
export function handleMarkdownClick(
  app,
  gameContainer,
  pageTitle,
  htmlContent
) {
  const container = document.getElementById("markdown-container");
  const showPdf = document.getElementById("show-pdf");
  const backBtn = `<button class="button" id="back-btn" >Takaisin</button>`;
  const title = `<h1>${pageTitle}</h1>`;
  showPdf.style.display = "none";
  container.style.display = "flex";
  container.innerHTML = "";
  container.innerHTML = backBtn + title + htmlContent;

  // Hide the application and stop it from listening to events
  app.stage.visible = false;
  gameContainer.eventMode = "none";
  document.getElementById("game-container").style.display = "none";

  // Clears the content and turns the game back to visible
  document.getElementById("back-btn").addEventListener("click", () => {
    showPdf.style.display = "";
    container.innerHTML = "";
    container.style.display = "none";
    document.getElementById("game-container").style.display = "";
    app.stage.visible = true;
    gameContainer.eventMode = "static";
  });
}
/**
 * Fetches the raw markdown from github and uses marked to conver it into html string
 * @param {string} url - the rawgithubuserconent url for the markdown wiki page
 * @returns {string} - Markdown content transformed into a html string
 */
export const fetchPage = async (url) => {
  const response = await fetch(`${url}`);
  const data = await response.text();
  marked.use({ gfm: true });
  const htmlString = marked.parse(data);
  return htmlString;
};
