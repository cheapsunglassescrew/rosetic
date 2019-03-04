/// <reference path="./GameObject.ts" />

class SpawnBox extends GameObject {
  lockCounter: number = 0;
  defaultLockCounter: number;
  probability: number;
  maxCount: number;
  count: number = 0;
  startVelocity: Vector2 = Vector2.zero;
  maxRandomStartVelocity: Vector2 = null;
  minRandomStartVelocity: Vector2 = null;
  spawnFunction: (parent: IGameObject, startVelocity: Vector2) => IGameObject;
  
  constructor(parent: IGameObject, id: string, spawnFunction: (parent: IGameObject, startVelocity: Vector2) => IGameObject, maxCount: number, deaultLockCounter: number, probability: number) {
    super(parent, id, ComponentFlags.None);
    this.spawnFunction = spawnFunction;
    this.maxCount = maxCount;
    this.defaultLockCounter = deaultLockCounter;
    this.probability = probability;

    this.dimensions = new Vector2(1, 1);
  }
  onUpdate(tic: number) {
    this.spawn();
  }
  spawn(): void {
    if (this.count >= this.maxCount) {
      return;
    }
    if (this.lockCounter > 0) {
      this.lockCounter--;
      return;
    }
    if (Math.random() < this.probability) {
      let startVelocity = this.startVelocity.copy();
      if (this.maxRandomStartVelocity != null && this.minRandomStartVelocity != null) {
        startVelocity = new Vector2(Tools.getRandomFloat(this.minRandomStartVelocity.x, this.maxRandomStartVelocity.x), Tools.getRandomFloat(this.minRandomStartVelocity.y, this.maxRandomStartVelocity.y));
      }
      let spawn = this.spawnFunction(this.parent, startVelocity);
      let position = this.position.copy();
      if (this.dimensions.x > 1) {
        position.x = Tools.getRandomFloat(this.position.x, this.position.x + this.dimensions.x);
      }
      if (this.dimensions.y > 1) {
        position.y = Tools.getRandomFloat(this.position.y, this.position.y + this.dimensions.y);
      }
      spawn.position = position;
      this.lockCounter = this.defaultLockCounter;
      this.count++;
    }
  }
}