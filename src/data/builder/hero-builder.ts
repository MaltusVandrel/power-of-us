import { Being } from '../../model/being';
import { CalcUtil } from '../../util/calc-util';

export let HERO_BUILDER = {
  getAHero(level: number): Being {
    let being: Being = new Being();
    being.name = 'Hero';
    being.level = level;
    being.baseVitality = 3;
    being.totalVitality = being.vitality = being.baseVitality * (level + 2);
    being.strength = 15;
    return being;
  },
};
