import * as PIXI from "pixi.js";
import { playerCollides } from "./collisionUtils";
import playeridle from "../resources/images/player_idle.png";
import playerIdleMini from "../resources/images/player_idleA1.png";
import playerWalk1 from "../resources/images/player_walk1.png";
import playerWalk2 from "../resources/images/player_walk2.png";
import playerWalk3 from "../resources/images/player_walk3.png";
import playerWalk4 from "../resources/images/player_walk4.png";
import playerWalk5 from "../resources/images/player_walk5.png";
import playerWalk6 from "../resources/images/player_walk6.png";
import playerWalk7 from "../resources/images/player_walk7.png";
import playerWalkMini1 from "../resources/images/player_walkA1.png";
import playerWalkMini2 from "../resources/images/player_walkA2.png";
import playerWalkMini3 from "../resources/images/player_walkA3.png";
import playerWalkMini4 from "../resources/images/player_walkA4.png";

/**
 * Class for players
 */
class Player {
  /**
   * @constructor - Creates the player object, loads the idle/walk animation frames and adds the player to stage
   * @param {PIXI.Application} app - Application where the player is added to
   */
  static player = null;
  constructor(app) {
    // Load player idle and walk animation frames
    this.playerIdleFrames = [
      PIXI.Texture.from(playeridle),
      // PIXI.Texture.from(playerIdle2),
    ];
    this.playerWalkFrames = [
      PIXI.Texture.from(playerWalk1),
      PIXI.Texture.from(playerWalk2),
      PIXI.Texture.from(playerWalk3),
      PIXI.Texture.from(playerWalk4),
      PIXI.Texture.from(playerWalk5),
      PIXI.Texture.from(playerWalk6),
      PIXI.Texture.from(playerWalk7),
    ];
    this.isMiniSize = false;
    // this.destinationReached = true;
    // Create walkable area
    this.walkableArea = new PIXI.Graphics();
    this.walkableArea.beginFill(0x00ff00);
    this.walkableArea.drawPolygon([335, 560, 950, 560, 1400, 800, 100, 801]);
    this.walkableArea.endFill();
    // Comment row below to see visualization in beautiful ogre green
    this.walkableArea.visible = false;
    app.mainScene.addChild(this.walkableArea);

    // Create player sprite with idle animation
    Player.player = new PIXI.AnimatedSprite(this.playerIdleFrames);
    Player.player.position.set(450, 620);
    Player.player.anchor.set(0.5, 1);
    Player.player.zIndex = 2;

    Player.player.animationSpeed = 0.05;
    Player.player.loop = true; // Set the loop property to true
    Player.player.play();
    app.mainScene.addChild(Player.player);
    this.targetPosition = new PIXI.Point(Player.player.x, Player.player.y);
  }

  move(targetPosition, solidObjects) {
    /**
     * Method to move the player to position
     * @param {number} targetPosition - Coordinate where the player is moved to
     * @param {Object[]} solidObjects - Array of solid objects
     */
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
        (Player.player.x - obj.x) ** 2 + (Player.player.y - obj.y) ** 2
      );
      if (objDistance < closestDistance) {
        closestObj = obj;
        closestDistance = objDistance;
      }
    }

    // Show player in front of / behind the closest object
    if (Player.player.y > closestObj.y) {
      Player.player.zIndex = 2;
    } else {
      Player.player.zIndex = 0;
    }

    // If the point cannot be reached, set to true to stop infinite loop
    if (!this.walkableArea.containsPoint(targetPosition)) {
      // this.destinationReached = true;
      this.setIdle();
      return;
    }
    // Check if the player is moving
    if (
      distance > 3 &&
      !playerCollides(Player.player, solidObjects).collided &&
      this.walkableArea.containsPoint(targetPosition)
    ) {
      // Switch to the walk animation frames
      if (Player.player.textures !== this.playerWalkFrames) {
        Player.player.textures = this.playerWalkFrames;
        Player.player.animationSpeed = 0.11; // Set animation speed for walk animation
        Player.player.play();
      }
      // this.destinationReached = false;
      // Move the player towards the target position
      const directionX = dx / distance;
      const directionY = dy / distance;
      const speed = 1.6; // Adjust speed if needed
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
    if (Player.player.textures !== this.playerIdleFrames) {
      Player.player.textures = this.playerIdleFrames;
      Player.player.animationSpeed = 0.05; // Set animation speed for idle animation
      Player.player.play();
      // this.destinationReached = true;
    }
  }
  minimizePlayer() {
    this.isMiniSize = true;
    this.playerIdleFrames = [PIXI.Texture.from(playerIdleMini)];
    this.playerWalkFrames = [
      PIXI.Texture.from(playerWalkMini1),
      PIXI.Texture.from(playerWalkMini2),
      PIXI.Texture.from(playerWalkMini3),
      PIXI.Texture.from(playerWalkMini4),
    ];
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
    if (this.walkableArea.containsPoint(adjustedPosition)) {
      return adjustedPosition;
    }

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
}

export default Player;
