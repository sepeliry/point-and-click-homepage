import * as PIXI from "pixi.js";
import { resizeGame } from "./utils/resize";
import { checkDistance } from "./utils/distanceCheckUtils.js";
import { generateWikiList, showWikiList } from "./utils/markdownUtils.js";
import Player from "./player";
import { CRTFilter } from "@pixi/filter-crt";
import { followPlayer, moveCamera } from "./utils/cameraUtils.js";
import Bookshelf from "./bookshelf.js";
import Numpad from "./numpad";
import Mousehole from "./mousehole";
import Item from "./item.js";

import arrow_left from "../resources/images/arrow_left.png";
import arrow_right from "../resources/images/arrow_right.png";
import keyImage from "../resources/images/key.png";
import potionImg from "../resources/images/potion.png";
import boxPropImage from "../resources/images/box_prop.png";
import backgroundImg from "../resources/images/background.png";
import back_arrowImg from "../resources/images/back_arrow.png";

class UI {
  constructor(app) {
    /**
     * @constructor - Creates a UI instance with different view containers and adds background to them
     * @param {PIXI.Application} app - Application where the UI is added to
     */

    // Container for main game elements
    const gameContainer = new PIXI.Container();
    gameContainer.sortableChildren = true;
    // If the user is on mobile, gameContainer is instead added to cameraContainer later
    window.isMobile ? null : app.stage.addChild(gameContainer);
    app.gameContainer = gameContainer;
    gameContainer.filters = [new CRTFilter()];
    gameContainer.visible = true;

    // Create background sprite
    const backgroundTexture = PIXI.Texture.from(backgroundImg);
    const background = new PIXI.Sprite(backgroundTexture);
    background.width = 1400;
    background.height = 800;
    app.gameContainer.addChild(background);

    // Camera container
    if (window.isMobile) {
      let gameContainerDOM = document.getElementById("game-container");
      gameContainerDOM.style.width = `${app.view.width}px`;
      gameContainerDOM.style.height = `${app.view.height}px`;
      const cameraContainer = new PIXI.Container();
      app.cameraContainer = cameraContainer;
      cameraContainer.addChild(gameContainer);
      app.stage.addChild(cameraContainer);
    }

    // Generate content
    this.solidObjects = [];
    this.solidObjects.sortableChildren = true;

    // Create collectable items
    this.key = new Item(app, keyImage, 0.66, 0.735);

    // Create interactable object
    this.box_prop = new Item(app, boxPropImage, 0.71, 0.93);
    this.box_prop.height = 100;
    this.box_prop.width = 100;
    generateWikiList();
    this.box_prop.on("pointerdown", () => showWikiList(app, app.gameContainer));
    this.solidObjects.push(this.box_prop);

    // Test object for collision dev
    this.box_propCollision = new Item(app, boxPropImage, 0.3, 0.95);
    this.box_propCollision.height = 100;
    this.box_propCollision.width = 100;
    this.box_propCollision.eventMode = "none";
    this.solidObjects.push(this.box_propCollision);

    // Drinkable potion, makes player small
    this.potion = new Item(app, potionImg, 0.1, 0.95);
    this.potion.height = 100;
    this.potion.width = 100;

    // Initialize containers
    const bookshelfContainer = new PIXI.Container();
    app.stage.addChild(bookshelfContainer);
    app.bookshelfContainer = bookshelfContainer;

    const mouseholeContainer = new PIXI.Container();
    app.stage.addChild(mouseholeContainer);
    app.mouseholeContainer = mouseholeContainer;

    const numpadContainer = new PIXI.Container();
    app.stage.addChild(numpadContainer);
    app.numpadContainer = numpadContainer;

    // Used in pdfUtils to display list of pdfs
    const pdfContainer = new PIXI.Container();
    app.stage.addChild(pdfContainer);
    app.pdfContainer = pdfContainer;

    // Store references to all containers
    this.containers = {
      game: app.gameContainer,
      bookshelf: app.bookshelfContainer,
      numpad: app.numpadContainer,
      mousehole: app.mouseholeContainer,
    };

    this.toggleView = (viewName) => {
      return () => {
        let gameContainerVisible = false;
        Object.entries(this.containers).forEach(([name, container]) => {
          if (name !== viewName) {
            container.visible = false;
          } else {
            container.visible = !container.visible; // Toggle the visibility of the specified view
            if (container.visible) {
              gameContainerVisible = true; // Set gameContainerVisible to true if the specified view is visible
            }
          }
        });
        // Ensure that gameContainer is visible if no other view is visible
        if (!gameContainerVisible) {
          this.containers.game.visible = true;
        }
      };
    };

    // Generate game views
    this.bookshelf = new Bookshelf(app, this.toggleView("bookshelf"));
    this.numpad = new Numpad(app, this.toggleNumpad(app));
    this.mousehole = new Mousehole(app, this.toggleMousehole(app));
  }

  toggleBookshelf(app) {
    /**
     * Function to toggle visibility of bookshelf view
     * @param {PIXI.Application} app - Application where the UI is
     */
    return () => {
      app.gameContainer.visible = !app.gameContainer.visible;
      app.bookshelfContainer.visible = !app.bookshelfContainer.visible;
    };
  }
  toggleNumpad(app) {
    /**
     * Function to toggle visibility of numpad view
     * @param {PIXI.Application} app - Application where the UI is
     */
    return () => {
      app.gameContainer.visible = !app.gameContainer.visible;
      app.numpadContainer.visible = !app.numpadContainer.visible;
    };
  }
  toggleMousehole(app) {
    /**
     * Function to toggle visibility of mousehole view
     * @param {PIXI.Application} app - Application where the UI is
     */
    return () => {
      app.gameContainer.visible = !app.gameContainer.visible;
      app.mouseholeContainer.visible = !app.mouseholeContainer.visible;
    };
  }
}

export default UI;
