import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        m => m.RegisterPageModule
      ),
  },
  {
    path: 'register-store',
    loadChildren: () =>
      import('./pages/register-store/register-store.module').then(
        m => m.RegisterStorePageModule
      ),
  },
  {
    path: 'test-database',
    loadChildren: () =>
      import('./pages/test-database/test-database.module').then(
        m => m.TestDatabasePageModule
      ),
  },
  {
    path: 'marketplace',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/marketplace/marketplace.module').then(
            m => m.MarketplacePageModule
          ),
      },
      {
        path: ':businessId',
        loadChildren: () =>
          import('./pages/business-profile/business-profile.module').then(
            m => m.BusinessProfilePageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
