import Popup from "../popup";

function openPopup(app, text, position, callback = null) {
  const popup = new Popup(app, text, position);
  if (callback) {
    popup.onClose(callback);
  }
}

export default openPopup;
