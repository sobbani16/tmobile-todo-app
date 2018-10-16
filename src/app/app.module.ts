import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {TodoStoreService, Todo} from './todo-store.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SortByPriorityPipe } from './sort-by-priority.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SortByPriorityPipe
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule
  ],
  providers: [ TodoStoreService, Todo],
  bootstrap: [AppComponent]
})
export class AppModule { }
