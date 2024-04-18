import * as PIXI from "pixi.js";
import { playerCollides } from "./collisionUtils";
import playeridle from "../resources/images/player_idle0minimalbackground.png";
import playerIdleMini from "../resources/images/player_idleA1.png";
import playerWalk1 from "../resources/images/player_walk1.png";
import playerWalk2 from "../resources/images/player_walk2.png";
import playerWalk3 from "../resources/images/player_walk3.png";
import playerWalk4 from "../resources/images/player_walk4.png";
import playerWalk5 from "../resources/images/player_walk5.png";
import playerWalk6 from "../resources/images/player_walk6.png";
import playerWalk7 from "../resources/images/player_walk7.png";
import playerWalk8 from "../resources/images/player_walk8.png";
import playerWalk9 from "../resources/images/player_walk9.png";
import playerWalk10 from "../resources/images/player_walk10.png";
import playerWalk11 from "../resources/images/player_walk11.png";
import playerWalk12 from "../resources/images/player_walk12.png";
import playerWalkMini1 from "../resources/images/player_walkA1.png";
import playerWalkMini2 from "../resources/images/player_walkA2.png";
import playerWalkMini3 from "../resources/images/player_walkA3.png";
import playerWalkMini4 from "../resources/images/player_walkA4.png";
import playerWalkMini5 from "../resources/images/player_walkA5.png";
import playerWalkMini6 from "../resources/images/player_walkA6.png";
import playerWalkMini7 from "../resources/images/player_walkA7.png";
import playerWalkMini8 from "../resources/images/player_walkA8.png";
import playerWalkMini9 from "../resources/images/player_walkA9.png";
import { checkDistance } from "./interactions/distanceCheckUtils";
import { ASPECT_RATIO } from "../constants/constants";
import playerShrink1 from "../resources/images/player_idle0_small.png";
import playerShrink2 from "../resources/images/player_idle0_smallest.png";
import updateAnimatedSpriteTextures from "./interactions/updateAnimatedSpriteTextures";
import gameState from "../data/gameState";
import openPopup from "./interactions/openPopup";

/**
 * Class for players
 */
class Player {
  /**
   * @constructor - Creates the player object, loads the idle/walk animation frames and adds the player to stage
   * @param {PIXI.Application} app - Application where the player is added to
   */
  static player = null;
  static app = null;
  constructor(app) {
    // Load player idle and walk animation frames
    Player.playerIdleFrames = [PIXI.Texture.from(playeridle)];
    Player.playerWalkFrames = [
      PIXI.Texture.from(playerWalk1),
      PIXI.Texture.from(playerWalk2),
      PIXI.Texture.from(playerWalk3),
      PIXI.Texture.from(playerWalk4),
      PIXI.Texture.from(playerWalk5),
      PIXI.Texture.from(playerWalk6),
      PIXI.Texture.from(playerWalk7),
      PIXI.Texture.from(playerWalk8),
      PIXI.Texture.from(playerWalk9),
      PIXI.Texture.from(playerWalk10),
      PIXI.Texture.from(playerWalk11),
      PIXI.Texture.from(playerWalk12),
    ];
    // this.destinationReached = true;
    Player.app = app;
    // Create player sprite with idle animation
    Player.player = new PIXI.AnimatedSprite(Player.playerIdleFrames);

    console.log(window.innerHeight);
    console.log(screen.height);
    const targetHeight = Math.min(window.innerHeight, screen.height); // Target the full height of the window
    const targetWidth = targetHeight * ASPECT_RATIO;

    Player.player.position.set(targetWidth / 2, targetHeight * 0.85);
    Player.player.anchor.set(0.5, 1);
    Player.player.zIndex = 10;
    // To store a pending onInteraction action and neccesary parameters
    Player.player.pendingAction = null;
    Player.player.checkDistanceParams = null;

    Player.player.eventMode = "none";
    Player.player.animationSpeed = 0.05;
    Player.player.loop = true; // Set the loop property to true
    Player.player.play();
    Player.player.eventMode = "none";
    app.mainScene.addChild(Player.player);
    this.targetPosition = new PIXI.Point(Player.player.x, Player.player.y);
    Player.player.isTransforming = false;
  }

  move(targetPosition, solidObjects) {
    /**
     * Method to move the player to position
     * @param {number} targetPosition - Coordinate where the player is moved to
     * @param {Object[]} solidObjects - Array of solid objects
     */

    // do not move the player while transforming (minimize or maximize animation)
    if (Player.player.isTransforming) {
      return;
    }

    // If position outside walkableArea is clicked, adjust position
    targetPosition = this.adjustTargetPosition(targetPosition);

    // Calculate the distance to the target position
    const dx = targetPosition.x - Player.player.x;
    const dy = targetPosition.y - Player.player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Variables for finding closest object
    let closestObj = null;
    let closestDistance = Infinity;

    // Find the closest object to player
    for (const obj of solidObjects) {
      const objDistance = Math.sqrt(
        (Player.player.x - obj.sprite.x) ** 2 +
          (Player.player.y - obj.sprite.y) ** 2
      );
      if (objDistance < closestDistance) {
        closestObj = obj;
        closestDistance = objDistance;
      }
    }

    // Show player in front of / behind the closest object
    if (Player.player.y > closestObj.sprite.y) {
      Player.player.zIndex = 10;
    } else {
      Player.player.zIndex = 1;
    }

    // Check if the player is moving
    if (distance > 3 && !playerCollides(Player.player, solidObjects).collided) {
      // Switch to the walk animation frames
      if (Player.player.textures !== Player.playerWalkFrames) {
        Player.player.textures = Player.playerWalkFrames;
        if (gameState.playerIsMiniSize) {
          Player.player.animationSpeed = 0.3;
        } else {
          Player.player.animationSpeed = 0.15; // Set animation speed for walk animation
        }
        Player.player.play();
      }
      // Move the player towards the target position
      const directionX = dx / distance;
      const directionY = dy / distance;
      const speed = 4; // Adjust speed if needed
      Player.player.x += directionX * speed;
      Player.player.y += directionY * speed;

      // Mirror player Sprite according to the direction of movement
      if (directionX < 0) {
        Player.player.rotation = Math.PI;
        Player.player.scale.y = -1;
      } else {
        Player.player.rotation = 0;
        Player.player.scale.y = 1;
      }
    } else {
      this.setIdle();
    }
  }

