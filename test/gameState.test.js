import gameState, { addObserver } from "../data/gameState";
import Inventory from "../logic/inventory/inventory";

// Mock the Inventory class
jest.mock("../logic/inventory/inventory", () => {
  return jest.fn().mockImplementation((onChange) => {
    return { items: [], onChange };
  });
});

describe("gameState", () => {
  let mockObserver;

  beforeEach(() => {
    // Reset gameState and observers
    jest.clearAllMocks();
    gameState.hasCompletedGame = false;
    gameState.hasUnlockedDoor = false;
    gameState.currentScene = "mainScene";
    gameState.playerIsMiniSize = false;
    gameState.inventory.items = [];

    // Setup a mock observer
    mockObserver = jest.fn();
    addObserver(mockObserver);
  });

  test("should correctly get an existing property", () => {
    expect(gameState.hasCompletedGame).toBe(false);
  });

  test("should throw an error when trying to get a non-existing property", () => {
    expect(() => gameState.nonExistentProperty).toThrowError(
      "nonExistentProperty is not defined in gameState"
    );
  });

  test("should throw an error when trying to set a non-existing property", () => {
    expect(() => {
      gameState.nonExistentProperty = true;
    }).toThrowError(
      "Cannot add or modify 'nonExistentProperty' as it is not predefined in gameState"
    );
  });

  test("should notify observer when a property changes", () => {
    gameState.hasCompletedGame = true;
    expect(mockObserver).toHaveBeenCalledWith("hasCompletedGame", true, false);
  });

  test("should not notify observer when a property is set to the same value", () => {
    gameState.hasCompletedGame = false;
    expect(mockObserver).not.toHaveBeenCalled();
  });

  test("should notify observer when inventory changes", () => {
    // Simulate inventory change
    gameState.inventory.items.push("new item");
    gameState.inventory.onChange();
    expect(mockObserver).toHaveBeenCalledWith(
      "inventory",
      ["new item"],
      "(previous values for inventory are not saved atm)"
    );
  });
});
