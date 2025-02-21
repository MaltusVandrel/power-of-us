
import { Figure } from '../model/figure';
import { CalcUtil } from '../util/calc-util';
import { HERO_BUILDER } from '../data/builder/hero-builder';
import { SLIME_BUILDER } from '../data/builder/slime-builder';
import { BattleContext } from '../core/battle-context';
import { MessageHandler } from '../core/message-handler';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { GAUGE_KEYS } from '../data/bank/gauge';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'power-of-us';
  messages: SafeHtml[] = [];

  constructor(
    private domSanitizer: DomSanitizer,
    public messageHandler: MessageHandler,
    public battleContext: BattleContext
  ) {}

  ngOnInit(): void {
    let hero = HERO_BUILDER.getAHero(1);
    let slime = SLIME_BUILDER.getASlime(1);

    this.battleContext.setParticipants(hero, slime);
    this.battleContext.run();
  }
  currentStatus(figure:Figure){
    let vitality=figure.getGauge(GAUGE_KEYS.VITALITY);
    return 'Lv.'+figure.level+" "+figure.name+" "+vitality.getCurrent()+"/"+vitality.value;
  }
}
