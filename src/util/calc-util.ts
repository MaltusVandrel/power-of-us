export class CalcUtil {
  private constructor() {}
  static getAValueBetween(min: number, max: number) {
    return Math.max(min, CalcUtil.getRandom(max));
  }
  static getRandom(value: number) {
    return Math.ceil(Math.random() * value);
  }
  static coinFlip(): number {
    return Math.round(Math.random());
  }
}
