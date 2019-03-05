/// <reference path="./Vector2.ts" />
/// <reference path="./ComponentManager.ts" />

class RootGameObject implements IGameObject {
  readonly id: string;
  parent: IGameObject;
  private readonly children: IGameObject[] = [];

  readonly states = {};
  readonly components: ComponentManager;
  readonly game: BaseGame;

  position: Vector2 = Vector2.zero;

  dimensions: Vector2 = Vector2.zero;
  velocity: Vector2 = Vector2.zero;
  direction: Vector2 = new Vector2(1, 0);
  defaultVelocity: Vector2 = Vector2.zero;
  score: number = 0;
  tags: GameObjectTags = 0;

  constructor(game: BaseGame, id: string, componentFlags: ComponentFlags) {
    this.game = game;
    this.id = id;
    this.components = new ComponentManager(this, componentFlags);
  }
  onCollision(hitter: IGameObject): void {
    throw new Error("Method not implemented.");
  }
  getGlobalPosition(): Vector2 {
    return this.position;
  }
  removeChild(child: IGameObject): void {
    const childIndex = this.children.indexOf(child);
    this.children.splice(childIndex, 1);
  }
  addChild(child: IGameObject): void {
    child.parent = this;
    child.game = this.game;
    this.children.push(child);
  }

  childrenByTag(tags: GameObjectTags): IGameObject[] {
    const result = [];
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child.hasTags(tags)) {
        result.push(child);
      }
    }
    return result;
  }

  childrenByComponent(componentFlags: ComponentFlags): IGameObject[] {
    const result = [];
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child.components.hasComponent(componentFlags)) {
        result.push(child);
      }
    }
    return result;
  }

  update(tic: number): void {
    for (let child of this.children) {
      child.update(tic);
    }
  }
  draw(): void {
    if (this.components.hasComponent(ComponentFlags.Visible)) {
      this.components.visible.draw();
    }
  }
  destroy(): void {
    throw new Error("Method not implemented.");
  }
  reset(): void {
    this.children.length = 0;
  }
  hasTags(tags: GameObjectTags): boolean {
    return false;
  }
  toString(): string {
    return this.id;
  }
}