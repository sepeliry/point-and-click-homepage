/*
 * CLASSES
 */
import Player from "../logic/player.js";
import Numpad from "../logic/numpad.js";

/*
 * INTERACTIONS
 */
import updateSpriteTexture from "../logic/interactions/updateSpriteTexture.js";
import updateAnimatedSpriteTextures from "../logic/interactions/updateAnimatedSpriteTextures.js";
import removeSprite from "../logic/interactions/removeSprite.js";
import checkDistance from "../logic/interactions/distanceCheckUtils.js";
import openPopup from "../logic/interactions/openPopup.js";
import switchScene from "../logic/interactions/switchScene.js";
import openUrlInNewTab from "../logic/interactions/openUrlInNewTab.js";
import displayWikiPage from "../logic/interactions/displayWikiPage.js";
import displayArticleImg from "../logic/interactions/displayArticleImg.js";

/*
 * UTILS
 */
import { showWikiList } from "../logic/utils/markdownUtils.js";
import showPdf from "../logic/utils/pdfUtils.js";
import gameState from "./gameState.js";

/*
 * CONSTANTS
 */
import ITEM_TYPES from "../constants/itemTypes.js";

/*
 * IMAGE IMPORTS
 */

// Main scene images
import box_img from "../resources/images/main_scene/box_prop.png";
import main_scene_bg from "../resources/images/main_scene/background.png";
import bookshelf_img from "../resources/images/main_scene/bookshelf_cropped.png";
import mousehole_img from "../resources/images/main_scene/mousehole_in_wall_tilted_contrasted_s.png";
import mousehole_img_eyes from "../resources/images/main_scene/mousehole_in_wall_tilted_eyes_contrasted_s.png";
import lamp1_on from "../resources/images/main_scene/lamp_1_on.png";
import lamp1_off from "../resources/images/main_scene/lamp_1_off.png";
import sepeli_machine_off from "../resources/images/main_scene/arcade_machine_2_test.png";
import sepeli_machine_1 from "../resources/images/main_scene/arcade_machine_2_on_frame1.png";
import sepeli_machine_2 from "../resources/images/main_scene/arcade_machine_2_on_frame2.png";
import sepeli_machine_3 from "../resources/images/main_scene/arcade_machine_2_on_frame3.png";
import numpad_small_closed from "../resources/images/main_scene/num_pad.png";
import numpad_small_open from "../resources/images/main_scene/num_pad_open.png";
import computer_desk_img from "../resources/images/main_scene/computer_desk_coloured.png";
import computer_desk_with_coffee_img from "../resources/images/main_scene/computer_desk_with_coffee_cup_coloured.png";
import pong_machine_off from "../resources/images/main_scene/arcade_machine_off.png";
import pong_machine_on from "../resources/images/main_scene/arcade_machine_on.png";
import coffee_maker_img from "../resources/images/main_scene/coffee_maker.png";
import coffee_maker_1 from "../resources/images/main_scene/coffee_maker_frame1.png";
import coffee_maker_2 from "../resources/images/main_scene/coffee_maker_frame2.png";
import coffee_maker_3 from "../resources/images/main_scene/coffee_maker_frame3.png";
import plant_img from "../resources/images/main_scene/plant.png";
import coffee_packet_img from "../resources/images/main_scene/coffee_packet_bean.png";
import potion_img from "../resources/images/main_scene/potion.png";
import article_1 from "../resources/images/main_scene/article_1.png";
import article_2 from "../resources/images/main_scene/article_2.png";
import article_3 from "../resources/images/main_scene/article_3.png";

// Arcade scene images
import arcade_scene_bg from "../resources/images/arcade_scene/background.png";
import telegraph_icon from "../resources/images/arcade_scene/telegraph_icon_upscaled.png";
import on_time_icon from "../resources/images/arcade_scene/ontime_icon_upscaled.png";

// Computer scene images
import computer_scene_bg from "../resources/images/computer_scene/computer_scene_coloured.jpg";
import discord_icon from "../resources/images/computer_scene/discord_icon.png";
import signup_icon from "../resources/images/computer_scene/signup_icon.png";
import coffee_cup from "../resources/images/computer_scene/coffee_cup.png";

