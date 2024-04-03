import Popup from "../popup.js";

function openPopup(app, text, x, y) {
    const {x: popupX, y: popupY} = popupCoordinates(app, x, y);
    const inactiveItemPopup = new Popup(app, text);
    inactiveItemPopup.open(app, popupX, popupY);
}

// :D
function popupCoordinates(app, x, y) {
    // Set popup on top of screen if mobile
    if (window.isMobile) {
        return {x: -app.cameraContainer.x / 1400 + 0.04, y: 0.2};
    }
    return {x: x + 0.04, y: y - 0.15};
}

export default openPopup;