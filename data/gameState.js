import Inventory from "../logic/inventory/inventory";

const observers = [];

export function addObserver(observer) {
  observers.push(observer);
}

// notify all added observers
function notifyObservers(property, newValue, previousValue) {
  observers.forEach((observer) => observer(property, newValue, previousValue));
}

function notifyInventoryChange() {
  notifyObservers(
    "inventory",
    gameState.inventory.items,
    "(previous values for inventory are not saved atm)"
  );
}

const gameStateHandler = {
  get: function (target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new Error(`${property} is not defined in gameState`);
    }
  },
  set: function (target, property, value) {
    if (!(property in target)) {
      throw new Error(
        `Cannot add or modify '${property}' as it is not predefined in gameState`
      );
    }
    const previousValue = target[property];
    if (target[property] !== value) {
      target[property] = value;
      // notify observers when state changes
      notifyObservers(property, value, previousValue);
    }
    return true;
  },
};

const gameState = new Proxy(
  {
    hasCompletedGame: false,
    hasUnlockedDoor: false,
    currentScene: "mainScene",
    playerIsMiniSize: false,
    coffeeBrewed: false,
    inventory: new Inventory(notifyInventoryChange), // for listening to changes in inventory as well
  },
  gameStateHandler
);

export default gameState;
