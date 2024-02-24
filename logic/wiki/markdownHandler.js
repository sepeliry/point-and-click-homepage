import { pages } from "./pages";
import { marked } from "marked";
marked.use({ gfm: true });
/**
 * Function to open display wiki content as HTML when a ingame object is clicked
 * @param {PIXI.Application} app - The pixi application where the object is located at
 * @param {PIXI.Container} gameContainer - Main PIXI.Container for the game
 * @param {string} htmlContent - Wiki content transformed from markdown to html to be displayed
 * @returns {function} - Function that opens the wiki content and hides the game
 */
export function handleMarkdownClick(app, gameContainer, htmlContent) {
  const container = document.getElementById("markdown-container");
  const backBtn = `<button id="back-btn">Takaisin</button>`;
  container.style.display = "flex";
  container.innerHTML = "";
  container.innerHTML = backBtn + htmlContent;

  // Hide the application and stop it from listening to events
  app.stage.visible = false;
  gameContainer.eventMode = "none";
  document.getElementById("game-container").style.display = "none";

  // Clears the content and turns the game back to visible
  document.getElementById("back-btn").addEventListener("click", () => {
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
  console.log(data);

  const htmlString = marked.parse(data);
  console.log(htmlString);
  return htmlString;
};
