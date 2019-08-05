import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { SummarySelectorComponent } from './summary-selector/summary-selector.component';
import { BrowseComponent } from './browse/browse.component';
import { BrowseAutocompleteComponent } from './browse-autocomplete/browse-autocomplete.component';
import { HomeComponent } from './home/home.component';
import { ConsolidateComponent } from './consolidate/consolidate.component';
import { ApisComponent } from './apis/apis.component';
import { ManageComponent } from './manage/manage.component';
import { DatasetontologySelectorComponent } from './datasetontology-selector/datasetontology-selector.component';
import { SearchComponent } from './search/search.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { DatasetontologyUploaderComponent } from './datasetontology-uploader/datasetontology-uploader.component';
import { SummarizeComponent } from './summarize/summarize.component';
import { SummarizeRecapComponent } from './summarize-recap/summarize-recap.component';
import {ConfigService} from './config.service';
import {HttpClientModule} from '@angular/common/http';
import { BackendSelectorComponent } from './backend-selector/backend-selector.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { TriplesExtractorComponent } from './triples-extractor/triples-extractor.component';
import { MatchSelectorComponent } from './match-selector/match-selector.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'summarize', component: BackendSelectorComponent},
  { path: 'consolidate', component: ConsolidateComponent},
  { path: 'browse', component: BrowseComponent },
  { path: 'search', component: SearchComponent },
  { path: 'manage', component: ManageComponent},
  { path: 'apis', component: ApisComponent},
  { path: 'extractor', component: TriplesExtractorComponent}
];

export function initConfig(config: ConfigService) {
  return () => config.getHost();
}

@NgModule({
  declarations: [
    AppComponent,
    SummarySelectorComponent,
    BrowseComponent,
    BrowseAutocompleteComponent,
    HomeComponent,
    ConsolidateComponent,
    ApisComponent,
    ManageComponent,
    DatasetontologySelectorComponent,
    SearchComponent,
    SearchFormComponent,
    DatasetontologyUploaderComponent,
    SummarizeComponent,
    SummarizeRecapComponent,
    BackendSelectorComponent,
    TriplesExtractorComponent,
    MatchSelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    Ng2CompleterModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
