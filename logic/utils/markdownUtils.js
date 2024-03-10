import { pages } from "../../data/pages";
import { marked } from "marked";

// Generates list from wiki page titles. Adds a click listener for each to render the page as html
export const generateWikiList = () => {
  const ulElem = document.getElementById("wiki-list");
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
  const container = document.getElementById("markdown-container");
  const showPdf = document.getElementById("show-pdf");
  showPdf.style.display = "none";
  container.style.display = "flex";
  app.stage.visible = false;
  gameContainer.eventMode = "none";
  document.getElementById("game-container").style.display = "none";

  document.getElementById("back-btn").addEventListener("click", () => {
    showPdf.style.display = "";
    container.style.display = "none";
    document.getElementById("game-container").style.display = "";
    app.stage.visible = true;
    gameContainer.eventMode = "static";
  });
};

// Renders a wikipage as html
export const displayWikiPage = async (url) => {
  const pageContainer = document.getElementById("page-container");
  const ulElem = document.getElementById("wiki-list");
  const backBtn = document.getElementById("back-btn");
  // Retrieves the page content as html and hides other elements
  const htmlString = await fetchWikiPage(url);
  ulElem.style.display = "none";
  backBtn.style.display = "none";
  pageContainer.style.display = "flex";
  pageContainer.innerHTML = htmlString;

  // Button for going back to the list
  const pageBackBtn = document.createElement("button");
  pageBackBtn.textContent = "Palaa";
  pageBackBtn.id = "page-back-btn";
  pageBackBtn.classList.add("button");
  pageBackBtn.addEventListener("click", () => {
    pageContainer.innerHTML = "";
    pageContainer.style.display = "none";
    ulElem.style.display = "block";
    pageBackBtn.remove();
    backBtn.style.display = "";
  });
  pageContainer.appendChild(pageBackBtn);
};

// TODO: [[otsikko]] Syntaxia käyttävien wikilinkkien muuntaminen [teksti](otsikko) muotoon
export const fetchWikiPage = async (url) => {
  const response = await fetch(`${url}`);
  const data = await response.text();
  // Custom renderer for links pointing to other wikipages
  const renderer = new marked.Renderer();
  const originalLinkRenderer = renderer.link;
  renderer.link = function (href, title, text) {
    if (!href.startsWith("http")) {
      // If href points to a wikipage and the pages url is found, clicking the link opens page ingame
      const pageUrl = findPageUrlByHref(href);
      if (!pageUrl) return originalLinkRenderer.call(this, href, title, text);
      else {
        return `<a href="${href}" onclick="event.preventDefault(); displayWikiPage('${pageUrl}');">${text}</a>`;
      }
    } else {
      return originalLinkRenderer.call(this, href, title, text); // Otherwise use normal href
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
      `Matching wikipage url using href: ${href} not found, using original linkrenderer instead`
    );
    return null;
  }
  return page.url;
};

window.displayWikiPage = displayWikiPage;
