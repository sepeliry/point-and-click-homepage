import * as PIXI from "pixi.js";
import { resizeGame } from "./utils/resize";
import { checkDistance } from "./interactions/distanceCheckUtils.js";
import { generateWikiList, showWikiList } from "./utils/markdownUtils.js";
import { ASPECT_RATIO } from "../constants/constants.js";
import { CRTFilter } from "@pixi/filter-crt";
import { followPlayer, moveCamera } from "./utils/cameraUtils.js";
import Book from "./book.js";
import Item from "./item.js";
import gameData from "../data/gameData.js";
import gameState from "../data/gameState.js";
import Numpad from "./numpad.js";
import { createWalkableAreas } from "./walkableArea.js";
import InventoryUI from "./inventory/inventoryUI.js";
import DesktopIcon from "./desktopIcon.js";
import ITEM_TYPES from "../constants/itemTypes.js";
import BackButton from "./backButton.js";

class UI {
  static solidObjects = null;
  constructor(app) {
    app.scenes = {};

    // create array for solid objects
    UI.solidObjects = [];
    UI.solidObjects.sortableChildren = true;
    this.books = [];
    this.books.sortableChildren = true;

    // create scenes from gameData.js
    this.createScenesFromGameData(app, gameData);
    // Create a camera container for the mobile view
    this.createCameraContainer(app);
    createWalkableAreas(app);
    InventoryUI.initialize(app);
  }

  createScenesFromGameData(app, gameData) {
    Object.entries(gameData).forEach(([sceneName, sceneData]) => {
      let container = app.scenes[sceneName];
      if (!container) {
        container = new PIXI.Container();
        container.name = sceneName;
        container.sortableChildren = true;
        app.stage.addChild(container);
        app.scenes[sceneName] = container;
        container.filters = [new CRTFilter({ lineContrast: 0.03 })];
      }

      if (sceneData.background) {
        const background = PIXI.Sprite.from(sceneData.background);
        // Set the background to fill the entire renderer view

        const targetHeight = Math.min(window.innerHeight, screen.height); // Target the full height of the window
        const targetWidth = targetHeight * ASPECT_RATIO;

        background.width = targetWidth;
        background.height = targetHeight;

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
        // Calculate vertical centering

        const containerBounds = container.getBounds();
        const containerWidth = containerBounds.width;

        // Center the container horizontally so only the center is visible
        const screenWidth = window.innerWidth; // Get the current width of the screen
        container.x = screenWidth / 2 - containerWidth / 2 - containerBounds.x;
      }
    });
  }

  createObjectsFromGameData(app, items, container) {
    //console.log(items);
    items.forEach((itemData) => {
      if (itemData.type === ITEM_TYPES.text) {
        const text = new PIXI.Text(itemData.text, itemData.style);
        text.x = itemData.location.x;
        text.y = itemData.location.y;
        text.visible = true;
        text.zIndex = itemData.zIndex;
        text.onStateChange = itemData.onStateChange;
        text.anchor.set(0.475, 0);
        if (itemData.identifier) {
          text.identifier = itemData.identifier;
        }
        container.addChild(text);

        // set code text for numpad scene
        if (
          container.name === "numpadScene" &&
          itemData.identifier === "screenText"
        ) {
          Numpad.setCodeText(text);
        }
      } else if (itemData.type === ITEM_TYPES.book) {
        new Book(
          app,
          container,
          itemData.image,
          itemData.location.x,
          itemData.location.y,
          itemData.zIndex,
          itemData.height,
          itemData.width,
          itemData.name,
          itemData.onInteraction
        );
      } else if (itemData.type === ITEM_TYPES.desktopIcon) {
        new DesktopIcon(app, container, itemData);
      } else if (itemData.type === ITEM_TYPES.item) {
        const item = new Item(app, container, itemData);
        // push solid items to solidObjects array
        if (container.name === "mainScene") {
          // console.log(item);
          //  if (itemData.name === "Box" || itemData.name === "Computer Desk") {
          UI.solidObjects.push(item);
          //  }
        }
      } else if (itemData.type === ITEM_TYPES.backButton) {
        const backButton = new BackButton(app, container, itemData);
      } else if (itemData.type === ITEM_TYPES.book) {
        // Create a Book instance instead of an Item instance
        const book = new Book(
          app,
          container,
          itemData.image,
          itemData.location.x,
          itemData.location.y,
          itemData.zIndex,
          itemData.height,
          itemData.width,
          itemData.name,
          itemData.onInteraction
        );
      }
    });
    // console.log(container);
  }

  createAnimatedSprite(app, frameUrls, container) {
    const textureArray = frameUrls.map((url) => PIXI.Texture.from(url));
    const animatedSprite = new PIXI.AnimatedSprite(textureArray);
    animatedSprite.width = app.renderer.width;
    animatedSprite.height = app.renderer.height;
    animatedSprite.animationSpeed = 0.02;
    animatedSprite.loop = true;
    animatedSprite.play();
    container.addChild(animatedSprite);
  }

  getScene(app, sceneName) {
    return app.scenes[sceneName];
  }

  createCameraContainer(app) {
    let gameContainerDOM = document.getElementById("game-container");
    // gameContainerDOM.style.width = `${app.view.width}px`;
    // gameContainerDOM.style.height = `${app.view.height}px`;
    const cameraContainer = new PIXI.Container();
    app.cameraContainer = cameraContainer;
    cameraContainer.addChild(app.mainScene);

    app.stage.addChild(cameraContainer);
  }
}

export default UI;
