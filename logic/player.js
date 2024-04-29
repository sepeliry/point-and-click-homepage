import { Texture, AnimatedSprite, Point, Assets } from "pixi.js";
import { playerCollides } from "./collisionUtils";
import gameState from "../data/gameState";

// Interactions
import { checkDistance } from "./interactions/distanceCheckUtils";
import openPopup from "./interactions/openPopup";

// Image imports
import player_idle from "../resources/images/player_images/player_idle_0.png";
import player_idle_mini from "../resources/images/player_images/player_idle_A1.png";
import player_walk_1 from "../resources/images/player_images/player_walk_1.png";
import player_walk_2 from "../resources/images/player_images/player_walk_2.png";
import player_walk_3 from "../resources/images/player_images/player_walk_3.png";
import player_walk_4 from "../resources/images/player_images/player_walk_4.png";
import player_walk_5 from "../resources/images/player_images/player_walk_5.png";
import player_walk_6 from "../resources/images/player_images/player_walk_6.png";
import player_walk_7 from "../resources/images/player_images/player_walk_7.png";
import player_walk_8 from "../resources/images/player_images/player_walk_8.png";
import player_walk_9 from "../resources/images/player_images/player_walk_9.png";
import player_walk_10 from "../resources/images/player_images/player_walk_10.png";
import player_walk_11 from "../resources/images/player_images/player_walk_11.png";
import player_walk_12 from "../resources/images/player_images/player_walk_12.png";
import player_walk_mini_1 from "../resources/images/player_images/player_walk_mini_1.png";
import player_walk_mini_2 from "../resources/images/player_images/player_walk_mini_2.png";
import player_walk_mini_3 from "../resources/images/player_images/player_walk_mini_3.png";
import player_walk_mini_4 from "../resources/images/player_images/player_walk_mini_4.png";
import player_walk_mini_5 from "../resources/images/player_images/player_walk_mini_5.png";
import player_walk_mini_6 from "../resources/images/player_images/player_walk_mini_6.png";
import player_walk_mini_7 from "../resources/images/player_images/player_walk_mini_7.png";
import player_walk_mini_8 from "../resources/images/player_images/player_walk_mini_8.png";
import player_walk_mini_9 from "../resources/images/player_images/player_walk_mini_9.png";
import player_shrink_1 from "../resources/images/player_images/player_idle_0_small.png";
import player_shrink_2 from "../resources/images/player_images/player_idle_0_smallest.png";

/**
 * Class for players
 */
class Player {
  static player = null;
  static app = null;

  static async initialize(app) {
    Player.app = app;

    // Define frame assets
    const playerIdleFrames = [player_idle];
    const playerWalkFrames = [
      player_walk_1,
      player_walk_2,
      player_walk_3,
      player_walk_4,
      player_walk_5,
      player_walk_6,
      player_walk_7,
      player_walk_8,
      player_walk_9,
      player_walk_10,
      player_walk_11,
      player_walk_12,
    ];

    const playerMiniWalkFrames = [
      player_walk_mini_1,
      player_walk_mini_2,
      player_walk_mini_3,
      player_walk_mini_4,
      player_walk_mini_5,
      player_walk_mini_6,
      player_walk_mini_7,
      player_walk_mini_8,
      player_walk_mini_9,
    ];

    const shrinkingAnimationFrames = [
      player_shrink_1,
      player_shrink_2,
      player_idle_mini,
    ];

    const growingAnimationFrames = [
      player_idle_mini,
      player_shrink_2,
      player_shrink_1,
    ];

    // Load all frames
    await Assets.load([
      ...playerIdleFrames,
      ...playerWalkFrames,
      ...shrinkingAnimationFrames,
      ...playerMiniWalkFrames,
      ...growingAnimationFrames,
    ]);

    // Create textures from the loaded assets
    Player.playerIdleFrames = playerIdleFrames.map((frame) =>
      Texture.from(frame)
    );
    Player.playerNormalWalkFrames = playerWalkFrames.map((frame) =>
      Texture.from(frame)
    );

    Player.shrinkingAnimationFrames = shrinkingAnimationFrames.map((frame) =>
      Texture.from(frame)
    );

    Player.growingAnimationFrames = growingAnimationFrames.map((frame) =>
      Texture.from(frame)
    );

    Player.playerMiniWalkFrames = playerMiniWalkFrames.map((frame) =>
      Texture.from(frame)
    );

    // set default walk frames for normal size
    Player.playerWalkFrames = Player.playerNormalWalkFrames;

    // Create the player sprite with idle animation
    Player.player = new AnimatedSprite(Player.playerIdleFrames);
    Player.player.position.set(1400 / 2, 800 * 0.85);
    Player.player.anchor.set(0.5, 1);
    Player.player.zIndex = 10;
    Player.player.animationSpeed = 0.05;
    Player.player.loop = true;
    Player.player.play();
    Player.player.eventMode = "none";
    app.mainScene.addChild(Player.player);
    Player.player.isTransforming = false;

    Player.player.targetPosition = new Point(Player.player.x, Player.player.y);
  }

  static move(targetPosition, solidObjects) {
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

  static setIdle() {
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
    }
  }

  static adjustTargetPosition(targetPosition) {
    /**
     * Method to move the player to position
     * @param {number} targetPosition - Coordinate where the player is moved to
     * @returns {number} - CLosest position allowed
     */
    // Clone the target position
    let adjustedPosition = targetPosition.clone();

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

    Player.player.textures = Player.shrinkingAnimationFrames;
    Player.player.loop = false;

    Player.player.onComplete = () => {
      Player.playerIdleFrames = [Texture.from(player_idle_mini)];
      Player.player.textures = Player.playerIdleFrames;
      Player.playerWalkFrames = Player.playerMiniWalkFrames;
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

    Player.player.textures = Player.growingAnimationFrames;
    Player.player.loop = false;

    Player.player.onComplete = () => {
      Player.playerIdleFrames = [Texture.from(player_idle)];
      Player.player.textures = Player.playerIdleFrames;
      Player.playerWalkFrames = Player.playerNormalWalkFrames;
      Player.player.loop = true;
      openPopup(Player.app, "Huh, onneks palasin normaalin kokoiseks!", null);
      Player.player.isTransforming = false;
    };
    Player.player.play();
  }
}

export default Player;