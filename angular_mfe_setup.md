# Angular 20 + Native Federation Micro-Frontend Setup

(Host + Multiple Remotes with Bootstrap)

## Step 1: Create Angular Workspace

``` bash
ng new container-mfe --create-application false
cd container-mfe
```

-   `--create-application false` prevents creation of a default Angular app.
-   Workspace will contain multiple micro-frontend projects.

------------------------------------------------------------------------

## Step 2: Generate Applications

``` bash
ng g application host-app
ng g application customer-app
ng g application hr-app
ng g application marketing-app
ng g application orders-app
ng g application products-app
```

-   **host-app** → Main container\
-   Other apps → Remotes

------------------------------------------------------------------------

## Step 3: Install Native Federation

``` bash
npm install @angular-architects/native-federation@latest --save-dev
```

------------------------------------------------------------------------

## Step 4: Initialize Federation

### Host App

``` bash
ng g @angular-architects/native-federation:init --project=host-app --type=host --port=4200
```

### Remote Apps

``` bash
ng g @angular-architects/native-federation:init --project=customer-app --type=remote --port=4301
ng g @angular-architects/native-federation:init --project=orders-app --type=remote --port=4302
ng g @angular-architects/native-federation:init --project=products-app --type=remote --port=4303
ng g @angular-architects/native-federation:init --project=hr-app --type=remote --port=4304
ng g @angular-architects/native-federation:init --project=marketing-app --type=remote --port=4305
```

Each project now gets its own `federation.config.js`.

------------------------------------------------------------------------

## Step 5: Configure Remote (Example: customer-app)

### Folder Structure

    customer-app/
    └─ src/app/
       ├─ customer/
       │  ├─ home/
       │  │   └─ home.ts
       │  ├─ customer-module.ts
       │  └─ customer-routing-module.ts
       ├─ app.routes.ts
    federation.config.js

### Example `federation.config.js`

``` js
const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'customer-app',
  exposes: {
    './CustomerRoutes': './projects/customer-app/src/app/customer/customer-routing-module.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
  features: { ignoreUnusedDeps: true },
});
```

### customer-routing-module.ts

``` ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';

const routes: Routes = [{ path: '', component: Home }];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class CustomerRoutingModule {}
```

### Home Component (Standalone)

``` ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `<h2>Customer Home</h2>`
})
export class HomeComponent {}
```

Repeat similar setup for **orders, hr, marketing, products**.

------------------------------------------------------------------------

## Step 6: Configure Host App

### host-app/src/app/app.routes.ts

``` ts
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
  { path: '', redirectTo: '', pathMatch: 'full' }
];
```

------------------------------------------------------------------------

## Step 7: Start All Applications

``` bash
ng serve customer-app --port 4301
ng serve orders-app --port 4302
ng serve products-app --port 4303
ng serve hr-app --port 4304
ng serve marketing-app --port 4305
ng serve host-app --port 4200
```

------------------------------------------------------------------------

## Step 8: Test

Visit:

### Customer:

    http://localhost:4200/customers

### Orders:

    http://localhost:4200/orders

Same for other remote file
------------------------------------------------------------------------

## 📁 Final Folder Structure (Corrected)

```
CONTAINER-MFE
│
├── dist
├── node_modules
├── projects
│   ├── customer-app
│   │   ├── public
│   │   └── src
│   │       └── app
│   │           ├── customer
│   │           │   └── home
│   │           ├── customer-module.ts
│   │           ├── customer-routing.modules.ts
│   │           ├── app.config.ts
│   │           ├── app.html
│   │           ├── app.routes.ts
│   │           ├── app.ts
│   │           ├── app.scss
│   │           ├── bootstrap.ts
│   │           ├── index.html
│   │           ├── main.ts
│   │           ├── style.scss
│   │           ├── federation.config.js
│   │           ├── tsconfig.app.json
│   │           └── tsconfig.spec.json
│   │
│   ├── host-app
│   │   ├── public
│   │   └── src
│   │       └── app
│   │           ├── app.config.ts
│   │           ├── app.html
│   │           ├── app.routes.ts
│   │           ├── app.ts
│   │           ├── app.scss
│   │           ├── bootstrap.ts
│   │           ├── index.html
│   │           ├── main.ts
│   │           ├── style.scss
│   │           ├── federation.config.js
│   │           ├── tsconfig.app.json
│   │           └── tsconfig.spec.json
│   │
│   ├── hr-app
│   │   ├── public
│   │   └── src
│   │       ├── federation.config.js
│   │       ├── tsconfig.app.json
│   │       └── tsconfig.spec.json
│   │
│   ├── marketing-app
│   │   ├── public
│   │   └── src
│   │       ├── federation.config.js
│   │       ├── tsconfig.app.json
│   │       └── tsconfig.spec.json
│   │
│   ├── orders-app
│   │   ├── public
│   │   └── src
│   │       ├── federation.config.js
│   │       ├── tsconfig.app.json
│   │       └── tsconfig.spec.json
│   │
│   ├── products-app
│   │   ├── public
│   │   └── src
│   │       ├── federation.config.js
│   │       ├── tsconfig.app.json
│   │       └── tsconfig.spec.json
│
├── .editorconfig
├── .gitignore
├── angular.json
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```
------------------------------------------------------------------------

✔ **Your Angular 20 + Native Federation + Bootstrap micro-frontend setup
is complete.**
