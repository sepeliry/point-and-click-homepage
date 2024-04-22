import { Application, Texture, AnimatedSprite, Point } from "pixi.js";
import { playerCollides } from "./collisionUtils";

// Interactions
import { checkDistance } from "./interactions/distanceCheckUtils";
import updateAnimatedSpriteTextures from "./interactions/updateAnimatedSpriteTextures";
import openPopup from "./interactions/openPopup";

import { ASPECT_RATIO } from "../constants/constants";
import gameState from "../data/gameState";

// Image imports
import player_idle from "../resources/images/player_images/player_idle0minimalbackground.png";
import player_idle_mini from "../resources/images/player_images/player_idleA1.png";
import player_walk_1 from "../resources/images/player_images/player_walk1.png";
import player_walk_2 from "../resources/images/player_images/player_walk2.png";
import player_walk_3 from "../resources/images/player_images/player_walk3.png";
import player_walk_4 from "../resources/images/player_images/player_walk4.png";
import player_walk_5 from "../resources/images/player_images/player_walk5.png";
import player_walk_6 from "../resources/images/player_images/player_walk6.png";
import player_walk_7 from "../resources/images/player_images/player_walk7.png";
import player_walk_8 from "../resources/images/player_images/player_walk8.png";
import player_walk_9 from "../resources/images/player_images/player_walk9.png";
import player_walk_10 from "../resources/images/player_images/player_walk10.png";
import player_walk_11 from "../resources/images/player_images/player_walk11.png";
import player_walk_12 from "../resources/images/player_images/player_walk12.png";
import player_walk_mini_1 from "../resources/images/player_images/player_walkA1.png";
import player_walk_mini_2 from "../resources/images/player_images/player_walkA2.png";
import player_walk_mini_3 from "../resources/images/player_images/player_walkA3.png";
import player_walk_mini_4 from "../resources/images/player_images/player_walkA4.png";
import player_walk_mini_5 from "../resources/images/player_images/player_walkA5.png";
import player_walk_mini_6 from "../resources/images/player_images/player_walkA6.png";
import player_walk_mini_7 from "../resources/images/player_images/player_walkA7.png";
import player_walk_mini_8 from "../resources/images/player_images/player_walkA8.png";
import player_walk_mini_9 from "../resources/images/player_images/player_walkA9.png";
import player_shrink_1 from "../resources/images/player_images/player_idle0_small.png";
import player_shrink_2 from "../resources/images/player_images/player_idle0_smallest.png";

/**
 * Class for players
 */
class Player {
  /**
   * @constructor - Creates the player object, loads the idle/walk animation frames and adds the player to stage
   * @param {Application} app - Application where the player is added to
   */
  static player = null;
  static app = null;
  constructor(app) {
    // Load player idle and walk animation frames
    Player.playerIdleFrames = [Texture.from(player_idle)];
    Player.playerWalkFrames = [
      Texture.from(player_walk_1),
      Texture.from(player_walk_2),
      Texture.from(player_walk_3),
      Texture.from(player_walk_4),
      Texture.from(player_walk_5),
      Texture.from(player_walk_6),
      Texture.from(player_walk_7),
      Texture.from(player_walk_8),
      Texture.from(player_walk_9),
      Texture.from(player_walk_10),
      Texture.from(player_walk_11),
      Texture.from(player_walk_12),
    ];
    // this.destinationReached = true;
    Player.app = app;
    // Create player sprite with idle animation
    Player.player = new AnimatedSprite(Player.playerIdleFrames);

    Player.player.position.set(1400 / 2, 800 * 0.85);
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
    this.targetPosition = new Point(Player.player.x, Player.player.y);
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

    if (closestObj) {
      // Show player in front of / behind the closest object
      if (Player.player.y > closestObj.sprite.y) {
        Player.player.zIndex = 10;
      } else {
        Player.player.zIndex = 1;
      }
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
    const directionVector = new Point(
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
    const loc = new Point(Player.player.x, Player.player.y);
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
      Texture.from(player_shrink_1),
      Texture.from(player_shrink_2),
      Texture.from(player_idle_mini),
    ];

    Player.player.textures = animationTextures;
    Player.player.loop = false;

    Player.player.onComplete = () => {
      Player.playerIdleFrames = [Texture.from(player_idle_mini)];
      Player.player.textures = Player.playerIdleFrames;
      Player.playerWalkFrames = [
        Texture.from(player_walk_mini_1),
        Texture.from(player_walk_mini_2),
        Texture.from(player_walk_mini_3),
        Texture.from(player_walk_mini_4),
        Texture.from(player_walk_mini_5),
        Texture.from(player_walk_mini_6),
        Texture.from(player_walk_mini_7),
        Texture.from(player_walk_mini_8),
        Texture.from(player_walk_mini_9),
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
      Texture.from(player_idle_mini),
      Texture.from(player_shrink_2),
      Texture.from(player_shrink_1),
    ];

    Player.player.textures = animationTextures;
    Player.player.loop = false;

    Player.player.onComplete = () => {
      Player.playerIdleFrames = [Texture.from(player_idle)];
      Player.player.textures = Player.playerIdleFrames;
      Player.playerWalkFrames = [
        Texture.from(player_walk_1),
        Texture.from(player_walk_2),
        Texture.from(player_walk_3),
        Texture.from(player_walk_4),
        Texture.from(player_walk_5),
        Texture.from(player_walk_6),
        Texture.from(player_walk_7),
        Texture.from(player_walk_8),
        Texture.from(player_walk_9),
        Texture.from(player_walk_10),
        Texture.from(player_walk_11),
        Texture.from(player_walk_12),
      ];
      Player.player.loop = true;
      openPopup(Player.app, "Huh, onneks palasin normaalin kokoiseks!", null);
      Player.player.isTransforming = false;
    };
    Player.player.play();
  }
}

export default Player;
