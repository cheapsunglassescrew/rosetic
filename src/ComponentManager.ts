/// <reference path="./Components/Visible.ts" />

class ComponentManager {
  readonly componentFlags: ComponentFlags = 0;
  readonly visible: Components.Visible;
  readonly actor: Components.Actor;
  readonly solid: Components.Solid;

  constructor(gameObject: IGameObject, componentFlags: number = 0) {
    this.componentFlags = componentFlags;
    this.visible = this.hasComponent(ComponentFlags.Visible) ? new Components.Visible(gameObject) : null;
    this.actor = this.hasComponent(ComponentFlags.Actor) ? new Components.Actor(gameObject) : null;
    this.solid = this.hasComponent(ComponentFlags.Solid) ? new Components.Solid(gameObject) : null;
  }

  update(tic: number): void {
    if (this.hasComponent(ComponentFlags.Visible)) { this.visible.update(tic); }
    if (this.hasComponent(ComponentFlags.Solid)) { this.solid.update(tic); }
    if (this.hasComponent(ComponentFlags.Actor)) { this.actor.update(tic); }
  }

  hasComponent(componentFlag: ComponentFlags): boolean {
    return (this.componentFlags & componentFlag) === componentFlag;
  }
}