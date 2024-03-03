import { Being } from '../../model/being';
import { CalcUtil } from '../../util/calc-util';

export let SLIME_BUILDER = {
  getASlime(level: number): Being {
    let being: Being = new Being();
    being.name = 'Slime';
    being.level = level;
    being.baseVitality = 4;
    being.totalVitality = being.vitality = being.baseVitality * (level + 2);
    being.strength = 1;
    return being;
  },
};
