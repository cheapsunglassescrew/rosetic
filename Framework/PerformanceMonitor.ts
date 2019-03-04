class PerformanceMonitor {
  private game: BaseGame;
  lastTime: number;
  ticTime: number = 16.6666666667;
  frameStartTime: number;
  frameEndTime: number;
  constructor(game: BaseGame) {
    this.game = game;
    this.lastTime = this.game.api.time();
  }
  draw(): void {
    let frameTime = this.frameEndTime - this.frameStartTime;
    let performance = Math.floor((frameTime / this.ticTime * 100)/2);
    this.game.api.rect(235, 10, 5, 50 - performance, 15);
    this.game.api.rect(235, 60 - performance, 5, performance, 6);
  }
}