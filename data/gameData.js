import * as PIXI from "pixi.js";

import switchScene from "../logic/interactions/switchScene.js";
import openUrlInNewTab from "../logic/interactions/openUrlInNewTab.js";
import displayWikiPage from "../logic/interactions/displayWikiPage.js";
import openPopup from "../logic/interactions/openPopup.js";
import checkDistance from "../logic/interactions/distanceCheckUtils.js";
import Player from "../logic/player.js";

import boxPropImage from "../resources/images/box_prop.png";
import mainSceneBackground from "../resources/images/background.png";
import bookshelfSceneBackground from "../resources/images/bookshelf_background.png";
import mouseholeSceneBackground1 from "../resources/images/mousehole_scene/mousehole1.png";
import mouseholeSceneBackground2 from "../resources/images/mousehole_scene/mousehole2.png";

import lamp1On from "../resources/images/lamp_1_on.png";
import lamp1Off from "../resources/images/lamp_1_off.png";

import arcadeMachine2Off from "../resources/images/arcade_machine_2_off.png";
import arcadeMachine2OnFrame1 from "../resources/images/arcade_machine_2_on_frame1.png";
import arcadeMachine2OnFrame2 from "../resources/images/arcade_machine_2_on_frame2.png";
import arcadeMachine2OnFrame3 from "../resources/images/arcade_machine_2_on_frame3.png";

import computerDeskImage from "../resources/images/computer_desk.png";
import computerDeskWithCoffeeCupImage from "../resources/images/computer_desk_with_coffee_cup.png";

import mouseholeImage from "../resources/images/mousehole_in_wall_tilted.png";
import mouseholeImageEyes from "../resources/images/mousehole_in_wall_tilted_eyes.png";
import backArrowImage from "../resources/images/back_arrow.png";
import book1 from "../resources/images/book_placeholder.png";
import book2 from "../resources/images/book2_placeholder.png";
import lockImage from "../resources/images/num_pad.png";
import keyImage from "../resources/images/key.png";
import numPadSceneBackground from "../resources/images/numpad_scene/numpad_background.png";
import bookshelfImage from "../resources/images/bookshelf.png";

import arcadeMachineOff from "../resources/images/arcade_machine_off.png";
import arcadeMachineOn from "../resources/images/arcade_machine_on.png";
import computerSceneBackground from "../resources/images/computer_scene/computer_scene.jpg";
import discordIcon from "../resources/images/computer_scene/discord_icon.png";
import signupIcon from "../resources/images/computer_scene/signup_icon.png";

import coffeeMakerImage from "../resources/images/coffee_maker.png";
import coffeeMakerFrame1 from "../resources/images/coffee_maker_frame1.png";
import coffeeMakerFrame2 from "../resources/images/coffee_maker_frame2.png";
import coffeeMakerFrame3 from "../resources/images/coffee_maker_frame3.png";
import plantImage from "../resources/images/plant.png";
import coffeeImage from "../resources/images/coffee.png";
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
import coffeeCupImage from "../resources/images/computer_scene/coffee_cup.png";
import Numpad from "../logic/numpad.js";
import gameState from "./gameState.js";

import updateSpriteTexture from "../logic/interactions/updateSpriteTexture.js";
import updateAnimatedSpriteTextures from "../logic/interactions/updateAnimatedSpriteTextures.js";

import ITEM_TYPES from "../constants/itemTypes.js";

import removeSprite from "../logic/interactions/removeSprite.js";

