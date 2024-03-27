import { pages } from "../../data/pages";
import { marked } from "marked";
import { resizeGame } from "./resize";
const markdownContainer = document.getElementById("markdown-container");
const showPdf = document.getElementById("show-pdf");
const ulElem = document.getElementById("wiki-list");
const wikiPageContainer = document.getElementById("wiki-page-container");
const gameContainerDOM = document.getElementById("game-container");
const backBtn = document.getElementById("back-btn");
const testControls = document.getElementById("test-controls");

// Generates list from wiki page titles. Adds a click listener for each to render the page as html
export const generateWikiList = () => {
  let htmlList = pages
    .map((page, index) => {
      return `<li id="page-${index}"><a href="${page.url}">${page.title}</a></li>`;
    })
    .join("");
  ulElem.innerHTML = htmlList;

  // Adds an event listener to each page title. When clicked displays the wikipage as html
  pages.forEach((page, index) => {
    document
      .getElementById(`page-${index}`)
      .addEventListener("click", async (event) => {
        event.preventDefault();
        await displayWikiPage(page.url);
      });
  });
};

// Displays the list of wiki pages. When item is clicked, renders the wiki page as html
export const showWikiList = (app, gameContainer) => {
  showPdf.style.display = "none";
  markdownContainer.style.display = "flex";
  app.stage.visible = false;
  gameContainer.eventMode = "none";
  gameContainerDOM.style.display = "none";
  backBtn.style.display = "block";

  backBtn.addEventListener("click", () => {
    showPdf.style.display = "";
    markdownContainer.style.display = "none";
    gameContainerDOM.style.display = "";
    app.stage.visible = true;
    gameContainer.eventMode = "static";
    backBtn.style.display = "none";
    if (!window.isMobile) {
      resizeGame(app, gameContainer);
    }
  });
};

// Renders a wikipage as html, and hides other elements out of the way
export const displayWikiPage = async (url) => {
  const htmlString = await fetchWikiPage(url);
  ulElem.style.display = "none";
  backBtn.style.display = "none";
  wikiPageContainer.style.display = "flex";
  wikiPageContainer.innerHTML = htmlString;

  const existingBackBtn = document.getElementById("page-back-btn");
  if (existingBackBtn) {
    existingBackBtn.remove();
  }
  const pageBackBtn = document.createElement("button");
  pageBackBtn.textContent = "Takaisin listaan";
  pageBackBtn.id = "page-back-btn";
  pageBackBtn.classList.add("button");
  pageBackBtn.addEventListener("click", () => {
    wikiPageContainer.innerHTML = "";
    wikiPageContainer.style.display = "none";
    ulElem.style.display = "block";
    pageBackBtn.remove();
    backBtn.style.display = "block";
  });
  testControls.appendChild(pageBackBtn);
};

export const fetchWikiPage = async (url) => {
  const response = await fetch(`${url}`);
  let data = await response.text();
  // Replace [[]] links with []()
  data = data.replace(/\[\[([^\]]+)\]\]/g, (match, p1) => `[${p1}](${p1})`);

  // Custom renderer for links pointing to other wikipages
  const renderer = new marked.Renderer();
  const originalLinkRenderer = renderer.link;
  renderer.link = function (href, title, text) {
    // If link doesn't start with http and doesn't end in .something etc, treat it as a relative link to a wikipage
    if (!href.startsWith("http") && !/\.\w+$/.test(href)) {
      const pageUrl = findPageUrlByHref(href);
      if (!pageUrl)
        return `<a href="#">${text}</a>`; // To stop redirecting if wikipage with given href is not found
      else {
        return `<a href="${href}" onclick="event.preventDefault(); displayWikiPage('${pageUrl}');">${text}</a>`;
      }
    } else {
      return originalLinkRenderer.call(this, href, title, text);
    }
  };
  marked.use({ gfm: true, renderer });
  const htmlString = marked.parse(data);
  return htmlString;
};

const findPageUrlByHref = (href) => {
  const page = pages.find((page) => page.url.endsWith(`${href}.md`));
  if (!page) {
    console.error(
      `Matching wikipage url using href: ${href} not found, using # instead`
    );
    return null;
  }
  return page.url;
};

window.displayWikiPage = displayWikiPage;
