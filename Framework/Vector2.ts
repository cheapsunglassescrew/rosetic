class Vector2 {
  x: number = 0;
  y: number = 0;

  constructor(x: number, y: number) {
    this.x = x; this.y = y;
  }
  copy(): Vector2 {
    return new Vector2(this.x, this.y);
  }
  add(vector2: Vector2): Vector2 {
    this.x += vector2.x;
    this.y += vector2.y;
    return this;
  }
  static add(v1: Vector2, v2: Vector2): Vector2
  {
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
  }
  equals(vector2: Vector2): boolean{
    return this.x == vector2.x && this.y == vector2.y;
  }
  normal(): Vector2 {
    return new Vector2(Tools.normalize(this.x), Tools.normalize(this.y));
  }

  static get zero(): Vector2
  {
    return new Vector2(0, 0);
  }
  toString(): string {
    return this.x.toFixed(2) + ':' + this.y.toFixed(2);
  }
}