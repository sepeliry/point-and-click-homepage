import Popup from "../logic/popup";
import { Container, Graphics, Text } from "pixi.js";

// Mock PIXI.js components
jest.mock("pixi.js", () => ({
  Container: jest.fn().mockImplementation(() => ({
    addChild: jest.fn(),
    removeChild: jest.fn(),
  })),
  Graphics: jest.fn().mockImplementation(() => ({
    lineStyle: jest.fn(),
    beginFill: jest.fn(),
    drawRect: jest.fn(),
    endFill: jest.fn(),
    addChild: jest.fn(),
  })),
  Text: jest.fn().mockImplementation(() => ({
    set: jest.fn(),
    position: {
      set: jest.fn(),
    },
    anchor: {
      set: jest.fn(),
    },
  })),
}));

describe("Popup", () => {
  let app;
  beforeEach(() => {
    // Mock window properties
    Object.defineProperty(window, "innerWidth", { value: 1024 });
    Object.defineProperty(window, "devicePixelRatio", { value: 1 });

    // Setup app object with mock screen dimensions
    app = {
      screen: {
        width: 800,
        height: 600,
      },
      stage: {
        addChild: jest.fn(),
        removeChild: jest.fn(),
      },
      mainScene: {
        on: jest.fn(),
        off: jest.fn(),
      },
    };

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("should create and display a popup", () => {
    const popup = new Popup(app, "Hello, world!", null);
    expect(app.stage.addChild).toHaveBeenCalledWith(popup.container);
    expect(Popup.activePopups.includes(popup)).toBeTruthy();
  });

  test("should close popup and remove it from active popups", () => {
    const popup = new Popup(app, "Goodbye, world!", null);
    popup.closePopup();
    expect(app.stage.removeChild).toHaveBeenCalledWith(popup.container);
    expect(Popup.activePopups.includes(popup)).toBeFalsy();
  });

  test("should handle dynamic screen resizing for small screens", () => {
    Object.defineProperty(window, "innerWidth", { value: 500 });
    const popup = new Popup(app, "Responsive text", null);
    expect(popup.container).toBeTruthy();
  });
});
