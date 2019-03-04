namespace Tools {
  export function getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  export function getRandom(): number {
    return Math.random();
  }

  export function normalize(value: number): number {
    if (value > 0) {
      return 1;
    } else if (value < 0) {
      return -1;
    } else {
      return 0;
    }
  }

  export function printRight(api: IApi, str: string, x?: number, y?: number, color?: number, fixed?: boolean, scale?: number): number
  {
    let width = api.print(str, 0, -6)
    return api.print(str, (x - width), y, color, fixed, scale);
  }
  export function printCentered(api: IApi, str: string, x?: number, y?: number, color?: number, fixed?: boolean, scale?: number): number {
    let width = api.print(str, 0, -100, color, fixed, scale)
    x = x == undefined ? 240 : x;
    y = y == undefined ? 136 : y;
    return api.print(str, (x - width) / 2, (y) / 2, color, fixed, scale);
  }
  export function unique() {
    return Math.random().toString(36);
  }
}