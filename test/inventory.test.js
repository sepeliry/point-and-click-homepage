import Inventory from "../logic/inventory/inventory";
import InventoryUI from "../logic/inventory/inventoryUI";

// Mock InventoryUI
jest.mock("../logic/inventory/inventoryUI", () => ({
  updateInventoryUI: jest.fn(),
}));

describe("Inventory", () => {
  let inventory;
  let mockChangeCallback;

  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    mockChangeCallback = jest.fn();
    inventory = new Inventory(mockChangeCallback);
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.log.mockRestore(); // Restore the original console.log
  });

  // test cases below
  describe("addItem", () => {
    it("should add a new item if it does not exist", () => {
      inventory.addItem("Sword", "swordSprite");
      expect(inventory.getItems()).toEqual([
        { item: "Sword", sprite: "swordSprite" },
      ]);
      expect(InventoryUI.updateInventoryUI).toHaveBeenCalled();
      expect(mockChangeCallback).toHaveBeenCalled();
    });

    it("should not add an item if it already exists", () => {
      inventory.addItem("Sword", "swordSprite");
      // try to add the same item again
      inventory.addItem("Sword", "swordSprite");
      expect(inventory.getItems().length).toBe(1);
      expect(console.log).toHaveBeenCalledWith(
        "Item already exists in the inventory."
      );
    });
  });

  describe("removeItem", () => {
    it("should remove an item correctly", () => {
      inventory.addItem("Sword", "swordSprite");
      inventory.removeItem("Sword");
      expect(inventory.getItems()).toEqual([]);
      expect(InventoryUI.updateInventoryUI).toHaveBeenCalledTimes(2);
      expect(mockChangeCallback).toHaveBeenCalledTimes(2);
    });

    it("should throw an error if item does not exist", () => {
      expect(() => inventory.removeItem("Axe")).toThrow(
        "Item not found in inventory"
      );
    });
  });

  describe("itemExists", () => {
    it("should return true if the item exists", () => {
      inventory.addItem("Bow", "bowSprite");
      expect(inventory.itemExists("Bow")).toBe(true);
    });

    it("should return false if the item does not exist", () => {
      expect(inventory.itemExists("Bow")).toBe(false);
    });
  });

  describe("getItems", () => {
    it("should return all items", () => {
      inventory.addItem("Bow", "bowSprite");
      inventory.addItem("Arrow", "arrowSprite");
      expect(inventory.getItems()).toEqual([
        { item: "Bow", sprite: "bowSprite" },
        { item: "Arrow", sprite: "arrowSprite" },
      ]);
    });
  });
});
