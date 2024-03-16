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
  /**
   * Method to move the player to position
   * @param {number} targetPosition - Coordinate where the player is moved to
   * @param {Object[]} solidObjects - Array of solid objects
   */
  move(targetPosition, solidObjects) {
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
    if (distance > 3 && !playerCollides(this.player, solidObjects).collided) {
      // Switch to the walk animation frames
      if (this.player.textures !== this.playerWalkFrames) {
        this.player.textures = this.playerWalkFrames;
        this.player.animationSpeed = 0.11; // Set animation speed for walk animation
        this.player.play();
      }

      // Move the player towards the target position
      const directionX = dx / distance;
      const directionY = dy / distance;
      const speed = 3; // Adjust speed if needed
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

  minimizePlayer() {
    this.isMiniSize = true;
    this.playerIdleFrames = [
      PIXI.Texture.from(playerIdleMini),
    ];
    this.playerWalkFrames = [
      PIXI.Texture.from(playerWalkMini1),
      PIXI.Texture.from(playerWalkMini2),
      PIXI.Texture.from(playerWalkMini3),
      PIXI.Texture.from(playerWalkMini4),
    ]
  }
}

export default Player;
