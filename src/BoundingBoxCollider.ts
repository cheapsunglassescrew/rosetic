class BoundingBoxCollider {
  static overlaps(position1: Vector2, velocity1: Vector2, dimensions1: Vector2
    , position2: Vector2, dimensions2: Vector2): boolean {
    return (
      position1.x + velocity1.x < position2.x + dimensions2.x
      && position1.x + dimensions1.x + velocity1.x > position2.x
      && position1.y + velocity1.y < position2.y + dimensions2.y
      && position1.y + dimensions1.y + velocity1.y > position2.y
    );
  }
  static overlapsXAxis(position1: Vector2, velocity1: Vector2, dimensions1: Vector2
    , position2: Vector2, dimensions2: Vector2): boolean {
    return (
      position1.x + velocity1.x < position2.x + dimensions2.x
      && position1.x + dimensions1.x + velocity1.x > position2.x
    );
  }
  static overlapsYAxis(position1: Vector2, velocity1: Vector2, dimensions1: Vector2
    , position2: Vector2, dimensions2: Vector2): boolean {
    return (
      position1.y + velocity1.y < position2.y + dimensions2.y
      && position1.y + dimensions1.y + velocity1.y > position2.y
    );
  }
}