// Mousehole scene images
import mousehole_scene_bg_1 from "../resources/images/mousehole_scene/mousehole1.png";
import mousehole_scene_bg_2 from "../resources/images/mousehole_scene/mousehole2.png";
import postit_2_img from "../resources/images/mousehole_scene/postitwithcode2.png";

// Generic
import backarrow_img from "../resources/images/back_arrow.png";

// Bookshelf scene images
import bookshelf_scene_bg from "../resources/images/bookshelf_scene/bookshelf_background.png";
import book_1_img from "../resources/images/bookshelf_scene/book_placeholder.png";
import book_2_img from "../resources/images/bookshelf_scene/book2_placeholder.png";

// Numpad scene images
import numpad_scene_bg_closed from "../resources/images/numpad_scene/numpad_backgroundclosed.png";
import numpad_scene_bg_open from "../resources/images/numpad_scene/numpad_backgroundopen.png";
import numpad_scene_bg from "../resources/images/numpad_scene/numpad_background.png";
import red_button_img from "../resources/images/numpad_scene/red_button.png";
import postit_1_img from "../resources/images//numpad_scene/postitwithcode1.png";
import black_bg from "../resources/images/numpad_scene/black.png";
import button_1 from "../resources/images/numpad_scene/button1.png";
import button_2 from "../resources/images/numpad_scene/button2.png";
import button_3 from "../resources/images/numpad_scene/button3.png";
import button_4 from "../resources/images/numpad_scene/button4.png";
import button_5 from "../resources/images/numpad_scene/button5.png";
import button_6 from "../resources/images/numpad_scene/button6.png";
import button_7 from "../resources/images/numpad_scene/button7.png";
import button_8 from "../resources/images/numpad_scene/button8.png";
import button_9 from "../resources/images/numpad_scene/button9.png";
import button_0 from "../resources/images/numpad_scene/button0.png";
import reset_button from "../resources/images/numpad_scene/resetButton.png";
import enter_button from "../resources/images/numpad_scene/enterButton.png";

//Article images
import article_img_1 from "../resources/images/article_images/article_1.png";
import article_img_2 from "../resources/images/article_images/article_2.png";
import article_img_3 from "../resources/images/article_images/article_3.png";

