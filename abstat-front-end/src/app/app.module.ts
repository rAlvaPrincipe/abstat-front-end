import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { RouterModule, Routes } from '@angular/router'


import { AppComponent } from './app.component';
import { SummarySelectorComponent } from './summary-selector/summary-selector.component';
import { BrowseComponent } from './browse/browse.component';
import { BrowseAutocompleteComponent } from './browse-autocomplete/browse-autocomplete.component';
import { HomeComponent } from './home/home.component';
import { ConsolidateComponent } from './consolidate/consolidate.component';

const appRoutes: Routes = [
  { path: 'browse', component: BrowseComponent },
  { path: 'home', component: HomeComponent},
  { path: 'consolidate', component: ConsolidateComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    SummarySelectorComponent,
    BrowseComponent,
    BrowseAutocompleteComponent,
    HomeComponent,
    ConsolidateComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    TypeaheadModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
