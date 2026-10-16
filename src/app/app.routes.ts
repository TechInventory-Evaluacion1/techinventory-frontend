import { Routes } from '@angular/router';
import { MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';
import { CatalogoComponent } from './components/catalogo/catalogo';
import { GestionInventarioComponent } from './components/gestion-inventario/gestion-inventario';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogoComponent },
  {
    path: 'gestion-inventario',
    component: GestionInventarioComponent,
    canActivate: [MsalGuard]
  },
  { path: 'auth', component: MsalRedirectComponent },
  { path: '**', redirectTo: 'catalogo' }
];