const gameData = {
  mainScene: {
    background: main_scene_bg,
    backgroundWidth: 1400,
    backgroundHeight: 800,
    items: [
      {
        visible: true,
        animation: {
          frames: [sepeli_machine_off],
          animationSpeed: 0.06,
          loop: false,
          interval: 3000, //ms
        },
        onStateChange: (app, item) => {
          if (gameState.hasCompletedGame) {
            updateAnimatedSpriteTextures(
              item,
              [sepeli_machine_1, sepeli_machine_2, sepeli_machine_3],
              0.06,
              true
            );
          }
        },
        type: ITEM_TYPES.item,
        name: "Arcade machine 2",
        location: {
          x: 0.45,
          y: 0.71,
        },
        width: 437 * 0.27,
        height: 897 * 0.27,
        collisionHeight: 0, // not yet used
        interactionRange: 50,
        onInteraction: (app, item) => () =>
          checkDistance(
            app,
            item.position.x,
            item.position.y,
            "mainScene",
            () => {
              if (gameState.hasCompletedGame) {
                switchScene(app, "arcadeScene");
              } else {
                console.log("please complete the game");
                openPopup(
                  app,
                  "Hmm, tämä ei näytä toimivan. Tuleekohan siihen virtaa..?",
                  null
                );
              }
            }
          ),

        zIndex: 0,
      },
      {
        visible: true,
        image: numpad_small_closed,
        onStateChange: (app, item) => {
          if (gameState.hasUnlockedDoor) {
            updateSpriteTexture(item, numpad_small_open);
          }
        },
        animation: null,
        type: ITEM_TYPES.item,
        name: "Lock",
        location: {
          x: 0.568,
          y: 0.59,
        },
        width: 1527 / 12,
        height: 986 / 12,
        collisionHeight: 5, // not yet used
        maxDistance: 250,
        onInteraction: (app, item) => () =>
          checkDistance(
            app,
            item.position.x,
            item.position.y,
            "numpadScene",
            () => switchScene(app, "numpadScene")
          ),
        zIndex: 0,
      },
      {
        visible: true,
        image: coffee_packet_img,
        onStateChange: null,
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
        onInteraction: (app, item) => () =>
          checkDistance(
            app,
            item.position.x,
            item.position.y,
            "mainScene",
            () => {
              openPopup(app, "Löysin kahvia! ... lattialta?", null);

              gameState.inventory.addItem("Coffee", item);
              removeSprite(app, item);
            }
          ),

        zIndex: 2,
        draggable: true,
        dragTargetName: "Coffee maker",
        onDragSuccess: (app, item) => {
          if (gameState.inventory.itemExists("Coffee cup")) {
            openPopup(app, "Nyt tulee tujut kahvit!");
          } else {
            openPopup(
              app,
              "Tuleepas tujut kahvit, mutta kuppi puuttuu...",
              null
            );
          }
        },
      },
      {
        visible: true,
        image: article_1,
        onStateChange: null,
        animation: null,
        type: ITEM_TYPES.item,
        name: "Article_1",
        location: {
          x: 0.866,
          y: 0.51,
        },
        width: 114 * 0.43,
        height: 216 * 0.43,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => displayArticleImg(article_img_1),
        zIndex: 1,
      },
      {
        visible: true,
        image: article_2,
        onStateChange: null,
        animation: null,
        type: ITEM_TYPES.item,
        name: "Article_2",
        location: {
          x: 0.711,
          y: 0.479,
        },
        width: 162 * 0.43,
        height: 149 * 0.43,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => displayArticleImg(article_img_2),
        zIndex: 1,
      },
      {
        visible: true,
        image: article_3,
        onStateChange: null,
        animation: null,
        type: ITEM_TYPES.item,
        name: "Article_3",
        location: {
          x: 0.802,
          y: 0.46,
        },
        width: 248 * 0.42,
        height: 153 * 0.42,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => displayArticleImg(article_img_3),
        zIndex: 1,
      },
      {
        visible: true,
        type: ITEM_TYPES.item,
        name: "Coffee maker",
        animation: {
          frames: [coffee_maker_1, coffee_maker_2, coffee_maker_3],
          animationSpeed: 0.04,
          loop: true,
          interval: 3000, //ms
        },
        onStateChange: null,
        location: {
          x: 0.67,
          y: 0.595,
        },
        width: 267 * 0.25,
        height: 400 * 0.25,
        collisionHeight: 0, // not yet used
        onInteraction: (app, item) => () =>
          checkDistance(
            app,
            item.position.x,
            item.position.y,
            "mainScene",
            () => {
              if (!gameState.inventory.itemExists("Coffee")) {
                openPopup(
                  app,
                  "Hmm, missä täällä säilytetään kahvinpuruja?",
                  null
                );
                return;
              } else if (!gameState.inventory.itemExists("Coffee cup")) {
                openPopup(
                  app,
                  "Kahvinpurut check, mutta tarviin vielä kahvikupin!",
                  null
                );
                return;
              }

              // remove coffee from inventory
              gameState.inventory.removeItem("Coffee");
              gameState.inventory.removeItem("Coffee cup");
              Player.minimizePlayer();
              openPopup(app, "Mitä tapahtuu??", null, () => {
                openPopup(
                  app,
                  "Mähän oon ihan snadi nyt. Ja kahvi pärisee!",
                  null
                );
              });
            }
          ),
        zIndex: 0,
      },

      {
        visible: true,
        image: computer_desk_with_coffee_img,
        type: ITEM_TYPES.item,
        onStateChange: (app, item) => {
          if (gameState.inventory.itemExists("Coffee cup")) {
            updateSpriteTexture(item, computer_desk_img);
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
        onInteraction: (app, item) => () =>
          checkDistance(
            app,
            item.position.x,
            item.position.y,
            "computerScene",
            () => switchScene(app, "computerScene")
          ),
        zIndex: 2,
      },
      {
        visible: true,
        image: bookshelf_img,
        type: ITEM_TYPES.item,
        name: "Bookshelf",
        location: {
          x: 0.325,
          y: 0.708,
        },
        width: 191 * 1.2,
        height: 292 * 1.2,
        collisionHeight: 0, // not yet used
        onInteraction: (app, item) => () =>
          checkDistance(
            app,
            item.position.x,
            item.position.x,
            "bookshelfScene",
            () => switchScene(app, "bookshelfScene")
          ),
        zIndex: 0,
      },
      {
        visible: true,
        image: pong_machine_off,
        type: ITEM_TYPES.item,
        name: "Arcade machine",

        onStateChange: (app, item) => {
          if (gameState.hasCompletedGame) {
            updateAnimatedSpriteTextures(
              item,
              [pong_machine_on, pong_machine_off],
              0.02,
              true
            );
          }
        },

        animation: {
          frames: [pong_machine_off],
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
        onInteraction: (app, item) => () => {
          if (gameState.hasCompletedGame) {
            checkDistance(
              app,
              item.position.x,
              item.position.y,
              "mainScene",
              () =>
                openPopup(
                  app,
                  "Onneksi olkoon, arcade-kone on nyt päällä!",
                  null
                )
            );
          } else {
            console.log("please complete the game");
            checkDistance(
              app,
              item.position.x,
              item.position.y,
              "mainScene",
              () =>
                openPopup(
                  app,
                  "Tää ei mene päälle? Miksi täällä on vain rikkinäisiä koneita :/",
                  null
                )
            );
          }
        },
        zIndex: 0,
      },

      {
        visible: true,
        image: mousehole_img,
        type: ITEM_TYPES.item,
        name: "Mousehole",
        animation: {
          frames: [mousehole_img, mousehole_img_eyes],
          animationSpeed: 0.02,
          loop: true,
          interval: 3000, //ms
          zIndex: 0,
        },
        location: {
          x: 0.875,
          y: 0.832,
        },
        width: 44,
        height: 65,
        collisionHeight: 0, // not yet used
        onInteraction: (app, item) => () =>
          checkDistance(
            app,
            item.position.x,
            item.position.y,
            "mainScene",
            () => {
              if (!gameState.playerIsMiniSize) {
                openPopup(app, "on kyl pieni hiirenkolo...", null);
                return;
              }
              switchScene(app, "mouseholeScene");
            }
          ),

        zIndex: 0,
      },
      {
        image: lamp1_off,
        visible: true,
        onStateChange: (app, item) => {
          if (gameState.hasCompletedGame) {
            updateSpriteTexture(item, lamp1_on);
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
    background: bookshelf_scene_bg,
    backgroundWidth: 1400,
    backgroundHeight: 800,
    items: [
      {
        image: backarrow_img,
        visible: true,
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
        image: book_1_img,
        visible: true,
        type: ITEM_TYPES.book,
        name: "Honesty",
        location: {
          x: 0.52,
          y: 0.35,
        },
        width: 37,
        height: 100,
        collisionHeight: 5, // not yet used
        onInteraction: (app) => () =>
          displayWikiPage(
            "https://raw.githubusercontent.com/wiki/sepeliry/YhdistyksenToiminta/Peli%E2%80%93idea-:-Honesty.md",
            "https://github.com/sepeliry/YhdistyksenToiminta/wiki/Peli%E2%80%93idea-%3A-Honesty"
          ),

        zIndex: 1,
      },
      {
        image: book_1_img,
        visible: true,
        type: ITEM_TYPES.book,
        name: "Säännöt",
        location: {
          x: 0.44,
          y: 0.35,
        },
        width: 37,
        height: 100,
        collisionHeight: 5, // not yet used
        onInteraction: (app) => () =>
          displayWikiPage(
            "https://raw.githubusercontent.com/wiki/sepeliry/YhdistyksenToiminta/Yhdistyksen-s%C3%A4%C3%A4nn%C3%B6t.md",
            "https://github.com/sepeliry/YhdistyksenToiminta/wiki/Yhdistyksen-s%C3%A4%C3%A4nn%C3%B6t"
          ),

        zIndex: 1,
      },
      {
        image: book_2_img,
        visible: true,
        type: ITEM_TYPES.book,
        name: "Wiki",
        location: {
          x: 0.44,
          y: 0.21,
        },
        width: 37,
        height: 100,
        collisionHeight: 5, // not yet used
        onInteraction: (app) => () =>
          openUrlInNewTab(
            "https://github.com/sepeliry/YhdistyksenToiminta/wiki"
          ),
        zIndex: 1,
      },
      {
        image: book_2_img,
        visible: true,
        type: ITEM_TYPES.book,
        name: "Vuodet",
        location: {
          x: 0.44,
          y: 0.485,
        },
        width: 37,
        height: 100,
        collisionHeight: 5, // not yet used
        onInteraction: (app) => () =>
          displayWikiPage(
            "https://raw.githubusercontent.com/wiki/sepeliry/YhdistyksenToiminta/Vuosikertomukset.md",
            "https://github.com/sepeliry/YhdistyksenToiminta/wiki/Vuosikertomukset"
          ),
        zIndex: 1,
      },
      {
        image: book_2_img,
        visible: true,
        type: ITEM_TYPES.book,
        name: "Pelit",
        location: {
          x: 0.54,
          y: 0.485,
        },
        width: 37,
        height: 100,
        collisionHeight: 5, // not yet used
        onInteraction: (app) => () =>
          displayWikiPage(
            "https://raw.githubusercontent.com/wiki/sepeliry/YhdistyksenToiminta/Peli‐ideakilpailu-syksyllä-2014.md",
            "https://github.com/sepeliry/YhdistyksenToiminta/wiki/Peli%E2%80%90ideakilpailu-syksyll%C3%A4-2014"
          ),
        zIndex: 1,
      },
      {
        image: book_2_img,
        visible: true,
        type: ITEM_TYPES.book,
        name: "Luento",
        location: {
          x: 0.49,
          y: 0.62,
        },
        width: 37,
        height: 100,
        collisionHeight: 5, // not yet used
        onInteraction: (app) => () =>
          displayWikiPage(
            "https://raw.githubusercontent.com/wiki/sepeliry/YhdistyksenToiminta/Luentomuistiinpanot.md",
            "https://github.com/sepeliry/YhdistyksenToiminta/wiki/Luentomuistiinpanot"
          ),
        zIndex: 1,
      },
      {
        image: book_1_img,
        visible: true,
        type: ITEM_TYPES.book,
        name: "PDF",
        location: {
          x: 0.58,
          y: 0.62,
        },
        width: 37,
        height: 100,
        collisionHeight: 5, // not yet used
        onInteraction: (app) => () =>
          showPdf(
            app,
            app.scenes["mainScene"],
            "./docs/input/pelienSuunnittelu.pdf"
          ),
        zIndex: 1,
      },
    ],
  },
  numpadScene: {
    background: numpad_scene_bg_closed,
    backgroundWidth: 1796,
    backgroundHeight: 1024,
    onStateChange: (app, item) => {
      if (gameState.hasUnlockedDoor) {
        updateSpriteTexture(item, numpad_scene_bg_open);
      }
    },
    items: [
      {
        image: backarrow_img,
        visible: true,
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
        image: postit_1_img,
        visible: true,
        onStateChange: (app, item) => {
          if (gameState.hasUnlockedDoor) {
            removeSprite(app, item);
          }
        },
        type: ITEM_TYPES.item,
        name: "PostIt 1",
        location: {
          x: 0.5,
          y: 0.22,
        },
        width: 128,
        height: 128,
        collisionHeight: 0, // not yet used
        onInteraction: (app, item) => () => {
          if (gameState.inventory.itemExists("PostIt 2")) {
            openPopup(app, "Täähän sopii tuohon toiseen palaseen!", null);
          } else {
            openPopup(
              app,
              "Mitä ihmettä? Niinku tästä puuttuis palanen.",
              null
            );
          }
        },
        zIndex: 10,
      },
      /*
      {
        image: numpad_scene_bg_closed,
        visible: true,
        onStateChange: (app, item) => {
          if (gameState.hasUnlockedDoor) {
            updateSpriteTexture(item, numpad_scene_bg_open);
          }
        },
        type: ITEM_TYPES.item,
        name: "closed box",
        location: {
          x: 0.5,
          y: 1,
        },
        width: 1792,
        height: 1024,
        collisionHeight: 0, // not yet used
        onInteraction: null,
        zIndex: 0,
      },
*/
      {
        image: red_button_img,
        visible: false,
        onStateChange: (app, item) => {
          if (gameState.hasUnlockedDoor) {
            item.visible = true;
          }
        },
        type: ITEM_TYPES.item,
        name: "red button",
        location: {
          x: 0.5,
          y: 0.666,
        },
        width: 323,
        height: 319,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          gameState.hasCompletedGame = true;
          switchScene(app, "mainScene");
          openPopup(app, "Oho, arcade-koneet meni päälle!", null);
        },
        zIndex: 0,
      },
      {
        type: ITEM_TYPES.text,
        visible: true,
        onStateChange: (app, item) => {
          if (gameState.hasUnlockedDoor) {
            item.visible = false;
          }
        },
        text: "",
        identifier: "screenText",
        style: {
          breakWords: true,
          dropShadow: true,
          dropShadowAlpha: 0.1,
          dropShadowAngle: 0.6,
          dropShadowDistance: 3,
          fill: "#fff0ff",
          fontFamily: "VCR_OSD_MONO",
          fontSize: 40,
          align: "center",
          fontWeight: "bold",
          stroke: "#edceeb",
          //  strokeThickness: 1,
          wordWrap: false,
          wordWrapWidth: 600,
        },
        location: {
          x: 0.5,
          y: 0.295,
        },
        zIndex: 12,
        onInteraction: null,
      },
      {
        image: button_1,
        visible: true,
        onStateChange: (app, item) => {
          // remove this item if the user has unlocked the door
          if (gameState.hasUnlockedDoor) {
            removeSprite(app, item);
          }
        },
        type: ITEM_TYPES.item,
        name: "button for 1",
        location: {
          x: 0.445,
          y: 0.48,
        },
        width: 70,
        height: 66,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          Numpad.inputCode(1);
        },
        zIndex: 10,
      },
      {
        image: button_2,
        visible: true,
        onStateChange: (app, item) => {
          // remove this item if the user has unlocked the door
          if (gameState.hasUnlockedDoor) {
            removeSprite(app, item);
          }
        },
        type: ITEM_TYPES.item,
        name: "button for 2",
        location: {
          x: 0.5,
          y: 0.48,
        },
        width: 70,
        height: 66,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          //console.log(app.scenes["numpadScene"].children);
          Numpad.inputCode(2);
        },
        zIndex: 10,
      },
      {
        image: button_3,
        visible: true,
        onStateChange: (app, item) => {
          // remove this item if the user has unlocked the door
          if (gameState.hasUnlockedDoor) {
            removeSprite(app, item);
          }
        },
        type: ITEM_TYPES.item,
        name: "button for 3",
        location: {
          x: 0.555,
          y: 0.48,
        },
        width: 70,
        height: 66,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          //console.log(app.scenes["numpadScene"].children);
          Numpad.inputCode(3);
        },
        zIndex: 10,
      },
      {
        image: button_4,
        visible: true,
        onStateChange: (app, item) => {
          // remove this item if the user has unlocked the door
          if (gameState.hasUnlockedDoor) {
            removeSprite(app, item);
          }
        },
        type: ITEM_TYPES.item,
        name: "button for 4",
        location: {
          x: 0.445,
          y: 0.57,
        },
        width: 70,
        height: 66,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          //console.log(app.scenes["numpadScene"].children);
          Numpad.inputCode(4);
        },
        zIndex: 10,
      },
      {
        image: button_5,
        visible: true,
        onStateChange: (app, item) => {
          // remove this item if the user has unlocked the door
          if (gameState.hasUnlockedDoor) {
            removeSprite(app, item);
          }
        },
        type: ITEM_TYPES.item,
        name: "button for 5",
        location: {
          x: 0.5,
          y: 0.57,
        },
        width: 70,
        height: 66,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          //console.log(app.scenes["numpadScene"].children);
          Numpad.inputCode(5);
        },
        zIndex: 10,
      },
      {
        image: button_6,
        visible: true,
        onStateChange: (app, item) => {
          // remove this item if the user has unlocked the door
          if (gameState.hasUnlockedDoor) {
            removeSprite(app, item);
          }
        },
        type: ITEM_TYPES.item,
        name: "button for 6",
        location: {
          x: 0.555,
          y: 0.57,
        },
        width: 70,
        height: 66,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          //console.log(app.scenes["numpadScene"].children);
          Numpad.inputCode(6);
        },
        zIndex: 10,
      },
      {
        image: button_7,
        visible: true,
        onStateChange: (app, item) => {
          // remove this item if the user has unlocked the door
          if (gameState.hasUnlockedDoor) {
            removeSprite(app, item);
          }
        },
        type: ITEM_TYPES.item,
        name: "button for 7",
        location: {
          x: 0.445,
          y: 0.66,
        },
        width: 70,
        height: 66,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          //console.log(app.scenes["numpadScene"].children);
          Numpad.inputCode(7);
        },
        zIndex: 10,
      },
      {
        image: button_8,
        visible: true,
        onStateChange: (app, item) => {
          // remove this item if the user has unlocked the door
          if (gameState.hasUnlockedDoor) {
            removeSprite(app, item);
          }
        },
        type: ITEM_TYPES.item,
        name: "button for 8",
        location: {
          x: 0.5,
          y: 0.66,
        },
        width: 70,
        height: 66,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          //console.log(app.scenes["numpadScene"].children);
          Numpad.inputCode(8);
        },
        zIndex: 10,
      },
      {
        image: button_9,
        visible: true,
        onStateChange: (app, item) => {
          // remove this item if the user has unlocked the door
          if (gameState.hasUnlockedDoor) {
            removeSprite(app, item);
          }
        },
        type: ITEM_TYPES.item,
        name: "button for 9",
        location: {
          x: 0.555,
          y: 0.66,
        },
        width: 70,
        height: 66,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          //console.log(app.scenes["numpadScene"].children);
          Numpad.inputCode(9);
        },
        zIndex: 10,
      },
      {
        image: reset_button,
        visible: true,
        onStateChange: (app, item) => {
          // remove this item if the user has unlocked the door
          if (gameState.hasUnlockedDoor) {
            removeSprite(app, item);
          }
        },
        type: ITEM_TYPES.item,
        name: "reset",
        location: {
          x: 0.445,
          y: 0.74,
        },
        width: 70,
        height: 60,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          Numpad.resetCode();
        },
        zIndex: 10,
      },
      {
        image: button_0,
        visible: true,
        onStateChange: (app, item) => {
          // remove this item if the user has unlocked the door
          if (gameState.hasUnlockedDoor) {
            removeSprite(app, item);
          }
        },
        type: ITEM_TYPES.item,
        name: "button for 0",
        location: {
          x: 0.5,
          y: 0.74,
        },
        width: 70,
        height: 60,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          Numpad.inputCode(0);
        },
        zIndex: 10,
      },
      {
        image: enter_button,
        visible: true,
        onStateChange: (app, item) => {
          // remove this item if the user has unlocked the door
          if (gameState.hasUnlockedDoor) {
            removeSprite(app, item);
            if (gameState.inventory.itemExists("PostIt 2")) {
              gameState.inventory.removeItem("PostIt 2");
            }
          }
        },
        type: ITEM_TYPES.item,
        name: "enter",
        location: {
          x: 0.555,
          y: 0.74,
        },
        width: 70,
        height: 60,
        collisionHeight: 0, // not yet used
        onInteraction: (app) => () => {
          Numpad.enterCode();
        },
        zIndex: 10,
      },
    ],
  },
  mouseholeScene: {
    background: mousehole_scene_bg_1,
    backgroundWidth: 1400,
    backgroundHeight: 800,
    animatedSpriteTextures: [mousehole_scene_bg_1, mousehole_scene_bg_2],
    items: [
      {
        image: backarrow_img,
        visible: true,
        type: ITEM_TYPES.item,
        onStateChange: null,
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

          if (gameState.inventory.itemExists("PostIt 2")) {
            Player.maximizePlayer();
          }
        },
        zIndex: 10,
      },
      {
        image: postit_2_img,
        visible: true,
        type: ITEM_TYPES.item,
        name: "PostIt 2",
        location: {
          x: 0.5,
          y: 0.84,
        },
        width: 96,
        height: 96,
        collisionHeight: 0, // not yet used
        onInteraction: (app, item) => () => {
          gameState.inventory.addItem("PostIt 2", item);
          removeSprite(app, item);
          openPopup(app, "16...?", null);
        },
        zIndex: 10,
      },
    ],
  },
  computerScene: {
    background: computer_scene_bg, // TODO: add computerSceneBackground
    backgroundWidth: 1400,
    backgroundHeight: 800,
    items: [
      {
        image: backarrow_img,
        visible: true,
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
        image: discord_icon,
        visible: true,
        type: ITEM_TYPES.desktopIcon,
        title: "Sepelin Discord",
        name: "Sepelin Discord-kanava",
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
        image: signup_icon,
        visible: true,
        type: ITEM_TYPES.desktopIcon,
        title: "Liity Sepeliin",
        name: "Liity Sepelin jäseneksi",
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
        image: coffee_cup,
        visible: true,
        onStateChange: null,
        type: ITEM_TYPES.item,
        name: "Coffee cup",
        location: {
          x: 0.32,
          y: 0.73,
        },
        width: 100,
        height: 100,
        collisionHeight: 5, // not yet used
        onInteraction: (app, item) => () => {
          gameState.inventory.addItem("Coffee cup", item);
          removeSprite(app, item);
          openPopup(
            app,
            "A-ha! Löysin kahvikupin! Tuskin haittaa jos lainaan sitä...",
            null
          );
        },
        zIndex: 2,
        draggable: true,
        dragTargetName: "Coffee maker",
        onDragSuccess: (app, item) => {
          if (gameState.inventory.itemExists("Coffee")) {
            openPopup(app, "Santsikuppia, kiitos!");
          } else {
            openPopup(app, "Kuppi löytyy, mutta kaffea tarvis!.", null);
          }
        },
      },
    ],
  },
  arcadeScene: {
    background: arcade_scene_bg,
    backgroundWidth: 1400,
    backgroundHeight: 800,
    items: [
      {
        image: backarrow_img,
        visible: true,
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
          if (gameState.inventory.itemExists("PostIt 2")) {
            Player.maximizePlayer();
          }
        },
        zIndex: 10,
      },

      {
        type: ITEM_TYPES.text,
        visible: true,
        onInteraction: (app) => () =>
          openUrlInNewTab("https://exigo.itch.io/telegraph-operator"),
        text: "Telegraph",
        identifier: "telegraphGameText",
        style: {
          breakWords: true,
          dropShadow: true,
          dropShadowAlpha: 0.1,
          dropShadowAngle: 0.6,
          dropShadowDistance: 3,
          fill: "#fff0ff",
          fontFamily: "VCR_OSD_MONO",
          fontSize: 40,
          align: "center",
          fontWeight: "bold",
          stroke: "#edceeb",
          // strokeThickness: 1,
          wordWrap: false,
          wordWrapWidth: 600,
        },
        location: {
          x: 0.5,
          y: 0.4,
        },
        zIndex: 12,
      },
      {
        type: ITEM_TYPES.text,
        visible: true,
        onInteraction: (app) => () =>
          openUrlInNewTab("https://exigo.itch.io/vorax"),
        text: "Vorax",
        identifier: "voraxGameText",
        style: {
          breakWords: true,
          dropShadow: true,
          dropShadowAlpha: 0.1,
          dropShadowAngle: 0.6,
          dropShadowDistance: 3,
          fill: "#fff0ff",
          fontFamily: "VCR_OSD_MONO",
          fontSize: 40,
          align: "center",
          fontWeight: "bold",
          stroke: "#edceeb",
          //    strokeThickness: 1,
          wordWrap: false,
          wordWrapWidth: 600,
        },
        location: {
          x: 0.5,
          y: 0.5,
        },
        zIndex: 12,
      },
      {
        type: ITEM_TYPES.text,
        visible: true,
        onInteraction: (app) => () =>
          openUrlInNewTab("https://serialkamikaze.itch.io/on-time"),
        text: "On Time",
        identifier: "onTimeGameText",
        style: {
          breakWords: true,
          dropShadow: true,
          dropShadowAlpha: 0.1,
          dropShadowAngle: 0.6,
          dropShadowDistance: 3,
          fill: "#fff0ff",
          fontFamily: "VCR_OSD_MONO",
          fontSize: 40,
          align: "center",
          fontWeight: "bold",
          stroke: "#edceeb",
          //     strokeThickness: 1,
          wordWrap: false,
          wordWrapWidth: 600,
        },
        location: {
          x: 0.5,
          y: 0.6,
        },
        zIndex: 12,
      },
    ],
  },
};

export default gameData;
