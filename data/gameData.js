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
import main_scene_bg from "../resources/images/main_scene/main_scene_bg.png";
import bookshelf from "../resources/images/main_scene/bookshelf.png";
import mousehole_frame01 from "../resources/images/main_scene/mousehole_frame01.png";
import mousehole_frame02 from "../resources/images/main_scene/mousehole_frame02.png";
import lamp_1_on from "../resources/images/main_scene/lamp_1_on.png";
import lamp_1_off from "../resources/images/main_scene/lamp_1_off.png";
import sepeli_machine_off from "../resources/images/main_scene/sepeli_machine_off.png";
import sepeli_machine_frame01 from "../resources/images/main_scene/sepeli_machine_frame01.png";
import sepeli_machine_frame02 from "../resources/images/main_scene/sepeli_machine_frame02.png";
import sepeli_machine_frame03 from "../resources/images/main_scene/sepeli_machine_frame03.png";
import numpad_closed from "../resources/images/main_scene/numpad_closed.png";
import numpad_open from "../resources/images/main_scene/numpad_open.png";
import computer_desk from "../resources/images/main_scene/computer_desk.png";
import computer_desk_with_cup from "../resources/images/main_scene/computer_desk_with_cup.png";
import conway_machine_off from "../resources/images/main_scene/conway_machine_off.png";
import pong_machine_on from "../resources/images/main_scene/pong_machine_on.png";
import conway_machine_frame01 from "../resources/images/main_scene/conway_machine_frame01.png";
import conway_machine_frame02 from "../resources/images/main_scene/conway_machine_frame02.png";
import conway_machine_frame03 from "../resources/images/main_scene/conway_machine_frame03.png";
import conway_machine_frame04 from "../resources/images/main_scene/conway_machine_frame04.png";
import conway_machine_frame05 from "../resources/images/main_scene/conway_machine_frame05.png";
import conway_machine_frame06 from "../resources/images/main_scene/conway_machine_frame06.png";
import coffee_maker_empty from "../resources/images/main_scene/coffee_maker_empty.png";
import coffee_maker_frame01 from "../resources/images/main_scene/coffee_maker_frame01.png";
import coffee_maker_frame02 from "../resources/images/main_scene/coffee_maker_frame02.png";
import coffee_maker_frame03 from "../resources/images/main_scene/coffee_maker_frame03.png";
import coffee_packet_bean from "../resources/images/main_scene/coffee_packet_bean.png";
import article_1 from "../resources/images/main_scene/article_1.png";
import article_2 from "../resources/images/main_scene/article_2.png";
import article_3 from "../resources/images/main_scene/article_3.png";

// Arcade scene images
import arcade_scene_bg from "../resources/images/arcade_scene/arcade_scene_bg.jpg";

// Computer scene images
import computer_scene_bg from "../resources/images/computer_scene/computer_scene_coloured.jpg";
import discord_icon from "../resources/images/computer_scene/discord_icon.png";
import signup_icon from "../resources/images/computer_scene/signup_icon.png";
import coffee_cup_empty from "../resources/images/computer_scene/coffee_cup_empty.png";
import coffee_cup_full from "../resources/images/computer_scene/coffee_cup_full.png";

// Mousehole scene images
import postit_16 from "../resources/images/mousehole_scene/postit_16.png";
import mouse_frame01 from "../resources/images/mousehole_scene/mouse_frame01.png";
import mouse_frame02 from "../resources/images/mousehole_scene/mouse_frame02.png";
import mousehole_bg from "../resources/images/mousehole_scene/mousehole_background.png";
import hanging_cheese_frame01 from "../resources/images/mousehole_scene/hanging_cheese_frame01.png";
import hanging_cheese_frame02 from "../resources/images/mousehole_scene/hanging_cheese_frame02.png";

// Generic
import back_arrow from "../resources/images/back_arrow.png";

// Bookshelf scene images
import bookshelf_scene_bg from "../resources/images/bookshelf_scene/bookshelf_background.png";
import book_1_img from "../resources/images/bookshelf_scene/book_placeholder.png";
import book_2_img from "../resources/images/bookshelf_scene/book2_placeholder.png";

