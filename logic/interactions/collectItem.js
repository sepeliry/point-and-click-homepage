import Inventory from '../inventory';
import Player from '../player';
import UI from '../UI';
/**
 * Function to collect an item
 */
function collectItem(app, sceneName, item) {
    const inventory = Inventory.inventory;
    console.log("solidob?" + UI.solidObjects);
    if (!inventory || !app.scenes[sceneName]) return;

    for (const object of UI.solidObjects) {
        if (object.name === item) {
            if (!Inventory.inventory.includes(item)) {
                console.log("Item collected!");
                inventory.push(object);
                object.visible = false;
                object.eventMode = "none";
                Inventory.updateInventoryUI();
            }
            object.visible = false;
        }
    }
}
export default collectItem;
