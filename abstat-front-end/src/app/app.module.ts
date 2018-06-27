import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';


import { AppComponent } from './app.component';
import { SummarySelectorComponent } from './summary-selector/summary-selector.component';
import { BrowseComponent } from './browse/browse.component';
import { BrowseAutocompleteComponent } from './browse-autocomplete/browse-autocomplete.component';


@NgModule({
  declarations: [
    AppComponent,
    SummarySelectorComponent,
    BrowseComponent,
    BrowseAutocompleteComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    TypeaheadModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
