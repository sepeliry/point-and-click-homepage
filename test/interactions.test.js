import switchScene from "../logic/interactions/switchScene";

// Mocking resizeGame function
jest.mock("../logic/utils/resize", () => ({
  resizeGame: jest.fn(),
}));

describe("switchScene", () => {
  let originalGetElementById;
  let mockApp;
  let mockScene1;
  let mockScene2;

  beforeAll(() => {
    originalGetElementById = document.getElementById;
    document.getElementById = jest.fn(() => ({ style: { display: "none" } }));
  });

  beforeEach(() => {
    // Reset mock implementation for each test
    jest.clearAllMocks();

    // Mock scenes
    mockScene1 = { visible: true };
    mockScene2 = { visible: false };

    // Mock app with scenes
    mockApp = {
      scenes: {
        scene1: mockScene1,
        scene2: mockScene2,
      },
    };

    // Mock window.isMobile
    window.isMobile = false;
  });

  afterAll(() => {
    document.getElementById = originalGetElementById;
  });

  it("should hide wiki text and show the new scene", () => {
    const newSceneName = "scene2";
    switchScene(mockApp, newSceneName);

    // Check if wiki text is hidden
    expect(document.getElementById).toHaveBeenCalledWith("wiki-wrapper");
    expect(document.getElementById("wiki-wrapper").style.display).toBe("none");

    // Check if the old scene is hidden and the new scene is shown
    expect(mockScene1.visible).toBe(false);
    expect(mockScene2.visible).toBe(true);
  });

  it("should call resizeGame if not on mobile", () => {
    const newSceneName = "scene2";
    switchScene(mockApp, newSceneName);

    // Check if resizeGame is called since not on mobile
    expect(require("../logic/utils/resize").resizeGame).toHaveBeenCalledTimes(
      1
    );
    expect(require("../logic/utils/resize").resizeGame).toHaveBeenCalledWith(
      mockApp,
      mockScene2
    );
  });

  it("should log a warning if the new scene is not found", () => {
    const newSceneName = "scene3"; // Non-existent scene
    console.warn = jest.fn(); // Mock console.warn
    switchScene(mockApp, newSceneName);

    // Check if warning is logged
    expect(console.warn).toHaveBeenCalledWith("Scene not found:", newSceneName);
  });
});
