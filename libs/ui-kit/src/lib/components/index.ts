import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { TopbarComponent } from './topbar/topbar.component';

export const components = [HomeComponent, NotAuthorizedComponent, LoginComponent, TopbarComponent];

export * from './home/home.component';
export * from './login/login.component';
export * from './not-authorized/not-authorized.component';
export * from './topbar/topbar.component';
