import gameData from "../data/gameData";
import ITEM_TYPES from "../constants/itemTypes";

describe("GameData Validation", () => {
  Object.entries(gameData).forEach(([sceneName, scene]) => {
    scene.items.forEach((item, index) => {
      const baseError = `Item at index ${index} (${
        item.name || "Unnamed"
      }) in ${sceneName}`;

      describe(`Item Type Tests - ${item.type}`, () => {
        switch (item.type) {
          case ITEM_TYPES.item:
            it(`${baseError} should have all properties for type 'item'`, () => {
              expect(item.image || item.animation).toBeDefined();
              expect(item.width).toBeDefined();
              expect(item.height).toBeDefined();
              expect(item.location).toBeDefined();
              expect(item.location.x).toBeDefined();
              expect(item.location.y).toBeDefined();
            });
            break;

          case ITEM_TYPES.book:
            it(`${baseError} should have all properties for type 'book'`, () => {
              expect(item.image).toBeDefined();
              expect(item.width).toBeDefined();
              expect(item.height).toBeDefined();
              expect(item.location).toBeDefined();
              expect(item.location.x).toBeDefined();
              expect(item.location.y).toBeDefined();
            });
            break;

          case ITEM_TYPES.desktopIcon:
            it(`${baseError} should have all properties for type 'desktopIcon'`, () => {
              expect(item.image).toBeDefined();
              expect(item.width).toBeDefined();
              expect(item.height).toBeDefined();
              expect(item.location).toBeDefined();
              expect(item.location.x).toBeDefined();
              expect(item.location.y).toBeDefined();
            });
            break;

          case ITEM_TYPES.text:
            it(`${baseError} should have all properties for type 'text'`, () => {
              expect(item.text).toBeDefined();
              expect(item.location).toBeDefined();
              expect(item.location.x).toBeDefined();
              expect(item.location.y).toBeDefined();
            });
            break;

          default:
            it(`${baseError} has an unrecognized type and cannot be tested properly`, () => {
              throw new Error(`Unrecognized item type: ${item.type}`);
            });
        }
      });
    });
  });
});
