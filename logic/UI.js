import { Container, Sprite, CRTFilter, Assets } from "pixi.js";
import { CRTFilter } from "pixi-filters";
import TextItem from "./text.js";
import { createWalkableAreas } from "./walkableArea.js";
import Book from "./book.js";
import Item from "./item.js";
import gameData from "../data/gameData.js";
import Numpad from "./numpad.js";
import InventoryUI from "./inventory/inventoryUI.js";
import DesktopIcon from "./desktopIcon.js";

// Constants
import ITEM_TYPES from "../constants/itemTypes.js";

class UI {
  static solidObjects = null;

  constructor(app) {
    this.app = app;
  }

  async initialize() {
    this.app.scenes = {};
    UI.solidObjects = [];
    UI.solidObjects.sortableChildren = true;
    this.books = [];
    this.books.sortableChildren = true;

    await this.loadAssetsAndCreateScenes(gameData);
    // Preload and setup scenes and inventory
    await this.createScenesFromGameData(this.app, gameData);
    await InventoryUI.initialize(this.app);
    createWalkableAreas(this.app);
  }

  async loadAssetsAndCreateScenes(gameData) {
    // Step 1: Collect all images from game data
    const allImages = new Set();
    Object.values(gameData).forEach((sceneData) => {
      sceneData.items.forEach((item) => {
        if (item.image) {
          allImages.add(item.image); // Only add unique images
        }
      });
    });

    // Step 2: Load all images as a bundle
    try {
      await Assets.loadBundle("Assets", Array.from(allImages), (progress) => {
        console.log(progress);
      });
    } catch (error) {
      console.error("Failed to load assets:", error);
      return;
    }
  }

  updateProgress(progress) {
    // Update loading UI based on progress
    console.log(`Loading progress: ${progress * 100}%`);
    // Assume there's a function to update a visual progress bar
    updateLoadingBar(progress);
  }

  async createScenesFromGameData(app, gameData) {
    // First, collect all background URLs to preload
    const backgroundsToLoad = Object.values(gameData)
      .filter((data) => data.background)
      .map((data) => data.background);

    // Preload all backgrounds
    await Assets.load(backgroundsToLoad);

    // Now create scenes
    Object.entries(gameData).forEach(([sceneName, sceneData]) => {
      let container = app.scenes[sceneName];
      if (!container) {
        container = new Container();
        container.label = sceneName;
        container.sortableChildren = true;
        container.filters = [
          new CRTFilter({
            lineContrast: 0.06,
            vignettingAlpha: 1,
            vignettingBlur: 0.5,
            vignetting: 0.25,
          }),
        ];

        app.stage.addChild(container);
        app.scenes[sceneName] = container;
      }

      if (sceneData.background) {
        const background = Sprite.from(sceneData.background);
        background.width = 1400;
        background.height = 800;
        if (sceneData.onStateChange) {
          background.onStateChange = sceneData.onStateChange;
        }
        container.addChild(background);
      }

      // populate scene with items
      // now objects are only displayed when their scene is visible = better performance?
      this.createObjectsFromGameData(app, sceneData.items, container);

      if (sceneName === "mainScene") {
        // set / show mainScene by default
        app.mainScene = container;
        container.visible = true;
      } else {
        // hide other scenes by default
        container.visible = false;
      }
    });
  }

  createObjectsFromGameData(app, items, container) {
    items.forEach((itemData) => {
      if (itemData.type === ITEM_TYPES.text) {
        const text = new TextItem(app, container, itemData);
        // set code text for numpad scene
        if (
          container.label === "numpadScene" &&
          itemData.identifier === "screenText"
        ) {
          Numpad.setCodeText(text);
        }
      } else if (itemData.type === ITEM_TYPES.book) {
        Book.create(app, container, itemData);
      } else if (itemData.type === ITEM_TYPES.desktopIcon) {
        DesktopIcon.create(app, container, itemData);
      } else if (itemData.type === ITEM_TYPES.item) {
        const item = Item.create(app, container, itemData);
        // push solid items to solidObjects array
        if (container.label === "mainScene") {
          UI.solidObjects.push(item);
        }
      }
    });
  }

  getScene(app, sceneName) {
    return app.scenes[sceneName];
  }

  createCameraContainer(app) {
    const cameraContainer = new Container();
    app.cameraContainer = cameraContainer;
    cameraContainer.addChild(app.mainScene);

    app.stage.addChild(cameraContainer);
  }
}

export default UI;
