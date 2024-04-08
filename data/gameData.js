import switchScene from "../logic/interactions/switchScene";
import openUrlInNewTab from "../logic/interactions/openUrlInNewTab";
import displayWikiPage from "../logic/interactions/displayWikiPage";
import checkDistance from "../logic/interactions/distanceCheckUtils.js";
import collectItem from "../logic/interactions/collectItem.js";
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
import keyImage from "../resources/images/key.png";
import numPadSceneBackground from "../resources/images/numpad_scene/numpad_background.png";
import bookshelfImage from "../resources/images/bookshelf.png";
import potionImage from "../resources/images/potion.png";

import button1 from "../resources/images/numpad_scene/button1.png";
import button2 from "../resources/images/numpad_scene/button2.png";
import button3 from "../resources/images/numpad_scene/button3.png";
import button4 from "../resources/images/numpad_scene/button4.png";
import button5 from "../resources/images/numpad_scene/button5.png";
import button6 from "../resources/images/numpad_scene/button6.png";
import button7 from "../resources/images/numpad_scene/button7.png";
import button8 from "../resources/images/numpad_scene/button8.png";
import button9 from "../resources/images/numpad_scene/button9.png";
import button0 from "../resources/images/numpad_scene/button0.png";
import resetButton from "../resources/images/numpad_scene/resetButton.png";
import enterButton from "../resources/images/numpad_scene/enterButton.png";

import Numpad from "../logic/numpad.js";

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
        image: potionImage,
        type: "Item",
        name: "Potion",
        location: {
          x: 0.2,
          y: 0.7,
        },
        width: 70,
        height: 70,
        collisionHeight: 5, // not yet used
        onInteraction: (app) => () =>
          checkDistance(app, 0.2, 0.7, "mainScene", () =>
            Player.minimizePlayer()
          ),
        zIndex: 1,
      },
      /*
      {
        image: keyImage,
        type: "Item",
        name: "Key",
        location: {
          x: 0.6,
          y: 0.8,
        },
        width: 70,
        height: 70,
        collisionHeight: 5, // not yet used
        onInteraction: (app) => () =>
          checkDistance(app, 0.6, 0.8, "mainScene", () =>
            collectItem(app, "mainScene", "Key")
          ),
        zIndex: 1,
      },
      */
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
        onInteraction: (app) => () => switchScene(app, "numpadScene"),
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
        onInteraction: (app) => () =>
          checkDistance(app, 0.33, 0.73, "bookshelfScene", () =>
            switchScene(app, "bookshelfScene")
          ),
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
        onInteraction: (app) => () =>
          checkDistance(app, 0.78, 0.8, "mouseholeScene", () =>
            switchScene(app, "mouseholeScene")
          ),
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
    backgroundWidth: 1792,
    backgroundHeight: 1024,
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
        type: "Text",
        text: "",
        identifier: "screenText",
        style: {
          breakWords: true,
          dropShadow: true,
          dropShadowAlpha: 0.1,
          dropShadowAngle: 0.6,
          dropShadowDistance: 3,
          fill: "#fff0ff",
          fontFamily: "Lucida Console",
          fontSize: 50,
          align: "center",
          fontWeight: "bold",
          stroke: "#edceeb",
          strokeThickness: 1,
          wordWrap: false,
          wordWrapWidth: 600,
          lineHeight: 117,
        },
        location: {
          x: 700,
          y: 112,
        },
        zIndex: 10,
        onInteraction: null,
      },
      {
        image: button1,
        type: "Item",
        name: "button for 1",
        location: {
          x: 0.42,
          y: 0.475,
        },
        width: 108.5,
        height: 99.2,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          console.log(app.scenes["numpadScene"].children);
          Numpad.inputCode(1);
        },
        zIndex: 10,
      },
      {
        image: button2,
        type: "Item",
        name: "button for 2",
        location: {
          x: 0.505,
          y: 0.475,
        },
        width: 108.5,
        height: 99.2,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          //console.log(app.scenes["numpadScene"].children);
          Numpad.inputCode(2);
        },
        zIndex: 10,
      },
      {
        image: button3,
        type: "Item",
        name: "button for 3",
        location: {
          x: 0.59,
          y: 0.475,
        },
        width: 108.5,
        height: 99.2,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          //console.log(app.scenes["numpadScene"].children);
          Numpad.inputCode(3);
        },
        zIndex: 10,
      },
      {
        image: button4,
        type: "Item",
        name: "button for 4",
        location: {
          x: 0.42,
          y: 0.605,
        },
        width: 108.5,
        height: 99.2,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          //console.log(app.scenes["numpadScene"].children);
          Numpad.inputCode(4);
        },
        zIndex: 10,
      },
      {
        image: button5,
        type: "Item",
        name: "button for 5",
        location: {
          x: 0.505,
          y: 0.605,
        },
        width: 108.5,
        height: 99.2,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          //console.log(app.scenes["numpadScene"].children);
          Numpad.inputCode(5);
        },
        zIndex: 10,
      },
      {
        image: button6,
        type: "Item",
        name: "button for 6",
        location: {
          x: 0.59,
          y: 0.605,
        },
        width: 108.5,
        height: 99.2,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          //console.log(app.scenes["numpadScene"].children);
          Numpad.inputCode(6);
        },
        zIndex: 10,
      },
      {
        image: button7,
        type: "Item",
        name: "button for 7",
        location: {
          x: 0.42,
          y: 0.735,
        },
        width: 108.5,
        height: 99.2,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          //console.log(app.scenes["numpadScene"].children);
          Numpad.inputCode(7);
        },
        zIndex: 10,
      },
      {
        image: button8,
        type: "Item",
        name: "button for 8",
        location: {
          x: 0.505,
          y: 0.735,
        },
        width: 108.5,
        height: 99.2,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          //console.log(app.scenes["numpadScene"].children);
          Numpad.inputCode(8);
        },
        zIndex: 10,
      },
      {
        image: button9,
        type: "Item",
        name: "button for 9",
        location: {
          x: 0.59,
          y: 0.735,
        },
        width: 108.5,
        height: 99.2,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          //console.log(app.scenes["numpadScene"].children);
          Numpad.inputCode(9);
        },
        zIndex: 10,
      },
      {
        image: resetButton,
        type: "Item",
        name: "reset",
        location: {
          x: 0.42,
          y: 0.84,
        },
        width: 108.5,
        height: 78.9,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          Numpad.resetCode();
        },
        zIndex: 10,
      },
      {
        image: button0,
        type: "Item",
        name: "button for 0",
        location: {
          x: 0.505,
          y: 0.84,
        },
        width: 108.5,
        height: 78.9,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          Numpad.inputCode(0);
        },
        zIndex: 10,
      },
      {
        image: enterButton,
        type: "Item",
        name: "enter",
        location: {
          x: 0.59,
          y: 0.84,
        },
        width: 108.5,
        height: 78.9,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          Numpad.enterCode();
        },
        zIndex: 10,
      },
    ],
  },
  mouseholeScene: {
    background: mouseholeSceneBackground1,
    backgroundWidth: 1400,
    backgroundHeight: 800,
    animatedSpriteTextures: [
      mouseholeSceneBackground1,
      mouseholeSceneBackground2,
    ],
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
