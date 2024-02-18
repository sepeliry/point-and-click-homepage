import * as PIXI from 'pixi.js';
import playerIdle1 from "../images/player_idle1.png";
import playerIdle2 from "../images/player_idle2.png";
import playerWalk1 from "../images/player_walk1.png";
import playerWalk2 from "../images/player_walk2.png";
import playerWalk3 from "../images/player_walk3.png";
import playerWalk4 from "../images/player_walk4.png";

class Player {
    constructor(app) {
        // Load player idle and walk animation frames
        this.playerIdleFrames = [
            PIXI.Texture.from(playerIdle1),
            PIXI.Texture.from(playerIdle2),
        ];
        this.playerWalkFrames = [
            PIXI.Texture.from(playerWalk1),
            PIXI.Texture.from(playerWalk2),
            PIXI.Texture.from(playerWalk3),
            PIXI.Texture.from(playerWalk4),
        ];
        // Create player sprite with idle animation
        this.player = new PIXI.AnimatedSprite(this.playerIdleFrames);
        this.player.position.set(200, 625);
        this.player.anchor.set(0.5);
        this.player.animationSpeed = 0.05;
        this.player.loop = true; // Set the loop property to true
        this.player.play();
        app.stage.addChild(this.player);
        this.targetPosition = new PIXI.Point(this.player.x, this.player.y);
    }

    move(targetPosition) {
        // Calculate the distance to the target position
        const dx = targetPosition.x - this.player.x;
        const dy = targetPosition.y - this.player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Check if the player is moving
        if (distance > 3) {
            // Switch to the walk animation frames
            if (this.player.textures !== this.playerWalkFrames) {
                this.player.textures = this.playerWalkFrames;
                this.player.animationSpeed = 0.05; // Set animation speed for walk animation
                this.player.play();
            }

            // Move the player towards the target position
            const directionX = dx / distance;
            const directionY = dy / distance;
            const speed = 2.5; // Adjust speed if needed
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

}

export default Player;
