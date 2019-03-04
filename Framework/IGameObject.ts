interface IGameObject {
  position: Vector2;
  dimensions: Vector2;
  velocity: Vector2;
  defaultVelocity: Vector2;
  game: BaseGame;
  readonly components: ComponentManager;
  parent: IGameObject;
  readonly id: string;
  readonly states: {};
  score: number;
  tags: GameObjectTags;
  direction: Vector2;

  destroy(): void;
  onHit(hitter: IGameObject): void;
  update(tic: number): void;
  getGlobalPosition(): Vector2;
  removeChild(child: IGameObject): void;
  addChild(child: IGameObject): void;
  toString(): string;
  hasTags(tags: GameObjectTags): boolean;
  childrenByTag(tags: GameObjectTags): IGameObject[];
  childrenByComponent(componentFlags: ComponentFlags): IGameObject[];
}