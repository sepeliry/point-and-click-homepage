jest.mock("pixi.js", () => {
  const actualPixi = jest.requireActual("pixi.js");
  const originalModule = jest.requireActual("pixi.js");
  const fakeCanvas = new originalModule.Graphics();
  // Mock the Graphics class to avoid real rendering operations
  const MockGraphics = jest.fn().mockImplementation(() => ({
    lineStyle: jest.fn().mockReturnThis(),
    beginFill: jest.fn().mockReturnThis(),
    drawRect: jest.fn().mockReturnThis(),
    endFill: jest.fn().mockReturnThis(),
  }));

  return {
    ...actualPixi,
    Graphics: MockGraphics,
    Container: jest.fn().mockImplementation(() => ({
      children: [],
      addChild: jest.fn(function (child) {
        this.children.push(child); // Ensure children are actually added
      }),
    })),
    Application: jest.fn().mockImplementation(() => ({
      view: fakeCanvas,
      renderer: {
        plugins: {
          interaction: {},
        },
      },
      stage: {
        addChild: jest.fn(),
      },
    })),
  };
});

const gameContainer = document.createElement("div");
gameContainer.id = "game-container";
document.body.appendChild(gameContainer);

const hideWikiContent = document.createElement("div");
hideWikiContent.id = "hide-wiki-content";
document.body.appendChild(hideWikiContent);

const wikiWrapper = document.createElement("div");
wikiWrapper.id = "wiki-wrapper";
document.body.appendChild(wikiWrapper);
