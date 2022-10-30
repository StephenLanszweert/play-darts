import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './interceptors';

// import { ToastModule } from 'primeng/toast';
// import { MessageService } from 'primeng/api';

import * as fromGuards from './guards';

@NgModule({
  imports: [CommonModule],
  providers: [
    // MessageService,
    ...fromGuards.guards,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
})
export class CoreAuthenticationModule { }