  setIdle() {
    if (Player.player.textures !== Player.playerIdleFrames) {
      Player.player.textures = Player.playerIdleFrames;
      Player.player.animationSpeed = 0.05; // Set animation speed for idle animation

      Player.player.play();
      // Check if an action is pending and perform it
      if (Player.player.pendingAction) {
        console.log("performing pending action");
        checkDistance(
          Player.player.checkDistanceParams.app,
          Player.player.checkDistanceParams.x,
          Player.player.checkDistanceParams.y,
          Player.player.checkDistanceParams.sceneName,
          Player.player.pendingAction
        );
      }
      // this.targetPosition = null;
    }
  }

  adjustTargetPosition(targetPosition) {
    /**
     * Method to move the player to position
     * @param {number} targetPosition - Coordinate where the player is moved to
     * @returns {number} - CLosest position allowed
     */
    // Clone the target position
    let adjustedPosition = targetPosition.clone();

    // Check if the target position is already within the walkable area
    //if (this.walkableArea.containsPoint(adjustedPosition)) {
    //   return adjustedPosition;
    //  }

    // Calculate the direction vector from the current player position towards the target position
    const directionVector = new PIXI.Point(
      targetPosition.x - Player.player.x,
      targetPosition.y - Player.player.y
    );

    // Calculate the magnitude of the direction vector
    const magnitude = Math.sqrt(
      directionVector.x * directionVector.x +
        directionVector.y * directionVector.y
    );

    // Check if the magnitude is greater than 0 (to avoid division by zero)
    if (magnitude > 0) {
      // Normalize the direction vector
      directionVector.x /= magnitude;
      directionVector.y /= magnitude;

      // Scale the direction vector to a desired magnitude (e.g., the radius of the walkable area)
      const scaleFactor = 100; // Adjust this value as needed
      adjustedPosition.x = Player.player.x + directionVector.x * scaleFactor;
      adjustedPosition.y = Player.player.y + directionVector.y * scaleFactor;
    }

    return adjustedPosition;
  }
  static getLocation() {
    const loc = new PIXI.Point(Player.player.x, Player.player.y);
    return loc;
  }
  static minimizePlayer() {
    // check if player is mini size already
    if (gameState.playerIsMiniSize) {
      return;
    }

    Player.player.isTransforming = true;
    gameState.playerIsMiniSize = true;
    const animationTextures = [
      PIXI.Texture.from(playerShrink1),
      PIXI.Texture.from(playerShrink2),
      PIXI.Texture.from(playerIdleMini),
    ];

    Player.player.textures = animationTextures;
    Player.player.loop = false;

    Player.player.onComplete = () => {
      Player.playerIdleFrames = [PIXI.Texture.from(playerIdleMini)];
      Player.player.textures = Player.playerIdleFrames;
      Player.playerWalkFrames = [
        PIXI.Texture.from(playerWalkMini1),
        PIXI.Texture.from(playerWalkMini2),
        PIXI.Texture.from(playerWalkMini3),
        PIXI.Texture.from(playerWalkMini4),
        PIXI.Texture.from(playerWalkMini5),
        PIXI.Texture.from(playerWalkMini6),
        PIXI.Texture.from(playerWalkMini7),
        PIXI.Texture.from(playerWalkMini8),
        PIXI.Texture.from(playerWalkMini9),
      ];
      Player.player.loop = true;
      Player.player.isTransforming = false;
    };
    Player.player.play();
  }

  static maximizePlayer() {
    // check if player is not mini size already
    if (!gameState.playerIsMiniSize) {
      return;
    }

    Player.player.isTransforming = true;
    gameState.playerIsMiniSize = false;
    const animationTextures = [
      PIXI.Texture.from(playerIdleMini),
      PIXI.Texture.from(playerShrink2),
      PIXI.Texture.from(playerShrink1),
    ];

    Player.player.textures = animationTextures;
    Player.player.loop = false;

    Player.player.onComplete = () => {
      Player.playerIdleFrames = [PIXI.Texture.from(playeridle)];
      Player.player.textures = Player.playerIdleFrames;
      Player.playerWalkFrames = [
        PIXI.Texture.from(playerWalk1),
        PIXI.Texture.from(playerWalk2),
        PIXI.Texture.from(playerWalk3),
        PIXI.Texture.from(playerWalk4),
        PIXI.Texture.from(playerWalk5),
        PIXI.Texture.from(playerWalk6),
        PIXI.Texture.from(playerWalk7),
        PIXI.Texture.from(playerWalk8),
        PIXI.Texture.from(playerWalk9),
        PIXI.Texture.from(playerWalk10),
        PIXI.Texture.from(playerWalk11),
        PIXI.Texture.from(playerWalk12),
      ];
      Player.player.loop = true;
      openPopup(Player.app, "Back to normal size", null);
      Player.player.isTransforming = false;
    };
    Player.player.play();
  }
}

export default Player;
