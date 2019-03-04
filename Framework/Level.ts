abstract class Level {
  readonly game: BaseGame;
  constructor(game: BaseGame) {
    this.game = game;
  }
  init(): void {}
  update(tic: number): void {}
}