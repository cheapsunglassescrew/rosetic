abstract class BaseGame {
  readonly api: IApi;
  readonly root: RootGameObject;
  private _gameObjectCollections: { [id: string]: IGameObject[] };
  private currentLevel: Level;
  hiScore: number = 0;
  mapOffset: Vector2;
  gravity: number = 0;
  tic: number = 0;
  player: Player;
  readonly solidTiles: number[];

  performanceMonitor: PerformanceMonitor;


  constructor(api: IApi) {
    this.api = api;
    this.root = new RootGameObject(this, "_root", ComponentFlags.Visible);

    //this.performanceMonitor = new PerformanceMonitor(this);
  }

  setCurrentLevel(level: Level): void {
    level.init();
    this.currentLevel = level;
  }

  init(): void { }

  update(tic: number): void {
    this.tic = tic;
    //this.performanceMonitor.frameStartTime = this.api.time();
    this.currentLevel.update(tic);

    //this.performanceMonitor.frameEndTime = this.api.time();
    //this.performanceMonitor.draw();
  }

  getGameObjectCollection(collectionId: string): IGameObject[] {
    let collection = this._gameObjectCollections[collectionId];
    if (collection == undefined) {
      collection = [];
      this._gameObjectCollections[collectionId] = collection;
    }
    return collection;
  }

  initializeGameObjectCollections(): void {
    this._gameObjectCollections = {};
  }

}
//test