// TODO: fetch data from links in Sepeli's wiki content

import { marked } from "marked";

async function displayWikiPage(url) {
  try {
    const wikiWrapper = document.getElementById("wiki-wrapper");

    const wikiText = document.getElementById("wiki-text");

    // set loading text
    wikiText.innerHTML = "loading content...";
    // make wiki div visible
    wikiWrapper.style.display = "block";

    // fetch data from wiki
    const markdownText = await fetchWikiPage(url);

    wikiText.innerHTML = markdownText;
    // add wiki link to html element
    document.querySelector(".wikiLink").href = url;
  } catch (error) {
    console.error("Failed to display wiki page:", error);
  }
}

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
      const pageUrl = "#";
      console.log(pageUrl);
      console.log(href);
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

export default displayWikiPage;
