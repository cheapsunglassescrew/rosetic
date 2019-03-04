/// <reference path="./../Component.ts" />

namespace Components {
  export class Solid extends Component {
    grounded: boolean = false;
    constructor(gameObject: IGameObject) {
      super(gameObject);
    }
  
    update(tic: number): void {
    }

    collide(position = this.gameObject.position, velocity = this.gameObject.velocity, dimensions = this.gameObject.dimensions): void {
      if (velocity.x < 0 && this.leftCollision(position, velocity, dimensions)) {
        
        while (velocity.x < -1 && this.leftCollision(position, velocity, dimensions)) {
          velocity.x += 1;
        }

        var flooredY = Math.floor(position.x + velocity.x);
        var totalY = position.x + velocity.x;

        if (this.leftCollision(position, velocity, dimensions)) {
          var remainderY = (flooredY + 1) - totalY;
          velocity.x += remainderY;
        } else {
          var remainderY = totalY - flooredY;
          velocity.x -= remainderY;
        }

        position.x += velocity.x;
        velocity.x = 0;

      } else if (velocity.x > 0 && this.rightCollision(position, velocity, dimensions)) {

        while (velocity.x >= 1 && this.rightCollision(position, velocity, dimensions)) {
          velocity.x -= 1;
        }

        var flooredY = Math.floor(position.x + velocity.x);
        var totalY = position.x + velocity.x;

        if (this.rightCollision(position, velocity, dimensions)) {
          var remainderY = totalY - flooredY;
          velocity.x -= remainderY;
        } else {
          var remainderY = (flooredY + 1) - totalY;
          velocity.x += remainderY;
        }

        position.x += velocity.x;
        velocity.x = 0;
      }

      this.grounded = false;
      if (velocity.y > 0 && this.bottomCollision(position, velocity, dimensions)) {

        while (velocity.y >= 1 && this.bottomCollision(position, velocity, dimensions)) {
          velocity.y -= 1;
        }

        var flooredY = Math.floor(position.y + velocity.y);
        var totalY = position.y + velocity.y;

        if (this.bottomCollision(position, velocity, dimensions)) {
          var remainderY = totalY - flooredY;
          velocity.y -= remainderY;
        } else {
          var remainderY = (flooredY + 1) - totalY;
          velocity.y += remainderY;
        }

        position.y += velocity.y;
        velocity.y = 0;
        this.grounded = true;

      } else if (velocity.y < 0 && this.topCollision(position, velocity, dimensions)) {

        while (velocity.y < -1 && this.topCollision(position, velocity, dimensions)) {
          velocity.y += 1;
        }

        var flooredY = Math.floor(position.y + velocity.y);
        var totalY = position.y + velocity.y;

        if (this.topCollision(position, velocity, dimensions)) {
          var remainderY = (flooredY + 1) - totalY;
          velocity.y += remainderY;
        } else {
          var remainderY = totalY - flooredY;
          velocity.y -= remainderY;
        }

        position.y += velocity.y;
        velocity.y = 0;
      }
    }

    private withTile(x: number, y: number): boolean {
      let spriteNumber = this.gameObject.game.api.mget(Math.floor((x / 8) + this.gameObject.game.mapOffset.x), Math.floor(((y) / 8) + this.gameObject.game.mapOffset.y));
      const collision = this.gameObject.game.solidTiles.indexOf(spriteNumber) >= 0;
      return collision;
    }

    private leftCollision(position: Vector2, velocity: Vector2, dimensions: Vector2): boolean {
      if (this.withTile(position.x + velocity.x, position.y + velocity.y)
        || this.withTile(position.x + velocity.x, position.y + velocity.y + dimensions.y - 1)) {
        return true;
      }
      return false;
    }
    private rightCollision(position: Vector2, velocity: Vector2, dimensions: Vector2): boolean {
      if (this.withTile(position.x + dimensions.x + velocity.x, position.y + velocity.y)
        || this.withTile(position.x + dimensions.x + velocity.x, position.y + velocity.y + dimensions.y - 1)) {
        return true;
      }
      return false;
    }

    private bottomCollision(position: Vector2, velocity: Vector2, dimensions: Vector2): boolean {
      if (this.withTile(position.x + velocity.x, position.y + dimensions.y + velocity.y)
        || this.withTile(position.x + velocity.x + dimensions.x - 1, position.y + dimensions.y + velocity.y)) {
        return true;
      }
      return false;
    }

    private topCollision(position: Vector2, velocity: Vector2, dimensions: Vector2): boolean {
      if (velocity.y < 0 &&
        (this.withTile(position.x + velocity.x, position.y + velocity.y)
          || this.withTile(position.x + dimensions.x - 1 + velocity.x, position.y + velocity.y))) {
        return true;
      }
      return false;
    }
  }
}