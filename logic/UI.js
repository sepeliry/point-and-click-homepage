import * as PIXI from "pixi.js";
import { resizeGame } from "./utils/resize";
import { checkDistance } from "./interactions/distanceCheckUtils.js";
import { generateWikiList, showWikiList } from "./utils/markdownUtils.js";

import { CRTFilter } from "@pixi/filter-crt";
import { followPlayer, moveCamera } from "./utils/cameraUtils.js";
import Book from "./book.js";
import Item from "./item.js";
import gameData from "../data/gameData.js";

class UI {
  constructor(app) {
    app.scenes = {};
    // create array for solid objects
    this.solidObjects = [];
    this.solidObjects.sortableChildren = true;
    this.books = [];
    this.books.sortableChildren = true;
    // create scenes from gameData.js
    this.createScenesFromGameData(app, gameData);
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
        container.filters = [new CRTFilter({ lineContrast: 0.09})];
      }

      if (sceneData.background) {
        const background = PIXI.Sprite.from(sceneData.background);
        // Set the background to fill the entire renderer view
        if (sceneName === "mainScene" && window.isMobile) {
          // To support cameraContainer usage on mobile
          background.width = 1400;
          background.height = 800;
        } else {
          background.width = app.renderer.width;
          background.height = app.renderer.height;
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
      // On mobile, use cameraContainer
      if (window.isMobile) {
        let gameContainerDOM = document.getElementById("game-container");
        gameContainerDOM.style.width = `${app.view.width}px`;
        gameContainerDOM.style.height = `${app.view.height}px`;
        const cameraContainer = new PIXI.Container();
        app.cameraContainer = cameraContainer;
        cameraContainer.addChild(app.mainScene);
        app.stage.addChild(cameraContainer);
      }
    });
  }

  createObjectsFromGameData(app, items, container) {
    console.log(items);
    items.forEach((itemData) => {
      if (itemData.type === "Book") {
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
        //this.solidObjects.push(book);
      } else {
        // Create an Item instance
        const item = new Item(
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
        // push solid items to solidObjects array
        this.solidObjects.push(item);
      }
    });
    console.log(container);
  }


  getScene(app, sceneName) {
    return app.scenes[sceneName];
  }
}

export default UI;
