import { BattleContext } from '../core/battle-context';
import { CalcUtil } from '../util/calc-util';

export class Being {
  name: string = '';
  level: number = 1;

  //takes usually 2+level monster of same level to level up
  //
  xpForNextLevel: number = 9;
  xp: number = 0;

  baseVitality: number = 1;
  totalVitality: number = 1;
  vitality: number = 1;

  baseMana: number = 1;
  totalMana: number = 1;
  mana: number = 1;

  baseStamina: number = 1;
  totalStamina: number = 1;
  stamina: number = 1;

  strength: number = 1; //how phisically powerful the body is, good for regular damage
  endurace: number = 1; //bodly strenght to reduce and sustain damage, good for defense and stamina
  vigor: number = 1; //how lively the body is, good for vitality and stamina and a little for mana
  agility: number = 1; //how fast someone is, good for attack priority, evasion, finese damage, map movement and stamina
  dexterity: number = 1; //how precise someone are, good for accurracy, finese damage, stamina, and a bit of everything
  senses: number = 1; //how perceptive someone is, good accurracy and evasion
  inteligence: number = 1; // how sharp and knolegeable someone is, good for most spells and mana, raises XP potential
  resolve: number = 1; //mental resilience, good for resisting some spells, good for mana
  charisma: number = 1; //aprocheability and vibes, helps with interactions, good for some spells
  intuition: number = 1; //not exactly supernatural sense, its more gut feeling. good for sensing deception, and gathering unspoke info
  luck: number = 1; // useful in random situations, in the world or critical strikes, and a little good for everything

  magic: number = 1; //base power and mastery of magic, good for magic/spells, good for mana
  magicResitence: number = 1; //resistence to magical attacks and effects
  magicAttunement: number = 1; //familiarity with magic vibes, good for items and entity/god granted spells,  good for mana

  constructor() {}

  getInitiative(): number {
    return this.getSpeed() / 10 + this.level / 4;
  }
  getSpeed(): number {
    return (
      this.agility * 2.5 -
      (this.dexterity + this.senses + this.intuition) -
      CalcUtil.getRandom(this.luck * 10)
    );
  }
  getTurnTime(): number {
    const speedAmount = this.getSpeed();
    return BattleContext.defaultTurnTiming * (1 + speedAmount / 100);
  }
}
