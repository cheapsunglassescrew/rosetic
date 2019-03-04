/// <reference path="./../Component.ts" />
namespace Components {
  export class Visible extends Component {
    color: number = 14;
    defaultColor: number;
    hide: boolean = false;
    draw(): void {
      if (!this.hide) {
        const globalPosition = this.gameObject.getGlobalPosition();
        this.gameObject.game.api.rect(globalPosition.x, globalPosition.y, this.gameObject.dimensions.x, this.gameObject.dimensions.y, this.color);
        // if (this.gameObject.direction.x > 0) {
        //   this.gameObject.game.api.rect(globalPosition.x + this.gameObject.dimensions.x, globalPosition.y, Tools.normalize(this.gameObject.velocity.x), this.gameObject.dimensions.y, 11);
        // } else {
        //   this.gameObject.game.api.rect(globalPosition.x - Tools.normalize(Math.abs(this.gameObject.velocity.x)), globalPosition.y, Tools.normalize(Math.abs(this.gameObject.velocity.x)), this.gameObject.dimensions.y, 11);
        // }

        for (let child of this.gameObject.childrenByComponent(ComponentFlags.Visible)) {
          child.components.visible.draw();
        }
      }
    }
  }
}