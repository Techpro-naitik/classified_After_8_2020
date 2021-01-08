import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';

import { SectionsComponent } from './sections.component';
import { ButtonsSectionComponent } from './buttons-section/buttons-section.component';
import { InputsSectionComponent } from './inputs-section/inputs-section.component';
import { CrsSectionComponent } from './crs-section/crs-section.component';
import { NavigationSectionComponent } from './navigation-section/navigation-section.component';
import { TabsSectionComponent } from './tabs-section/tabs-section.component';
import { AlertsSectionComponent } from './alerts-section/alerts-section.component';
import { TypographySectionComponent } from './typography-section/typography-section.component';
import { AngularSectionComponent } from './angular-section/angular-section.component';
import { NucleoSectionComponent } from './nucleo-section/nucleo-section.component';
import { VersionsSectionComponent } from './versions-section/versions-section.component';
import { NgbdModalComponent } from './modal/modal.component';
import { NgbdModalContent } from './modal/modal.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
// import { AgmCoreModule } from '@agm/core';
import { JwPaginationModule } from 'jw-angular-pagination';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ProfileComponent } from '../profile/profile.component';
import { AvatarModule } from 'ngx-avatar';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { AddPostComponent } from '../add-post/add-post.component';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

export function HttpLoaderFactory(http: HttpClient) {
  
  console.log(http)

return new TranslateHttpLoader(http,'./assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    SectionsComponent,
    ButtonsSectionComponent,
    InputsSectionComponent,
    CrsSectionComponent,
    NavigationSectionComponent,
    TabsSectionComponent,
    AlertsSectionComponent,
    TypographySectionComponent,
    AngularSectionComponent,
    NucleoSectionComponent,
    VersionsSectionComponent,
    NgbdModalComponent,
    NgbdModalContent,
    ProfileComponent,
    AddPostComponent
  ],
  entryComponents: [NgbdModalContent],
  imports: [
    CommonModule,
    FormsModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    NgbModule,
    NgDynamicBreadcrumbModule,
    RouterModule,
    AvatarModule,
    NouisliderModule,
    NgxUiLoaderModule,
    JwPaginationModule,
    InfiniteScrollModule,
    JwBootstrapSwitchNg2Module,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  ],
  exports:[ SectionsComponent ]
})
export class SectionsModule { }
