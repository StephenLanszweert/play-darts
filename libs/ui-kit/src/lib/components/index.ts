import { ButtonComponent } from './button/button.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { TopbarComponent } from './topbar/topbar.component';

export const components = [HomeComponent, NotAuthorizedComponent, LoginComponent, TopbarComponent, ButtonComponent];

export * from './home/home.component';
export * from './login/login.component';
export * from './not-authorized/not-authorized.component';
export * from './topbar/topbar.component';
export * from './button/button.component';
