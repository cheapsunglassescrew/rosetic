abstract class Component {
  readonly gameObject: IGameObject;
  constructor(gameObject: IGameObject) {
    this.gameObject = gameObject;
  }
  update(tic: number): void { }
}