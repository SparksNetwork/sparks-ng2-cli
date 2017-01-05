import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import 'hammerjs'; // required for MaterialModule gesture support

import { HomeModule } from './+home';

import { AppComponent } from './app.component';
import { NoContentComponent } from './no-content';

export const routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', loadChildren: './+home/index.module#HomeModule' },
  {path: 'auth', loadChildren: './auth/index.module#AuthModule' },
  {path: '**', component: NoContentComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NoContentComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
