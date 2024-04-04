import switchScene from "../logic/interactions/switchScene";
import openUrlInNewTab from "../logic/interactions/openUrlInNewTab";
import displayWikiPage from "../logic/interactions/displayWikiPage";
import checkDistance from "../logic/interactions/distanceCheckUtils.js";
import Player from "../logic/player.js";

import boxPropImage from "../resources/images/box_prop.png";
import mainSceneBackground from "../resources/images/background.png";
import bookshelfSceneBackground from "../resources/images/bookshelf_background.png";
import mouseholeSceneBackground1 from "../resources/images/mousehole_scene/mousehole1.png";
import mouseholeSceneBackground2 from "../resources/images/mousehole_scene/mousehole2.png";
// import computerSceneBackground from "../resources/images/computer_background.png";
import mouseholeImage from "../resources/images/mousehole_placeholder.png";
import backArrowImage from "../resources/images/back_arrow.png";
import book1 from "../resources/images/book_placeholder.png";
import book2 from "../resources/images/book2_placeholder.png";
import lockImage from "../resources/images/lock.png";
import numPadSceneBackground from "../resources/images/num_pad.png";
import bookshelfImage from "../resources/images/bookshelf.png";

const gameData = {
  mainScene: {
    background: mainSceneBackground,
    backgroundWidth: 1400,
    backgroundHeight: 800,
    items: [
      {
        image: boxPropImage,
        type: "Item",
        name: "Box",
        location: {
          x: 0.71,
          y: 0.93,
        },
        width: 100,
        height: 100,
        collisionHeight: 5, // not yet used
        onInteraction: null,
        zIndex: 1,
      },
      {
        image: lockImage,
        type: "Item",
        name: "Lock",
        location: {
          x: 0.53,
          y: 0.61,
        },
        width: 60,
        height: 80,
        collisionHeight: 5, // not yet used
        maxDistance: 250,
        onInteraction: (app) => () => checkDistance(app, 0.53, 0.61, "numpadScene", () => switchScene(app, "numpadScene")),
        zIndex: 0,
      },
      {
        image: bookshelfImage,
        type: "Item",
        name: "Bookshelf",
        location: {
          x: 0.33,
          y: 0.73,
        },
        width: 300,
        height: 310,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => checkDistance(app, 0.33, 0.73, "bookshelfScene", () => switchScene(app, "bookshelfScene")),
        zIndex: 0,
      },
      {
        image: mouseholeImage,
        type: "Item",
        name: "Mousehole",
        location: {
          x: 0.78,
          y: 0.8,
        },
        width: 50,
        height: 50,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => checkDistance(app, 0.78, 0.8, "mouseholeScene", () => switchScene(app, "mouseholeScene")),
        zIndex: 0,
      },
    ],
  },
  bookshelfScene: {
    background: bookshelfSceneBackground,
    backgroundWidth: 1400,
    backgroundHeight: 800,
    items: [
      {
        image: backArrowImage,
        type: "Item",
        name: "Back button",
        location: {
          x: 0.1,
          y: 0.2,
        },
        width: 164,
        height: 101,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => switchScene(app, "mainScene"),
        zIndex: 10,
      },
      {
        image: book1,
        type: "Book",
        name: "Honesty",
        location: {
          x: 0.52,
          y: 0.36,
        },
        width: 37,
        height: 85,
        collisionHeight: 5, // not yet used
        onInteraction: (app) => () =>
          displayWikiPage(
            "https://raw.githubusercontent.com/wiki/sepeliry/YhdistyksenToiminta/Peli%E2%80%93idea-:-Honesty.md"
          ),

        zIndex: 1,
      },

      {
        image: book2,
        type: "Book",
        name: "Wiki",
        location: {
          x: 0.44,
          y: 0.23,
        },
        width: 37,
        height: 85,
        collisionHeight: 5, // not yet used
        onInteraction: (app) => () =>
          openUrlInNewTab(
            "https://github.com/sepeliry/YhdistyksenToiminta/wiki"
          ),
        zIndex: 1,
      },
      {
        image: book2,
        type: "Book",
        name: "Vuodet",
        location: {
          x: 0.44,
          y: 0.5,
        },
        width: 37,
        height: 85,
        collisionHeight: 5, // not yet used
        onInteraction: (app) => () =>
          displayWikiPage(
            "https://raw.githubusercontent.com/wiki/sepeliry/YhdistyksenToiminta/Vuosikertomukset.md"
          ),
        zIndex: 1,
      },
      {
        image: book1,
        type: "Book",
        name: "Book 1",
        location: {
          x: 0.58,
          y: 0.64,
        },
        width: 37,
        height: 85,
        collisionHeight: 5, // not yet used
        onInteraction: null,
        zIndex: 1,
      },
    ],
  },
  numpadScene: {
    background: numPadSceneBackground,
    backgroundWidth: 1400,
    backgroundHeight: 800,
    items: [
      {
        image: backArrowImage,
        type: "Item",
        name: "Back button",
        location: {
          x: 0.1,
          y: 0.2,
        },
        width: 164,
        height: 101,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => switchScene(app, "mainScene"),
        zIndex: 10,
      },
    ],
  },
  mouseholeScene: {
    background: mouseholeSceneBackground1,
    backgroundWidth: 1400,
    backgroundHeight: 800,
    animatedSpriteTextures: [mouseholeSceneBackground1, mouseholeSceneBackground2],
    items: [
      {
        image: backArrowImage,
        type: "Item",
        name: "Back button",
        location: {
          x: 0.1,
          y: 0.2,
        },
        width: 164,
        height: 101,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => switchScene(app, "mainScene"),
        zIndex: 10,
      },
    ],
  },
  computerScene: {
    background: null, // TODO: add computerSceneBackground
    backgroundWidth: 1400,
    backgroundHeight: 800,
    items: [
      {
        image: backArrowImage,
        type: "Item",
        name: "Back button",
        location: {
          x: 0.1,
          y: 0.2,
        },
        width: 164,
        height: 101,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => switchScene(app, "mainScene"),
        zIndex: 10,
      },
    ],
  },
};

export default gameData;
