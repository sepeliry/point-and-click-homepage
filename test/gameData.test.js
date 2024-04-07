import gameData from "../data/gameData";

describe("gameData Structure and Properties Tests", () => {
  it("should have mainScene", () => {
    expect(gameData).toHaveProperty("mainScene");
  });

  it("mainScene should have background, backgroundWidth, backgroundHeight, and items", () => {
    const { mainScene } = gameData;
    expect(mainScene).toHaveProperty("background");
    expect(mainScene).toHaveProperty("backgroundWidth");
    expect(mainScene).toHaveProperty("backgroundHeight");
    expect(mainScene).toHaveProperty("items");
  });

  it("each item in mainScene should have image, type, name, location, width, height, collisionHeight, onInteraction, and zIndex", () => {
    const { mainScene } = gameData;
    const { items } = mainScene;
    items.forEach((item) => {
      expect(item).toHaveProperty("image");
      expect(item).toHaveProperty("type");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("location");
      expect(item).toHaveProperty("width");
      expect(item).toHaveProperty("height");
      expect(item).toHaveProperty("collisionHeight");
      expect(item).toHaveProperty("onInteraction");
      expect(item).toHaveProperty("zIndex");
    });
  });
});
