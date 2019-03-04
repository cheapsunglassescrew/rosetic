/// <reference path="./../Component.ts" />
namespace Components {
  export class Actor extends Component {
    hitPoints: number = null;
    scoreValue: number = 5;
    update(tic: number): void {
      if (this.isDead()) {
        this.gameObject.destroy();
      }
    }
    isDead(): boolean {
      if (this.hitPoints == null) {
        return false;
      }
      if (this.hitPoints <= 0) {
        return true;
      }
      return false;
    }
    getFirstObjectCollision(tags: GameObjectTags = GameObjectTags.None): IGameObject {
      for (let actor of this.gameObject.game.root.childrenByComponent(ComponentFlags.Actor)) {
        if (actor.hasTags(tags)
          && actor != this.gameObject
          && actor != this.gameObject.parent) {
          if (BoundingBoxCollider.overlaps(this.gameObject.getGlobalPosition(), Vector2.zero, this.gameObject.dimensions, actor.position, actor.dimensions)) {
            return actor;
          }
        }
      }
      return null;
    }
  }
}