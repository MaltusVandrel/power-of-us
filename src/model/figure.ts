import { BattleContext } from '../core/battle-context';
import { ATTRIBUTE_KEYS } from '../data/bank/attribute';
import { CalcUtil } from '../util/calc-util';
import { Attribute } from './attribute';
import { ChildComponent } from './child-component';
import { Gauge } from './gauge';

export class Figure {
  //gauge
  //attributes
  /*
  turn = sum of all participants = cap
  initiative (speed+bullshit +-15%rand) everyone runs against eachother to hit the cap, everytime someones hits cap its their turn.
  */
  name: string = '';
  level: number = 1;
  gauges: Gauge[]=[];
  attributes: Attribute[]=[];
  //takes usually 2+level monster of same level to level up
  //
  xpForNextLevel: number = 9;
  xp: number = 0;

  constructor() {}

  getAttribute(key:string):Attribute{
    let att = this.attributes.find(a=>a.key==key);
    if(!att) throw "Attribute not present."
    return att;
  }
  getGauge(key:string):Gauge{
    let gauge = this.gauges.find(a=>a.key==key);
    if(!gauge) throw "Gauge not present."
    return gauge;
  }
  getInitiative(): number {
    return this.getSpeed() / 10 + this.level / 4;
  }

  getSpeed(): number {
    let agi=this.getAttribute(ATTRIBUTE_KEYS.AGILITY);
    let dex = this.getAttribute(ATTRIBUTE_KEYS.DEXTERITY);
    let prc = this.getAttribute(ATTRIBUTE_KEYS.PERCEPTION);
    let itt = this.getAttribute(ATTRIBUTE_KEYS.INTUITION);
    let luk = this.getAttribute(ATTRIBUTE_KEYS.LUCK);
    return (
      agi.value * 2.5 -
      (dex.value + prc.value + itt.value) -
      CalcUtil.getRandom(luk.value * 10)
    );
  }
  getTurnTime(): number {
    const speedAmount = this.getSpeed();
    return BattleContext.defaultTurnTiming * (1 + speedAmount / 100);
  }
}
