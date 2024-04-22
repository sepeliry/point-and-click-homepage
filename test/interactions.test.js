import switchScene from "../logic/interactions/switchScene";
import gameState from "../data/gameState";
import { resizeGame } from "../logic/utils/resize";
import Popup from "../logic/popup";

// Mock the Popup module
jest.mock("../logic/popup", () => ({
  activePopups: [],
}));

// Mock the resizeGame function
jest.mock("../logic/utils/resize", () => ({
  resizeGame: jest.fn(),
}));

// Mock gameState
jest.mock("../data/gameState", () => ({
  currentScene: null,
}));

describe("switchScene", () => {
  let app;

  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = '<div id="wiki-wrapper"></div>';

    // Setup app object with mock scenes
    app = {
      scenes: {
        scene1: { visible: false },
        scene2: { visible: false },
      },
    };

    // Reset mocks before each test
    jest.clearAllMocks();
    Popup.activePopups = [];
  });

  test("should hide the wiki wrapper", () => {
    switchScene(app, "scene1");
    expect(document.getElementById("wiki-wrapper").style.display).toBe("none");
  });

  test("should hide all previous scenes and show the new scene", () => {
    switchScene(app, "scene1");
    expect(app.scenes.scene1.visible).toBeTruthy();
    expect(app.scenes.scene2.visible).toBeFalsy();
  });

  test("should update the current scene in gameState", () => {
    switchScene(app, "scene1");
    expect(gameState.currentScene).toBe("scene1");
  });

  test("should call resizeGame for the new scene", () => {
    switchScene(app, "scene1");
    expect(resizeGame).toHaveBeenCalledWith(app, app.scenes["scene1"]);
  });

  test("should close all active popups when switching scenes", () => {
    const mockPopup = { closePopup: jest.fn() };
    Popup.activePopups.push(mockPopup);
    switchScene(app, "scene1");
    expect(mockPopup.closePopup).toHaveBeenCalled();
  });

  test("should log a warning if the scene does not exist", () => {
    console.warn = jest.fn();
    switchScene(app, "nonExistentScene");
    expect(console.warn).toHaveBeenCalledWith(
      "Scene not found:",
      "nonExistentScene"
    );
  });
});
