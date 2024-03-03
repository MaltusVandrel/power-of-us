import { Injectable } from '@angular/core';
import { Being } from '../model/being';
import { CalcUtil } from '../util/calc-util';
import { Context } from './context';
import { MessageHandler } from './message-handler';
import { first } from 'rxjs';

@Injectable()
export class BattleContext extends Context {
  public static defaultTurnTiming: number = 6000;
  public type: String = 'battle';
  public player: Being = new Being();
  public foe: Being = new Being();
  public elapsedTime: number = 0;
  public choosingAction?: Promise<boolean>;
  public actionList: { actor: Being; time: number }[] = [];

  constructor(private messageHandler: MessageHandler) {
    super();
  }
  public setParticipants(player: Being, foe: Being) {
    this.foe = foe;
    this.player = player;
  }

  private getListOrder(): Being[] {
    let playerInitiative = this.player.getInitiative();
    let foeInitiative = this.foe.getInitiative();
    let percentage60 = 1.6;
    let a: Being;
    let b: Being;
    if (playerInitiative >= foeInitiative * percentage60) {
      a = this.player;
      b = this.foe;
    } else if (foeInitiative >= playerInitiative * percentage60) {
      a = this.foe;
      b = this.player;
    } else {
      if (
        CalcUtil.getRandom(this.player.luck) >=
        CalcUtil.getRandom(this.foe.luck)
      ) {
        a = this.player;
        b = this.foe;
      } else {
        a = this.foe;
        b = this.player;
      }
    }
    return [a, b];
  }
  private buildActionList() {
    let order: Being[] = this.getListOrder();
    let fist = true;

    for (let being of order) {
      let time = being.getTurnTime() / (fist ? 2 : 1);
      fist = false;
      let turns = 0;
      while (turns < 60) {
        this.actionList.push({ actor: being, time: time });
        time += being.getTurnTime();
        turns++;
      }
    }
    this.actionList.sort((a, b) => {
      return a.time >= b.time ? 1 : -1;
    });
  }

  private getTarget(being: Being) {
    if (being == this.player) {
      return this.foe;
    } else {
      return this.player;
    }
  }
  //add atack action in the player turn
  //add atacks
  //add winding up time
  //add post attack recharge time
  public async run() {
    this.buildActionList();

    this.messageHandler.add(
      'A battle between <span class="bold">' +
        this.player.name +
        '(' +
        this.player.totalVitality +
        'hp)' +
        '</span> and <span class="bold">' +
        this.foe.name +
        '(' +
        this.foe.totalVitality +
        'hp) </span> ' +
        ' has begun!'
    );

    while (
      this.actionList.length > 0 &&
      this.foe.vitality > 0 &&
      this.player.vitality > 0
    ) {
      let actionTurn = this.actionList.shift();
      if (actionTurn) {
        if (actionTurn.actor == this.player) {
          await this.waitForAction();
        } else {
          await this.delay(900);
        }
        let msg = this.getAttack(
          actionTurn.actor,
          this.getTarget(actionTurn.actor)
        );
        this.messageHandler.add(msg);
      } else {
        break;
      }
    }
    let being = this.player;
    if (this.foe.vitality > 0) being = this.foe;
    this.messageHandler.add(
      '<span class="bold">' + being.name + '</span> won the battle!'
    );
  }
  private getAttack(a: Being, b: Being): string {
    let attackPower = 3;
    let strengthInfluence = 1 + a.strength / 10;
    let levelDiffInfluence = 1 + (a.level - b.level / 10) / 100;
    let damage =
      attackPower *
      levelDiffInfluence *
      strengthInfluence *
      (CalcUtil.getAValueBetween(80, 120) / 100);
    damage = Math.round(damage);
    b.vitality -= damage;
    return (
      '<span class="bold">' +
      a.name +
      '</span> attacks <span class="bold">' +
      b.name +
      '! (' +
      damage +
      'dmg)</span>'
    );
  }
  private delay(ms: number): Promise<any> {
    return new Promise((res) => setTimeout(res, ms));
  }
  private waitForAction(): Promise<any> {
    this.choosingAction = new Promise<boolean>(function (resolve, reject) {
      window.addEventListener('actionSelected', ((event: CustomEvent) => {
        resolve(true);
      }) as EventListener);
    });

    return this.choosingAction;
  }
  public triggerAction() {
    window.dispatchEvent(new CustomEvent('actionSelected', {}));
  }
}
