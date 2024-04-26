import {
  Container,
  Sprite,
  Text,
  Texture,
  AnimatedSprite,
  CRTFilter,
  Assets,
} from "pixi.js";
import { CRTFilter, AdvancedBloomFilter } from "pixi-filters";
import { glowFilter } from "./utils/glowFilter.js";
import { GlowFilter } from "pixi-filters";
import { createWalkableAreas } from "./walkableArea.js";
import { ASPECT_RATIO, MAX_WIDTH } from "../constants/constants.js";
import Book from "./book.js";
import Item from "./item.js";
import gameData from "../data/gameData.js";
import Numpad from "./numpad.js";
import InventoryUI from "./inventory/inventoryUI.js";
import DesktopIcon from "./desktopIcon.js";

// Constants
import ITEM_TYPES from "../constants/itemTypes.js";
import BackButton from "./backButton.js";

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
          /* new AdvancedBloomFilter({
            threshold: 0.95,
            blur: 16,
            quality: 4,
            pixelSize: { x: 0.1, y: 0.1 },
          }),
          */
          new CRTFilter({
            lineContrast: 0.06,
            //noise: 0.1,
            //  noiseSize: 0.1,
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
      } else if (
        sceneName === "mouseholeScene" &&
        sceneData.animatedSpriteTextures
      ) {
        // Call the createAnimatedSprite method
        this.createAnimatedSprite(
          app,
          sceneData.animatedSpriteTextures,
          container
        );
        container.visible = false;
      } else {
        // hide other scenes by default
        container.visible = false;
      }
    });
  }

  createObjectsFromGameData(app, items, container) {
    //console.log(items);
    items.forEach((itemData) => {
      if (itemData.type === ITEM_TYPES.text) {
        const style = itemData.style;
        const text = new Text({ text: itemData.text, style });
        text.x = itemData.location.x * 1400;
        text.y = itemData.location.y * 800;
        text.visible = true;
        text.zIndex = itemData.zIndex;
        text.onStateChange = itemData.onStateChange;
        text.anchor.set(0.5, 0);

        if (itemData.identifier) {
          text.identifier = itemData.identifier;
        }

        if (itemData.onInteraction) {
          text.interactive = true;
          text.buttonMode = true;
          text.eventMode = "dynamic";
          text.cursor = "pointer";
          text.on("pointerdown", itemData.onInteraction(app, text));

          const glowEffect = new GlowFilter({
            innerStrength: 0,
            outerStrength: 1.8,
            quality: 0.1,
            alpha: 0.6,
            color: "c061cb",
          });
          text.filters = [glowEffect];
        } else {
          text.interactive = false;
        }

        container.addChild(text);

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
          // console.log(item);
          UI.solidObjects.push(item);
        }
      }
    });
    // console.log(container);
  }

  async createAnimatedSprite(app, frameUrls, container) {
    // Load all frame assets first
    await Assets.load(frameUrls);

    // After ensuring all assets are loaded, create textures from these assets
    const textureArray = frameUrls.map((url) => Texture.from(url));

    // Create an animated sprite with these textures
    const animatedSprite = new AnimatedSprite(textureArray);
    animatedSprite.width = 1400;
    animatedSprite.height = 800;
    animatedSprite.animationSpeed = 0.02;
    animatedSprite.loop = true;

    // Adding the sprite to the container
    container.addChild(animatedSprite);

    // Play the animation
    animatedSprite.play();
  }

  getScene(app, sceneName) {
    return app.scenes[sceneName];
  }

  createCameraContainer(app) {
    let gameContainerDOM = document.getElementById("game-container");
    // gameContainerDOM.style.width = `${app.view.width}px`;
    // gameContainerDOM.style.height = `${app.view.height}px`;
    const cameraContainer = new Container();
    app.cameraContainer = cameraContainer;
    cameraContainer.addChild(app.mainScene);

    app.stage.addChild(cameraContainer);
  }
}

export default UI;
