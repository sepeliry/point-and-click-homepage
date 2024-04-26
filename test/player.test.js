import Player from "../logic/player";
import { AnimatedSprite, Texture, Point } from "pixi.js";
import gameState from "../data/gameState";
import openPopup from "../logic/interactions/openPopup";

jest.mock("pixi.js", () => ({
  AnimatedSprite: jest.fn().mockImplementation(() => ({
    position: { set: jest.fn() },
    anchor: { set: jest.fn() },
    play: jest.fn(),
    addChild: jest.fn(),
    textures: [],
    zIndex: null,
    rotation: null,
    scale: { y: 1 },
    onComplete: null,
  })),
  Assets: {
    load: jest.fn().mockResolvedValue(true),
  },
  Texture: {
    from: jest.fn().mockImplementation((image) => ({ image })),
  },
  Point: jest.fn().mockImplementation(function (x, y) {
    this.x = x;
    this.y = y;
    this.clone = () =>
      new (jest.requireActual("pixi.js").Point)(this.x, this.y);
  }),
}));

jest.mock("../data/gameState", () => ({
  gameState: { playerIsMiniSize: false },
}));

jest.mock("../logic/interactions/openPopup", () => ({
  openPopup: jest.fn(),
}));

describe("Player", () => {
  let app;
  beforeEach(() => {
    app = {
      mainScene: {
        addChild: jest.fn(),
      },
      screen: { width: 800, height: 600 },
    };
  });

  test("Move player with no transformation", async () => {
    await Player.initialize(app);
    Player.targetPosition = new Point(100, 100);
    const solidObjects = [{ sprite: { x: 150, y: 150 } }];
    Player.move(Player.targetPosition, solidObjects);
    expect(Player.player.position.set).toHaveBeenCalledTimes(1);
  });

  test("Player set idle", () => {
    Player.setIdle();
    expect(Player.player.play).toHaveBeenCalled();
  });

  test("Minimize player", () => {
    Player.minimizePlayer();
    expect(Player.player.textures).not.toEqual(Player.playerIdleFrames); // Initial textures should be changed
    expect(Player.player.onComplete).toBeDefined();
  });

  test("Maximize player", () => {
    Player.maximizePlayer();
    expect(Player.player.textures).not.toEqual(Player.playerIdleFrames); // Initial textures should be changed
    expect(Player.player.onComplete).toBeDefined();
  });
});
