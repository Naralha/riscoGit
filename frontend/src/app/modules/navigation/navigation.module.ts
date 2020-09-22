import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { RouterModule } from '@angular/router';
import { NavigationRoutingModule } from './navigation.routing.module';
import { AuthComponent } from '../auth/auth.component';

@NgModule({
  declarations: [NavigationComponent, AuthComponent],
  imports: [CommonModule, RouterModule, NavigationRoutingModule],
  exports: [NavigationComponent],
})
export class NavigationModule {}
