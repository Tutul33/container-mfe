
# Angular 20 Micro-Frontend Application  
## Using Native Federation + Bootstrap  
This repository contains a complete working setup of **Angular 20**, **Native Federation**, **Bootstrap**, and multiple **micro-frontend remote apps** loaded into a central **host app**.

---

# 🚀 Overview  
This project demonstrates a fully functional **Micro-Frontend Architecture** using:

- **Angular 20**
- **@angular-architects/native-federation**
- **Multiple Remote Apps**
- **Host Container Application**
- **Bootstrap Integration**
- **Lazy-loaded remote modules**
- **Standalone component support**

---

# 📂 Folder Structure  
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

---

# 🧰 Step-by-Step Setup Guide

## Step 1: Create Workspace  
```
ng new container-mfe --create-application false
cd container-mfe
```

---

## Step 2: Generate Applications  
```
ng g application host-app
ng g application customer-app
ng g application hr-app
ng g application marketing-app
ng g application orders-app
ng g application products-app
```

---

## Step 3: Install Native Federation  
```
npm install @angular-architects/native-federation --save-dev
```

---

## Step 4: Initialize Federation  
### Host  
```
ng g @angular-architects/native-federation:init --project=host-app --type=host --port=4200
```

### Remotes  
```
ng g @angular-architects/native-federation:init --project=customer-app --type=remote --port=4301
ng g @angular-architects/native-federation:init --project=orders-app --type=remote --port=4302
ng g @angular-architects/native-federation:init --project=products-app --type=remote --port=4303
ng g @angular-architects/native-federation:init --project=hr-app --type=remote --port=4304
ng g @angular-architects/native-federation:init --project=marketing-app --type=remote --port=4305
```

---

# 🎯 Remote App Setup Example (customer-app)

### `federation.config.js`
```js
const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'customer-app',
  exposes: {
    './CustomerRoutes': './projects/customer-app/src/app/customer/customer-routing-module.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
  features: { ignoreUnusedDeps: true }
});
```

### `customer-routing-module.ts`
```ts
const routes: Routes = [
  { path: '', component: Home }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class CustomerRoutingModule {}
```

---

# 🏠 Host Routing (host-app/src/app/app.routes.ts)

```ts
{
  path: 'customers',
  loadChildren: () =>
    loadRemoteModule({
      remoteEntry: 'http://localhost:4301/remoteEntry.json',
      exposedModule: './CustomerRoutes',
    }).then((m) => m.CustomerRoutingModule),
},
```

(Similar for orders, hr, marketing, products)

---

# ▶ Running the Apps  
In separate terminals:

```
ng serve customer-app --port 4301
ng serve orders-app --port 4302
ng serve products-app --port 4303
ng serve hr-app --port 4304
ng serve marketing-app --port 4305
ng serve host-app --port 4200
```

---

# 🌐 Test  
Visit:

- **http://localhost:4200/customers**
- **http://localhost:4200/orders**
- **http://localhost:4200/products**
- **http://localhost:4200/hr**
- **http://localhost:4200/marketing**

---

# 🎉 Result  
A fully functional **Angular 20 Micro-Frontend Architecture** using **Native Federation** where the **host-app** loads remote Angular applications dynamically at runtime.

---

# 📬 Contribution  
Feel free to fork and extend with:

- Shared libraries  
- Authentication (Keycloak/JWT)  
- Versioned deployments  
- Runtime federation manifests  

---

# ❤️ Support  
If you want diagrams, Docker setup, CI/CD, or a GitHub-ready version, just ask!