const gameData = {
  mainScene: {
    background: mainSceneBackground,
    backgroundWidth: 1400,
    backgroundHeight: 800,
    items: [
      {
        image: boxPropImage,
        onStateChange: null,
        type: ITEM_TYPES.item,
        name: "Box",
        location: {
          x: 0.61,
          y: 0.93,
        },
        width: 100,
        height: 100,
        collisionHeight: 5, // not yet used
        onInteraction: (app) => () => {
          console.log(gameState.inventory);
          openPopup(
            app,
            "This is a box and arcade game is now on! check gameState :)",
            null
          );
          gameState.hasCompletedGame = !gameState.hasCompletedGame;
          console.log(gameState);

          if (gameState.hasCompletedGame) {
            //console.log("has compelted!!");
          }
        },
        zIndex: 2,
      },
      {
        image: keyImage,
        onStateChange: (app, item) => {
          /*
          // test if graphics can be updated when different states change
          if (gameState.hasUnlockedDoor) {
            updateSpriteTexture(item, lockImage);
          }
          if (gameState.hasCompletedGame) {
            updateSpriteTexture(item, book1);
          }
          */
        },
        animation: null,
        type: ITEM_TYPES.item,
        name: "Key",
        location: {
          x: 0.47,
          y: 0.9,
        },
        width: 267 * 0.25,
        height: 400 * 0.25,
        collisionHeight: 0, // not yet used
        onInteraction: (app, item) => () => {
          console.log("key clicked");
          gameState.hasUnlockedDoor = true;
          console.log(item);
          gameState.inventory.addItem("Key", item);
          removeSprite(app, item);
        },
        zIndex: 1,
      },
      /*
      {
        image: null, // null if the item has an animation
        onStateChange: (app, item) => {
          if (gameState.hasCompletedGame) {
            updateAnimatedSpriteTextures(
              item,
              [
                arcadeMachine2OnFrame1,
                arcadeMachine2OnFrame2,
                arcadeMachine2OnFrame3,
              ],
              0.06,
              false
            );
          }
        },
        animation: {
          frames: [arcadeMachine2Off],
          animationSpeed: 0.06,
          loop: false,
          interval: 3000, //ms
        },
        type: ITEM_TYPES.item,
        name: "Arcade machine 2",
        location: {
          x: 0.45,
          y: 0.32,
        },
        width: 157 * 0.8,
        height: 271 * 0.8,
        collisionHeight: 0, // not yet used
        interactionRange: 50,
        onInteraction: (app) => () => {
          if (gameState.hasCompletedGame) {
            openPopup(app, "congraz! arcade machine is now on", null);
          } else {
            console.log("please complete the game");
            openPopup(app, "This item cannot be used yet", null);
          }
        },
        zIndex: 0,
      },
      */
      {
        image: null, // null if the item has an animation

        onStateChange: (app, item) => {
          if (gameState.hasCompletedGame) {
            updateAnimatedSpriteTextures(
              item,
              [
                arcadeMachine2OnFrame1,
                arcadeMachine2OnFrame2,
                arcadeMachine2OnFrame3,
              ],
              0.06,
              true
            );
          }
        },

        animation: {
          frames: [arcadeMachine2Off],
          animationSpeed: 0.06,
          loop: true,
          interval: 3000, //ms
        },
        type: ITEM_TYPES.item,
        name: "Arcade machine 2",
        location: {
          x: 0.45,
          y: 0.7,
        },
        width: 157 * 0.8,
        height: 271 * 0.8,
        collisionHeight: 0, // not yet used
        interactionRange: 50,
        onInteraction: (app) => () => {
          if (gameState.hasCompletedGame) {
            openPopup(app, "congraz! arcade machine is now on", null);
          } else {
            console.log("please complete the game");
            openPopup(app, "This item cannot be used yet", null);
          }
        },
        zIndex: 0,
      },
      {
        image: lockImage,
        type: ITEM_TYPES.item,
        name: "Lock",
        location: {
          x: 0.534,
          y: 0.61,
        },
        width: 48,
        height: 64,
        collisionHeight: 5, // not yet used
        maxDistance: 250,
        onInteraction: (app) => () => switchScene(app, "numpadScene"),
        zIndex: 0,
      },
      {
        image: coffeeImage,
        animation: null,
        type: ITEM_TYPES.item,
        name: "Coffee",
        location: {
          x: 0.81,
          y: 0.895,
        },
        width: 267 * 0.25,
        height: 400 * 0.25,
        collisionHeight: 0, // not yet used
        onInteraction: (app, item) => () => {
          console.log("kahvii");

          gameState.inventory.addItem("Coffee", item);
          removeSprite(app, item);
        },
        zIndex: 2,
      },
      {
        image: null,
        animation: {
          frames: [coffeeMakerFrame1, coffeeMakerFrame2, coffeeMakerFrame3],
          animationSpeed: 0.04,
          loop: true,
          interval: 3000, //ms
        },
        type: ITEM_TYPES.item,
        name: "Coffee maker",
        location: {
          x: 0.67,
          y: 0.595,
        },
        width: 267 * 0.25,
        height: 400 * 0.25,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () =>
          checkDistance(app, 0.7, 0.595, "mainScene", () => {
            if (!gameState.inventory.itemExists("Coffee")) {
              openPopup(app, "need more coffee", null);
              return;
            } else if (!gameState.inventory.itemExists("Coffee cup")) {
              openPopup(app, "where is my coffee cup?", null);
              return;
            }

            // remove coffee from inventory
            gameState.inventory.removeItem("Coffee");

            openPopup(app, "hyvää kahvia", null);
            Player.minimizePlayer();
            gameState.playerIsMiniSize = true;
          }),
        zIndex: 0,
      },
      {
        image: bookshelfImage,
        type: ITEM_TYPES.item,
        name: "Bookshelf",
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
      {
        image: computerDeskWithCoffeeCupImage,
        type: ITEM_TYPES.item,
        onStateChange: (app, item) => {
          if (gameState.inventory.itemExists("Coffee cup")) {
            updateSpriteTexture(item, computerDeskImage);
          }
        },
        animation: null,
        name: "Computer desk",
        location: {
          x: 0.16,
          y: 0.92,
        },
        width: 292,
        height: 286,
        collisionHeight: 0, // not yet used
        interactionRange: 50,
        onInteraction: (app) => () => switchScene(app, "computerScene"),
        zIndex: 0,
      },

      {
        image: arcadeMachineOff,
        type: ITEM_TYPES.item,
        name: "Arcade machine",

        onStateChange: (app, item) => {
          if (gameState.hasCompletedGame) {
            updateAnimatedSpriteTextures(
              item,
              [arcadeMachineOn, arcadeMachineOff],
              0.02,
              true
            );
          }
        },

        animation: {
          frames: [arcadeMachineOff],
          animationSpeed: 0.02,
          loop: true,
          interval: 3000, //ms
        },
        location: {
          x: 0.78,
          y: 0.82,
        },
        width: 277 * 0.8,
        height: 339 * 0.8,
        collisionHeight: 0, // not yet used
        interactionRange: 50,
        onInteraction: (app) => () => {
          if (gameState.hasCompletedGame) {
            openPopup(app, "congraz! arcade machine is now on", null);
          } else {
            console.log("please complete the game");
            openPopup(app, "This item cannot be used yet", null);
          }
        },
        zIndex: 0,
      },

      {
        image: mouseholeImage,
        type: ITEM_TYPES.item,
        name: "Mousehole",
        animation: {
          frames: [mouseholeImage, mouseholeImageEyes],
          animationSpeed: 0.02,
          loop: true,
          interval: 3000, //ms
        },
        location: {
          x: 0.88,
          y: 0.83,
        },
        width: 50,
        height: 50,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          if (!Player.isMiniSize) {
            openPopup(app, "on kyl pieni hiirenkolo...", null);
            return;
          }

          switchScene(app, "mouseholeScene");
        },
        zIndex: 0,
      },
      {
        image: lamp1Off,

        onStateChange: (app, item) => {
          if (gameState.hasCompletedGame) {
            updateSpriteTexture(item, lamp1On);
          }
        },

        type: ITEM_TYPES.item,
        name: "Lamp",
        animation: null,
        location: {
          x: 0.708,
          y: 0.368,
        },
        width: 104 * 0.8,
        height: 197 * 0.8,
        collisionHeight: 0, // not yet used
        onInteraction: null,
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
        type: ITEM_TYPES.item,
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
        type: ITEM_TYPES.book,
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
            "https://raw.githubusercontent.com/wiki/sepeliry/YhdistyksenToiminta/Peli%E2%80%93idea-:-Honesty.md",
            "https://github.com/sepeliry/YhdistyksenToiminta/wiki/Peli%E2%80%93idea-%3A-Honesty"
          ),

        zIndex: 1,
      },
      {
        image: book1,
        type: ITEM_TYPES.book,
        name: "Säännöt",
        location: {
          x: 0.44,
          y: 0.36,
        },
        width: 37,
        height: 85,
        collisionHeight: 5, // not yet used
        onInteraction: (app) => () =>
          displayWikiPage(
            "https://raw.githubusercontent.com/wiki/sepeliry/YhdistyksenToiminta/Yhdistyksen-s%C3%A4%C3%A4nn%C3%B6t.md",
            "https://github.com/sepeliry/YhdistyksenToiminta/wiki/Yhdistyksen-s%C3%A4%C3%A4nn%C3%B6t"
          ),

        zIndex: 1,
      },
      {
        image: book2,
        type: ITEM_TYPES.book,
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
        type: ITEM_TYPES.book,
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
            "https://raw.githubusercontent.com/wiki/sepeliry/YhdistyksenToiminta/Vuosikertomukset.md",
            "https://github.com/sepeliry/YhdistyksenToiminta/wiki/Vuosikertomukset"
          ),
        zIndex: 1,
      },
      {
        image: book2,
        type: ITEM_TYPES.book,
        name: "Pelit",
        location: {
          x: 0.54,
          y: 0.5,
        },
        width: 37,
        height: 85,
        collisionHeight: 5, // not yet used
        onInteraction: (app) => () =>
          displayWikiPage(
            "https://raw.githubusercontent.com/wiki/sepeliry/YhdistyksenToiminta/Peli‐ideakilpailu-syksyllä-2014.md",
            "https://github.com/sepeliry/YhdistyksenToiminta/wiki/Peli%E2%80%90ideakilpailu-syksyll%C3%A4-2014"
          ),
        zIndex: 1,
      },
      {
        image: book2,
        type: ITEM_TYPES.book,
        name: "Luento",
        location: {
          x: 0.49,
          y: 0.64,
        },
        width: 37,
        height: 85,
        collisionHeight: 5, // not yet used
        onInteraction: (app) => () =>
          displayWikiPage(
            "https://raw.githubusercontent.com/wiki/sepeliry/YhdistyksenToiminta/Luentomuistiinpanot.md",
            "https://github.com/sepeliry/YhdistyksenToiminta/wiki/Luentomuistiinpanot"
          ),
        zIndex: 1,
      },
      {
        image: book1,
        type: ITEM_TYPES.book,
        name: "",
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
        type: ITEM_TYPES.item,
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
        type: ITEM_TYPES.text,
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
        type: ITEM_TYPES.item,
        name: "button for 1",
        location: {
          x: 0.42,
          y: 0.475,
        },
        width: 108.5,
        height: 99.2,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          Numpad.inputCode(1);
        },
        zIndex: 10,
      },
      {
        image: button2,
        type: ITEM_TYPES.item,
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
        type: ITEM_TYPES.item,
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
        type: ITEM_TYPES.item,
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
        type: ITEM_TYPES.item,
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
        type: ITEM_TYPES.item,
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
        type: ITEM_TYPES.item,
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
        type: ITEM_TYPES.item,
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
        type: ITEM_TYPES.item,
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
        type: ITEM_TYPES.item,
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
        type: ITEM_TYPES.item,
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
        type: ITEM_TYPES.item,
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
        type: ITEM_TYPES.item,
        name: "Back button",
        location: {
          x: 0.1,
          y: 0.2,
        },
        width: 164,
        height: 101,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          switchScene(app, "mainScene");
          Player.maximizePlayer();
          gameState.playerIsMiniSize = false;
        },
        zIndex: 10,
      },
    ],
  },
  computerScene: {
    background: computerSceneBackground, // TODO: add computerSceneBackground
    backgroundWidth: 1400,
    backgroundHeight: 800,
    items: [
      {
        image: backArrowImage,
        type: ITEM_TYPES.item,
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
        image: discordIcon,
        type: ITEM_TYPES.desktopIcon,
        title: "Sepeli Discord",
        name: "Sepeli's Discord server",
        location: {
          x: 0.475,
          y: 0.49,
        },
        width: 64,
        height: 64,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () =>
          openUrlInNewTab("https://discord.gg/n8Kx8Qm"),
        zIndex: 1,
      },
      {
        image: signupIcon,
        type: ITEM_TYPES.desktopIcon,
        title: "Join Sepeli",
        name: "Join Sepeli as a member",
        location: {
          x: 0.545,
          y: 0.49,
        },
        width: 64,
        height: 64,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () =>
          openUrlInNewTab("https://goo.gl/forms/E6MraZeXRUn5DE1E3"),
        zIndex: 1,
      },
      {
        image: coffeeCupImage,
        onStateChange: null,
        type: ITEM_TYPES.item,
        name: "Coffee cup",
        location: {
          x: 0.33,
          y: 0.73,
        },
        width: 100,
        height: 100,
        collisionHeight: 5, // not yet used
        onInteraction: (app, item) => () => {
          gameState.inventory.addItem("Coffee cup", item);
          removeSprite(app, item);
        },
        zIndex: 2,
      },
    ],
  },
};

export default gameData;