// Numpad scene images
import numpad_bg_closed from "../resources/images/numpad_scene/numpad_bg_closed.png";
import numpad_bg_open from "../resources/images/numpad_scene/numpad_bg_open.png";
import red_button from "../resources/images/numpad_scene/red_button.png";
import postit_32 from "../resources/images//numpad_scene/postit_32.png";
import button_1 from "../resources/images/numpad_scene/button_1.png";
import button_2 from "../resources/images/numpad_scene/button_2.png";
import button_3 from "../resources/images/numpad_scene/button_3.png";
import button_4 from "../resources/images/numpad_scene/button_4.png";
import button_5 from "../resources/images/numpad_scene/button_5.png";
import button_6 from "../resources/images/numpad_scene/button_6.png";
import button_7 from "../resources/images/numpad_scene/button_7.png";
import button_8 from "../resources/images/numpad_scene/button_8.png";
import button_9 from "../resources/images/numpad_scene/button_9.png";
import button_0 from "../resources/images/numpad_scene/button_0.png";
import reset_button from "../resources/images/numpad_scene/reset_button.png";
import enter_button from "../resources/images/numpad_scene/enter_button.png";

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
              [sepeli_machine_frame01, sepeli_machine_frame02, sepeli_machine_frame03],
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
        image: numpad_closed,
        onStateChange: (app, item) => {
          if (gameState.hasUnlockedDoor) {
            updateSpriteTexture(item, numpad_open);
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
        image: coffee_packet_bean,
        onStateChange: null,
        animation: null,
        type: ITEM_TYPES.item,
        name: "Coffee",
        location: {
          x: 0.825,
          y: 0.665,
        },
        width: 267 * 0.18,
        height: 400 * 0.18,
        collisionHeight: 0, // not yet used
        onInteraction: (app, item) => () =>
          checkDistance(
            app,
            item.position.x,
            item.position.y,
            "mainScene",
            () => {
              openPopup(app, "Löysin kahvia!", null);

              gameState.inventory.addItem("Coffee", item);
              removeSprite(app, item);
            }
          ),
        zIndex: 2,
        draggable: true,
        dragTargetName: "Coffee maker",
        onDragSuccess: (app, item) => {
          gameState.coffeeBrewed = true;
          if (!gameState.inventory.itemExists("Coffee cup")) {
            openPopup(
              app,
              "Nyt tulee tujut kahvit, mutta tarviin vielä kahvikupin!",
              null
            );
          } else {
            openPopup(app, "Nyt tulee tujut kahvit!");
          }
          gameState.inventory.removeItem("Coffee");
          gameState.coffeeUsed = true;
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
        image: coffee_maker_empty,
        type: ITEM_TYPES.item,
        name: "Coffee maker",
        onStateChange: (app, item) => {
          if (gameState.coffeeBrewed && !gameState.playerIsMiniSize) {
            updateAnimatedSpriteTextures(
              item,
              [
                coffee_maker_frame01,
                coffee_maker_frame02,
                coffee_maker_frame03,
              ],
              0.02,
              true
            );
          }
          if (gameState.playerIsMiniSize) {
            updateAnimatedSpriteTextures(
              item,
              [coffee_maker_empty],
              0.02,
              true
            );
          }
        },
        animation: {
          frames: [coffee_maker_empty],
          animationSpeed: 0.04,
          loop: true,
          interval: 3000, //ms
        },
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
              if (!gameState.coffeeBrewed) {
                if (gameState.coffeeUsed) {
                  openPopup(app, "Join jo kaiken kahvin!", null);
                  return;
                } else if (!gameState.inventory.itemExists("Coffee")) {
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
                } else {
                  openPopup(
                    app,
                    "Kahvinpurut check, kahvikuppi check, mitenköhän saisin kahvipurut koneeseen...",
                    null
                  );
                }
              }
              if (gameState.coffeeBrewed && !gameState.playerIsMiniSize) {
                if (!gameState.inventory.itemExists("Coffee cup")) {
                  openPopup(
                    app,
                    "Kahvi on jo keitetty, mutta tarvitsen kahvikupin!",
                    null
                  );
                  return;
                }
                Player.minimizePlayer();
                openPopup(app, "Mitä tapahtuu??", null, () => {
                  openPopup(
                    app,
                    "Mähän oon ihan snadi nyt. Ja kahvi pärisee!",
                    null
                  );
                  gameState.coffeeBrewed = false;
                });
              }
            }
          ),
        zIndex: 0,
      },

      {
        visible: true,
        image: computer_desk_with_cup,
        type: ITEM_TYPES.item,
        onStateChange: (app, item) => {
          if (gameState.inventory.itemExists("Coffee cup")) {
            updateSpriteTexture(item, computer_desk);
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
        image: bookshelf,
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
        image: conway_machine_off,
        type: ITEM_TYPES.item,
        name: "Arcade machine",

        onStateChange: (app, item) => {
          if (gameState.hasCompletedGame) {
            updateAnimatedSpriteTextures(
              item,
              [conway_machine_frame01,
                conway_machine_frame02,
                conway_machine_frame03,
                conway_machine_frame04,
                conway_machine_frame05,
                conway_machine_frame06],
              0.02,
              true
            );
          }
        },

        animation: {
          frames: [conway_machine_off],
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
        image: mousehole_frame01,
        type: ITEM_TYPES.item,
        name: "Mousehole",
        animation: {
          frames: [mousehole_frame01, mousehole_frame02],
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
                openPopup(
                  app,
                  "Kylläpä pienestä hiirenkolosta pilkottaa pelottavat silmät...",
                  null
                );
                return;
              }
              switchScene(app, "mouseholeScene");
            }
          ),

        zIndex: 0,
      },
      {
        image: lamp_1_off,
        visible: true,
        onStateChange: (app, item) => {
          if (gameState.hasCompletedGame) {
            updateSpriteTexture(item, lamp_1_on);
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
        image: back_arrow,
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
          displayWikiPage(
            "https://raw.githubusercontent.com/wiki/sepeliry/YhdistyksenToiminta/Home.md",
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
    background: numpad_bg_closed,
    backgroundWidth: 1796,
    backgroundHeight: 1024,
    onStateChange: (app, item) => {
      if (gameState.hasUnlockedDoor) {
        updateSpriteTexture(item, numpad_bg_open);
      }
    },
    items: [
      {
        image: back_arrow,
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
        image: postit_32,
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
        image: red_button,
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
    background: mousehole_bg,
    backgroundWidth: 1400,
    backgroundHeight: 800,
    items: [
      {
        image: back_arrow,
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

          Player.maximizePlayer();
        },
        zIndex: 10,
      },
      {
        image: postit_16,
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
      {
        animation: {
          frames: [mouse_frame01, mouse_frame02],
          animationSpeed: 0.02,
          loop: true,
          interval: 3000, //ms
        },
        visible: true,
        type: ITEM_TYPES.item,
        name: "Sleeping mouse",
        location: {
          x: 0.55,
          y: 0.702,
        },
        width: 203 * 0.8,
        height: 233 * 0.8,
        collisionHeight: 0, // not yet used
        onInteraction: (app, item) => () => {
          openPopup(app, "Nukkuupa hiiri sikeästi...");
        },
        zIndex: 10,
      },
      {
        animation: {
          frames: [hanging_cheese_frame01, hanging_cheese_frame02],
          animationSpeed: 0.02,
          loop: true,
          interval: 3000, //ms
        },
        visible: true,
        type: ITEM_TYPES.item,
        name: "Hanging cheese",
        location: {
          x: 0.375,
          y: 0.57,
        },
        width: 169 * 0.8,
        height: 381 * 0.8,
        collisionHeight: 0, // not yet used
        onInteraction: (app, item) => () => {
          openPopup(
            app,
            "Miksiköhän juusto roikkuu katosta? Muistuttaa tekoälyllä tehtyjen grafiikkojen sekoiluja..."
          );
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
        image: back_arrow,
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
        image: coffee_cup_empty,
        visible: true,
        onStateChange: (app, item) => {
          if (
            gameState.coffeeBrewed &&
            gameState.inventory.itemExists("Coffee cup")
          ) {
            const cup = gameState.inventory.getItem("Coffee cup");
            // If coffee is brewed, change the texture to full coffee cup
            gameState.inventory.updateItemSprite(cup, coffee_cup_full);
          }
        },
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
        // draggable: true,
        // dragTargetName: "Coffee maker",
        // onDragSuccess: (app, item) => {
        //   if (gameState.inventory.itemExists("Coffee")) {
        //     openPopup(app, "Santsikuppia, kiitos!");
        //   } else {
        //     openPopup(app, "Kuppi löytyy, mutta kaffea tarvis!.", null);
        //   }
        // },
      },
    ],
  },
  arcadeScene: {
    background: arcade_scene_bg,
    backgroundWidth: 1400,
    backgroundHeight: 800,
    items: [
      {
        image: back_arrow,
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
