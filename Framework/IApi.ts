interface IApi {
  map(x?: number, y?: number, w?: number, h?: number, sx?: number, sy?: number, colorkey?: number, scale?: number, remap?: (tile: number) => void): void;
  rect(x: number, y: number, w: number, h: number, color: number): void;
  cls(color?: number): void;
  btnp(id: number, hold?: number, period?: number): boolean;
  btn(id: number): boolean;
  reset(): void;
  print(str: string, x?: number, y?: number, color?: number, fixed?: boolean, scale?: number): number;
  mget(x: number, y: number): number;
  time(): number;
  key(code: number): boolean;
  trace(msg: any, color?: number): void;
}