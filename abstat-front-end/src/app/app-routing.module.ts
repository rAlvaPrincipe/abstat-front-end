import {NgModule} from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';

import {HomeComponent} from './home/home.component';

import {BackendSelectorComponent} from "./backend-selector/backend-selector.component";
import {ConsolidateComponent} from "./consolidate/consolidate.component";
import {BrowseComponent} from "./browse/browse.component";
import {SearchComponent} from "./search/search.component";
import {ManageComponent} from "./manage/manage.component";
import {ApisComponent} from "./apis/apis.component";
import {TriplesExtractorComponent} from "./triples-extractor/triples-extractor.component";
import {AdminAuthGuard} from "./guards/admin-auth-guard.service";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./guards/auth-guard.service";
import {environment} from "../environments/environment";

const appRoutes:Routes = (environment.mode == 'public') ?
   [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'browse', component: BrowseComponent},
    { path: 'search', component: SearchComponent},
    { path: 'apis', component: ApisComponent},
    { path: 'extractor', component: TriplesExtractorComponent}
    ]
  :
  (environment.mode == 'full-closed') ?
  [
    {
      path: 'login',
      component: LoginComponent
    },
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'summarize', component: BackendSelectorComponent, canActivate: [AuthGuard]},
    { path: 'consolidate', component: ConsolidateComponent, canActivate: [AuthGuard]},
    { path: 'browse', component: BrowseComponent , canActivate: [AuthGuard]},
    { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
    { path: 'manage', component: ManageComponent, canActivate: [AuthGuard]},
    { path: 'apis', component: ApisComponent},
    { path: 'extractor', component: TriplesExtractorComponent, canActivate: [AuthGuard]}
    ]
  :    // full-open
    [
      { path: '', component: HomeComponent},
      { path: 'home', component: HomeComponent},
      { path: 'summarize', component: BackendSelectorComponent},
      { path: 'consolidate', component: ConsolidateComponent},
      { path: 'browse', component: BrowseComponent},
      { path: 'search', component: SearchComponent},
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
