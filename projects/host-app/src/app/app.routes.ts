import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
export const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4301/remoteEntry.json',
        exposedModule: './CustomerRoutes',
      }).then((m) => m.CustomerRoutingModule),
  },
  {
    path: 'orders',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4302/remoteEntry.json',
        exposedModule: './OrdersRoutes',
      }).then((m) => m.OrdersRoutingModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4303/remoteEntry.json',
        exposedModule: './ProductsRoutes',
      }).then((m) => m.ProductsRoutingModule),
  },
  {
    path: 'hr',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4304/remoteEntry.json',
        exposedModule: './HrRoutes',
      }).then((m) => m.HrRoutingModule),
  },
  {
    path: 'marketing',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4305/remoteEntry.json',
        exposedModule: './MarketingRoutes',
      }).then((m) => m.MarketingRoutingModule),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];
