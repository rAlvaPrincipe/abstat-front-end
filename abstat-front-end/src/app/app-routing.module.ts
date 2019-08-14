import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/home.component';

import {BackendSelectorComponent} from "./backend-selector/backend-selector.component";
import {ConsolidateComponent} from "./consolidate/consolidate.component";
import {BrowseComponent} from "./browse/browse.component";
import {SearchComponent} from "./search/search.component";
import {ManageComponent} from "./manage/manage.component";
import {ApisComponent} from "./apis/apis.component";
import {TriplesExtractorComponent} from "./triples-extractor/triples-extractor.component";


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

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
