// Open page from URL in a new tab
function openUrlInNewTab(url) {
  // Create an anchor element
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer"; // Optional, but it's a good practice for security

  // Append the anchor to the body temporarily
  document.body.appendChild(anchor);

  // Simulate a click on the anchor
  anchor.click();

  // Remove the anchor from the body
  document.body.removeChild(anchor);
}

export default openUrlInNewTab;
