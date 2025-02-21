


import { routes } from './app.routes';


import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PanelModule } from 'primeng/panel';
import { MessageHandler } from '../core/message-handler';
import { BattleContext } from '../core/battle-context';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterOutlet,

    ButtonModule,
    PanelModule,
    ScrollPanelModule,
  ],
  providers: [provideRouter(routes), MessageHandler, BattleContext],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
