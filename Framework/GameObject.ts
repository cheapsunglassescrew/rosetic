/// <reference path="./RootGameObject.ts" />

abstract class GameObject extends RootGameObject {

  constructor(parent: IGameObject, id: string, componentFlags: number) {
    super(parent.game, id, componentFlags);
    parent.addChild(this);
  }

  onUpdate(tic: number): void { }
  onHit(hitter: IGameObject): void { }
  onDestroy(): void { }

  update(tic: number): void {
    
    this.components.update(tic);
    this.onUpdate(tic);

    if (this.velocity.x > 0) {
      this.direction.x = 1;
    } else if (this.velocity.x < 0) {
      this.direction.x = -1;
    }
    if (this.velocity.y > 0) {
      this.direction.y = 1;
    } else if (this.velocity.y < 0) {
      this.direction.y = -1;
    }

    super.update(tic);
    if (this.components.hasComponent(ComponentFlags.Solid)) {
      this.components.solid.collide();
    }
    this.updatePosition();
  }

  destroy(): void {
    this.parent.removeChild(this);
    this.onDestroy();
  }

  getGlobalPosition(): Vector2 {
    const position = this.position.copy();
    let current: IGameObject = this;
    while (current.parent != null) {
      current = current.parent;
      position.add(current.position)
    }
    return position;
  }

  private updatePosition(): void {
    this.position.add(this.velocity);
  }

  hasTags(tags: GameObjectTags): boolean {
    return (this.tags & tags) === tags;
  }

  toString(): string {
    return this.id;
  }
}