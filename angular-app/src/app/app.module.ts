import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { TopbarComponent } from './components/navbar/topbar/topbar.component';
import { SidebarComponent } from './components/navbar/sidebar/sidebar.component';
import { ThreeComponent } from './components/three/three.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { UserComponent } from './user/user.component';
import { TableComponent } from './components/table/table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ServiceProvider } from 'src/providers/service.provider';
import { UserFormComponent } from './user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { EnumMappingService } from '@store/enums/enum_mapping.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopbarComponent,
    SidebarComponent,
    ThreeComponent,
    UserComponent,
    TableComponent,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
    HttpClientModule,
  ],
  providers: [ServiceProvider, EnumMappingService],
  bootstrap: [AppComponent, TopbarComponent],
})
export class AppModule {}
