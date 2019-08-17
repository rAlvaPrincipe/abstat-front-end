import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
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
import {HttpClientModule} from '@angular/common/http';
import { BackendSelectorComponent } from './backend-selector/backend-selector.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { TriplesExtractorComponent } from './triples-extractor/triples-extractor.component';
import { MatchSelectorComponent } from './match-selector/match-selector.component';
import {AppRoutingModule} from "./app-routing.module";
import { LoginComponent } from './login/login.component';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {TOKEN_NAME} from "./auth.constant";
import {AuthenticationService} from "./authentication.service";
import {UserService} from "./user.service";
import {AdminAuthGuard} from "./guards/admin-auth-guard.service";
import {ApiService} from "./api.service";
import {AuthGuard} from "./guards/auth-guard.service";
import { TemplateFooterComponent } from './template-footer/template-footer.component';
import { TemplateMenuComponent } from './template-menu/template-menu.component';
import { TemplateHeaderComponent } from './template-header/template-header.component';

export function authHttpServiceFactory(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    tokenName: TOKEN_NAME,
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: false,
    noTokenScheme: true,
    tokenGetter: (() => localStorage.getItem(TOKEN_NAME))
  }), http);
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
    MatchSelectorComponent,
    LoginComponent,
    TemplateFooterComponent,
    TemplateMenuComponent,
    TemplateHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    Ng2CompleterModule,
    AppRoutingModule
  ],
  providers: [
    {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http]},
    AuthenticationService,
    UserService,
    AuthGuard,
    AdminAuthGuard,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
