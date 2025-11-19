import { initFederation } from '@angular-architects/native-federation';

initFederation({
  'customerApp': 'http://localhost:4200/remoteEntry.json',
  'ordersApp': 'http://localhost:4200/remoteEntry.json',
  'productsApp': 'http://localhost:4200/remoteEntry.json'
})
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
