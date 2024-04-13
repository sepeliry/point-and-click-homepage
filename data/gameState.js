import Inventory from "../logic/inventory/inventory";

const gameStateHandler = {
  get: function (target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new Error(`${property} is not defined in gameState`);
    }
  },
  set: function (target, property, value) {
    if (property in target) {
      target[property] = value;
      return true;
    } else {
      throw new Error(
        `Cannot add or modify '${property}' as it is not predefined in gameState`
      );
    }
  },
};

const gameState = new Proxy(
  {
    hasCompletedGame: false,
    hasUnlockedDoor: false,
    currentScene: "mainScene",
    playerIsMiniSize: false,
    inventory: new Inventory(),
  },
  gameStateHandler
);

export default gameState;
