// TODO: fetch data from links in Sepeli's wiki content

import { marked } from "marked";

// Function to display wiki pages fetched from URL links
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

// Function to process markdown content and return it as HTML markup
function preprocessMarkdown(mdContent) {
  // Function to encode URL components correctly
  function encodeWikiUrl(urlPart) {
    return encodeURIComponent(urlPart)
      .replace(/%20/g, "-") // Replace spaces with hyphens
      .replace(/%3A/g, ":-") // Keep colons but ensure they are correctly displayed
      .replace(/%E2%80%93/g, "–") // Handle en dash
      .replace(/%2F/g, "/") // Ensure forward slashes are not encoded
      .replace(/%C2%A0/g, "-") // Convert non-breaking spaces to hyphens
      .replace(/--+/g, "-"); // Convert multiple hyphens to a single hyphen
  }

  // Process markdown links of the form [text](target)
  mdContent = mdContent.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (match, linkText, linkTarget) => {
      // Check if linkTarget is a direct link (http or https)
      if (
        linkTarget.startsWith("http://") ||
        linkTarget.startsWith("https://")
      ) {
        // Use the link as-is for direct URLs
        return `<a href="${linkTarget}" target="_blank" rel="noopener noreferrer">${linkText.trim()}</a>`;
      } else {
        // Normalize the link target for GitHub wiki
        const url = `https://github.com/sepeliry/YhdistyksenToiminta/wiki/${encodeWikiUrl(
          linkTarget
        )}`;

        // Return the link as an HTML anchor tag
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText.trim()}</a>`;
      }
    }
  );

  // Then, replace wiki links of the form [[Page Name]] or [[URL]]
  const processedContent = mdContent.replace(
    /\[\[(.*?)\]\]/g,
    (match, content) => {
      if (content.startsWith("http://") || content.startsWith("https://")) {
        // If it's a direct URL, use it as is
        return `<a href="${content.trim()}" target="_blank" rel="noopener noreferrer">${content.trim()}</a>`;
      } else {
        // Normalize the page name to match GitHub wiki URL encoding conventions
        const url = `https://github.com/sepeliry/YhdistyksenToiminta/wiki/${encodeWikiUrl(
          content
        )}`;

        // Return the wiki link as an anchor tag
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${content.trim()}</a>`;
      }
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
