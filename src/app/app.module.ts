import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppComponent } from './app.component';
import { StudentState } from './shared/states/students.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddstudentComponent } from './templates/addstudent/addstudent.component';
import { ViewstudentComponent } from './templates/viewstudent/viewstudent.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './organisms/header/header.component';
import { LogoComponent } from './molecules/logo/logo.component';
import { MenuComponent } from './molecules/menu/menu.component';
import { AtomListComponent } from './atoms/atom-list/atom-list.component';
import { AtomLogoIconComponent } from './atoms/atom-logo-icon/atom-logo-icon.component';
import { AtomLogoTextComponent } from './atoms/atom-logo-text/atom-logo-text.component';
import { Task1Component } from './pages/task1/task1.component';
import { Task2Component } from './pages/task2/task2.component';
import { AtomButtonComponent } from './atoms/atom-button/atom-button.component';
import { FormComponent } from './molecules/form/form.component';
import { AtomInputComponent } from './atoms/atom-input/atom-input.component';
import { UsersState } from './shared/states/user.state';
import { AuthService } from './shared/services/auth.service';
import { PostState } from './shared/states/posts.state';
import { CardComponent } from './molecules/card/card.component';
import { AtomTextareaComponent } from './atoms/atom-textarea/atom-textarea.component';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { loaderConfig } from './preloader-config';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    AddstudentComponent,
    ViewstudentComponent,
    HeaderComponent,
    LogoComponent,
    MenuComponent,
    AtomListComponent,
    AtomLogoIconComponent,
    AtomLogoTextComponent,
    Task1Component,
    Task2Component,
    AtomButtonComponent,
    FormComponent,
    AtomInputComponent,
    CardComponent,
    AtomTextareaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([
      StudentState,
      UsersState,
      PostState,
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    NgxUiLoaderModule.forRoot(loaderConfig),
    NgxUiLoaderRouterModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [AuthService, BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
