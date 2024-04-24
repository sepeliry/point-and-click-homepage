export default function fadeOutLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");

  // Function to hide the element after fading out
  function hideElement() {
    loadingScreen.style.display = "none";
    loadingScreen.removeEventListener("transitionend", hideElement);
  }

  // Listen for the end of the transition
  loadingScreen.addEventListener("transitionend", hideElement);

  // Start the fade out
  loadingScreen.style.opacity = 0;
}
