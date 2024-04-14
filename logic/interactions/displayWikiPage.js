// TODO: fetch data from links in Sepeli's wiki content

import { marked } from "marked";

async function displayWikiPage(rawUrl, wikiUrl) {
  try {
    const wikiWrapper = document.getElementById("wiki-wrapper");

    const wikiText = document.getElementById("wiki-text");

    // set loading text
    wikiText.innerHTML = "loading content...";
    // make wiki div visible
    wikiWrapper.style.display = "block";

    // fetch data from wiki
    const markdownText = await fetchWikiPage(rawUrl);

    wikiText.innerHTML = markdownText;
    // add wiki link to html element
    document.querySelector(".wikiLink").href = wikiUrl;
  } catch (error) {
    console.error("Failed to display wiki page:", error);
  }
}

function preprocessMarkdown(mdContent) {
  // Replace found patterns with Markdown links (or HTML anchors)
  const processedContent = mdContent.replace(
    /\[\[(.*?)\]\]/g,
    (match, pageName) => {
      // Normalize the page name to match GitHub wiki URL encoding conventions
      const normalizedPageName = pageName
        .trim()
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/–/g, "%E2%80%93") // encode en dash
        .replace(/:/g, "%3A"); // encode colon

      const url = `https://github.com/sepeliry/YhdistyksenToiminta/wiki/${normalizedPageName}`;

      // return the wiki link as an anchor tag
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${pageName.trim()}</a>`;
    }
  );

  return processedContent;
}

export const fetchWikiPage = async (url) => {
  const response = await fetch(`${url}`);
  const mdContent = await response.text();

  if (mdContent) {
    // Preprocess to handle custom link format
    console.log(mdContent);

    const processedMdContent = preprocessMarkdown(mdContent);

    // Convert processed Markdown to HTML
    const htmlContent = marked.parse(processedMdContent);
    return htmlContent;
  }
};

export default displayWikiPage;
