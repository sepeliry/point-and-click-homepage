import { resizeGame } from "../logic/utils/resize";
describe("resizeGame", () => {
  let app, scene;
  beforeEach(() => {
    // Mock app and scene objects + isMobile property
    app = {
      view: {
        parentNode: {
          clientWidth: 1400,
          clientHeight: 800,
        },
      },
      renderer: {
        resize: jest.fn(),
      },
    };
    scene = {
      visible: true,
      width: 0,
      height: 0,
    };
    Object.defineProperty(window, "isMobile", {
      value: false,
      writable: true,
    });
  });

  test("does not resize app or scene if scene is not visible", () => {
    scene.visible = false;
    resizeGame(app, scene);
    expect(app.renderer.resize).not.toHaveBeenCalled();

    // Check that scene width and height were not changed
    expect(scene.width).toBe(0);
    expect(scene.height).toBe(0);
  });

  test("does not resize app or scene if window.isMobile is true", () => {
    window.isMobile = true;
    resizeGame(app, scene);
    expect(app.renderer.resize).not.toHaveBeenCalled();

    // Check that scene width and height were not changed
    expect(scene.width).toBe(0);
    expect(scene.height).toBe(0);
  });

  test("resizes app and scene to maintain aspect ratio 1.", () => {
    app.view.parentNode.clientWidth = 1400;
    app.view.parentNode.clientHeight = 800;
    resizeGame(app, scene);

    expect(app.renderer.resize).toHaveBeenCalledWith(1400, 800);
    expect(scene.width).toBe(1400);
    expect(scene.height).toBe(800);
  });

  test("resizes app and scene to maintain aspect ratio 2. (Checking height)", () => {
    app.view.parentNode.clientWidth = 700;
    app.view.parentNode.clientHeight = 400;
    resizeGame(app, scene);

    const expectedWidth = 700;
    const expectedHeight = 700 / (1400 / 800);

    expect(app.renderer.resize).toHaveBeenCalledWith(
      expectedWidth,
      expectedHeight
    );
    expect(scene.width).toBe(expectedWidth);
    expect(scene.height).toBe(expectedHeight);
  });

  test("resizes app and scene to maintain aspect ratio 3. (Checking width)", () => {
    app.view.parentNode.clientWidth = 2800;
    app.view.parentNode.clientHeight = 1600;
    resizeGame(app, scene);

    const expectedWidth = 1600 * (1400 / 800);
    const expectedHeight = 1600;

    expect(app.renderer.resize).toHaveBeenCalledWith(
      expectedWidth,
      expectedHeight
    );
    expect(scene.width).toBe(expectedWidth);
    expect(scene.height).toBe(expectedHeight);
  });

  test("resizes app and scene to maintain aspect ratio when parentAspectRatio < gameAspectRatio", () => {
    app.view.parentNode.clientWidth = 800;
    app.view.parentNode.clientHeight = 1000;
    resizeGame(app, scene);

    // If parentAspectRatio < gameAspectRatio, resizeGame should calculate a matching width for the game
    const gameAspectRatio = 1400 / 800;
    const expectedHeight = 1000;
    const expectedWidth = expectedHeight * gameAspectRatio;

    expect(app.renderer.resize).toHaveBeenCalledWith(
      expectedWidth,
      expectedHeight
    );
    expect(scene.width).toBe(expectedWidth);
    expect(scene.height).toBe(expectedHeight);
  });

  test("resizes app and scene to maintain aspect ratio when parentAspectRatio > gameAspectRatio", () => {
    app.view.parentNode.clientWidth = 1400;
    app.view.parentNode.clientHeight = 800;
    resizeGame(app, scene);

    // If parentAspectRatio > gameAspectRatio, resizeGame should calculate a matching height for the game
    const gameAspectRatio = 1400 / 800;
    const expectedWidth = 1400;
    const expectedHeight = expectedWidth / gameAspectRatio;

    expect(app.renderer.resize).toHaveBeenCalledWith(
      expectedWidth,
      expectedHeight
    );
    expect(scene.width).toBe(expectedWidth);
    expect(scene.height).toBe(expectedHeight);
  });
});
