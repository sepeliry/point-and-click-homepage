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
      // property set successfully
      return true;
    } else {
      throw new Error(
        `Cannot add or modify '${property}' as it is not predefined in gameState`
      );
    }
  },
};

const gameState = new Proxy(
  // a list of all possible game states
  {
    hasCompletedGame: false,
    hasUnlockedDoor: false,
    currentScene: "mainScene",
    playerIsMiniSize: false,
  },
  gameStateHandler
);

export default gameState;
