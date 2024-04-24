import { Container, Sprite, Text, Texture, AnimatedSprite } from "pixi.js";
import { CRTFilter } from "@pixi/filter-crt";
import { glowFilter } from "./utils/glowFilter.js";
import { GlowFilter } from "@pixi/filter-glow";
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
    app.scenes = {};

    // create array for solid objects
    UI.solidObjects = [];
    UI.solidObjects.sortableChildren = true;
    this.books = [];
    this.books.sortableChildren = true;

    // create scenes from gameData.js
    this.createScenesFromGameData(app, gameData);
    // Create a camera container for the mobile view
    // this.createCameraContainer(app);
    createWalkableAreas(app);
    InventoryUI.initialize(app);
  }

  createScenesFromGameData(app, gameData) {
    Object.entries(gameData).forEach(([sceneName, sceneData]) => {
      let container = app.scenes[sceneName];
      if (!container) {
        container = new Container();
        container.name = sceneName;
        container.sortableChildren = true;
        app.stage.addChild(container);
        app.scenes[sceneName] = container;
        container.filters = [new CRTFilter({ lineContrast: 0.03 })];
      }

      if (sceneData.background) {
        const background = Sprite.from(sceneData.background);
        // Set the background to fill the entire renderer view

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
        const text = new Text(itemData.text, itemData.style);
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
          itemData.onInteraction,
          glowFilter
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
    const textureArray = frameUrls.map((url) => Texture.from(url));
    const animatedSprite = new AnimatedSprite(textureArray);
    animatedSprite.width = 1400;
    animatedSprite.height = 800;
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
    const cameraContainer = new Container();
    app.cameraContainer = cameraContainer;
    cameraContainer.addChild(app.mainScene);

    app.stage.addChild(cameraContainer);
  }
}

export default UI;
