import switchScene from "../logic/interactions/switchScene";
import openUrlInNewTab from "../logic/interactions/openUrlInNewTab";
import displayWikiPage from "../logic/interactions/displayWikiPage";

import boxPropImage from "../resources/images/box_prop.png";
import mainSceneBackground from "../resources/images/background.png";
import bookshelfSceneBackground from "../resources/images/bookshelf_background.png";
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
        onInteraction: (app) => () => switchScene(app, "numpadScene"),
        zIndex: 0,
      },
      {
        image: bookshelfImage,
        type: "Item",
        name: "Box",
        location: {
          x: 0.33,
          y: 0.73,
        },
        width: 300,
        height: 310,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => switchScene(app, "bookshelfScene"),
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
        type: "Item",
        name: "Book 1",
        location: {
          x: 0.51,
          y: 0.33,
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
        type: "Item",
        name: "Book 2",
        location: {
          x: 0.44,
          y: 0.33,
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
        type: "Item",
        name: "Book 2",
        location: {
          x: 0.44,
          y: 0.6,
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
        type: "Item",
        name: "Book 1",
        location: {
          x: 0.58,
          y: 0.6,
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
};

export default gameData;
