import { Figure } from "../../model/figure";
import { CalcUtil } from '../../util/calc-util';
import { setAttributes } from "./attribute-setter";
import { setGauges } from "./gauge-setter";

export let SLIME_BUILDER = {
  getASlime(level: number): Figure {
    let being: Figure = new Figure();
    being.name = 'Slime';
    being.level = level;
    setGauges(being);
    setAttributes(being);
    return being;
  },
};
