import Popup from "../popup";

// Open 1..n popup windows
function openPopup(app, text, position, callback = null) {
  const popup = new Popup(app, text, position);
  if (callback) {
    popup.onClose(callback);
  }
}

export default openPopup;