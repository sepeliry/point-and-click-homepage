import Popup from "../logic/popup";

jest.mock("pixi.js", () => {
  const actualPixi = jest.requireActual("pixi.js");
  return {
    ...actualPixi,
    Container: jest.fn().mockImplementation(() => {
      const children = [];
      return {
        addChild: jest.fn((child) => children.push(child)),
        removeChild: jest.fn((child) => {
          const index = children.indexOf(child);
          if (index > -1) {
            children.splice(index, 1);
          }
        }),
        children,
        x: 0,
        y: 0,
      };
    }),
    Graphics: jest.fn().mockImplementation(() => {
      return {
        lineStyle: jest.fn(),
        beginFill: jest.fn(),
        drawRect: jest.fn(),
        endFill: jest.fn(),
        width: 0,
        alpha: 1,
      };
    }),
    Text: jest.fn().mockImplementation(() => ({
      text: "",
      position: {
        set: jest.fn(),
      },
      anchor: {
        set: jest.fn(),
      },
    })),
  };
});

describe("Popup", () => {
  let appMock;
  beforeEach(() => {
    appMock = {
      screen: { width: 1024, height: 768 },
      stage: { addChild: jest.fn(), removeChild: jest.fn() },
      mainScene: { on: jest.fn(), off: jest.fn() },
    };
  });

  it("should correctly initialize a popup and add to active popups", () => {
    const popup = new Popup(appMock, "Test Message", null);
    expect(Popup.activePopups).toContain(popup);
    expect(appMock.stage.addChild).toHaveBeenCalledWith(popup.container);
  });

  it("should adapt popup width for smaller screens", () => {
    appMock.screen.width = 800;
    const popup = new Popup(appMock, "Test Message", null);
    expect(popup.container.children[0].width).toBe(appMock.screen.width - 40);
  });
});
