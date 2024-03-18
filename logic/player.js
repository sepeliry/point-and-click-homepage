import * as PIXI from "pixi.js";
import { playerCollides } from "./collisionUtils";
//import playerIdle1 from "../resources/images/player_idle1.png";
import playeridle from "../resources/images/player_idle.png";
//import playerIdle2 from "../resources/images/player_idle2.png";
import playerWalk1 from "../resources/images/player_walk1.png";
import playerWalk2 from "../resources/images/player_walk2.png";
import playerWalk3 from "../resources/images/player_walk3.png";
import playerWalk4 from "../resources/images/player_walk4.png";
import playerWalk5 from "../resources/images/player_walk5.png";
import playerWalk6 from "../resources/images/player_walk6.png";
import playerWalk7 from "../resources/images/player_walk7.png";
/**
 * Class for players
 */
class Player {
  /**
   * @constructor - Creates the player object, loads the idle/walk animation frames and adds the player to stage
   * @param {PIXI.Application} app - Application where the player is added to
   */
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

    // Create walkable area
    this.walkableArea = new PIXI.Graphics();
    this.walkableArea.beginFill(0x00FF00);
    this.walkableArea.drawPolygon([
      315, 560,
      850, 560,
      1200, 800,
      10, 801,
    ]);
    this.walkableArea.endFill();
    // Comment row below to see visualization in beautiful ogre green
    this.walkableArea.visible = false;
    app.gameContainer.addChild(this.walkableArea);

    // Create player sprite with idle animation
    this.player = new PIXI.AnimatedSprite(this.playerIdleFrames);
    this.player.position.set(360, 620);
    this.player.anchor.set(0.5, 1);
    this.player.zIndex = 2;

    this.player.animationSpeed = 0.05;
    this.player.loop = true; // Set the loop property to true
    this.player.play();
    app.gameContainer.addChild(this.player);
    this.targetPosition = new PIXI.Point(this.player.x, this.player.y);
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
    const dx = targetPosition.x - this.player.x;
    const dy = targetPosition.y - this.player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Variables for finding closest object
    let closestObj = null;
    let closestDistance = Infinity;

    // Find the closest object to player
    for (const obj of solidObjects) {
      const objDistance = Math.sqrt((this.player.x - obj.x) ** 2 + (this.player.y - obj.y) ** 2);
      if (objDistance < closestDistance) {
        closestObj = obj;
        closestDistance = objDistance;
      }
    }

    // Show player in front of / behind the closest object
    if (this.player.y > closestObj.y) {
      this.player.zIndex = 2;
    } else {
      this.player.zIndex = 0;
    }

    // Check if the player is moving
    if (distance > 3 && !playerCollides(this.player, solidObjects).collided && this.walkableArea.containsPoint(targetPosition)) {
      // Switch to the walk animation frames
      if (this.player.textures !== this.playerWalkFrames) {
        this.player.textures = this.playerWalkFrames;
        this.player.animationSpeed = 0.11; // Set animation speed for walk animation
        this.player.play();
      }

      // Move the player towards the target position
      const directionX = dx / distance;
      const directionY = dy / distance;
      const speed = 1.6; // Adjust speed if needed
      this.player.x += directionX * speed;
      this.player.y += directionY * speed;

      // Mirror player Sprite according to the direction of movement
      if (directionX < 0) {
        this.player.rotation = Math.PI;
        this.player.scale.y = -1;
      } else {
        this.player.rotation = 0;
        this.player.scale.y = 1;
      }
    } else {
      // Switch to the idle animation frames
      if (this.player.textures !== this.playerIdleFrames) {
        this.player.textures = this.playerIdleFrames;
        this.player.animationSpeed = 0.05; // Set animation speed for idle animation
        this.player.play();
      }
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
    if (this.walkableArea.containsPoint(adjustedPosition)) {
      return adjustedPosition;
    }

    // Calculate the direction vector from the current player position towards the target position
    const directionVector = new PIXI.Point(
      targetPosition.x - this.player.x,
      targetPosition.y - this.player.y
    );

    // Calculate the magnitude of the direction vector
    const magnitude = Math.sqrt(directionVector.x * directionVector.x + directionVector.y * directionVector.y);

    // Check if the magnitude is greater than 0 (to avoid division by zero)
    if (magnitude > 0) {
      // Normalize the direction vector
      directionVector.x /= magnitude;
      directionVector.y /= magnitude;

      // Scale the direction vector to a desired magnitude (e.g., the radius of the walkable area)
      const scaleFactor = 100; // Adjust this value as needed
      adjustedPosition.x = this.player.x + directionVector.x * scaleFactor;
      adjustedPosition.y = this.player.y + directionVector.y * scaleFactor;
    }

    return adjustedPosition;
  }
}

export default Player;
