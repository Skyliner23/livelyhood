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
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'team',
    loadChildren: () =>
      import('./pages/team/team.module').then(m => m.TeamPageModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then(m => m.AboutPageModule),
  },
  {
    path: 'search',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule),
      },
      {
        path: ':businessId',
        loadChildren: () => import('./pages/business-profile/business-profile.module').then(m => m.BusinessProfilePageModule),
      }
    ],
  },
  {
    path: 'landingpage',
    loadChildren: () =>
      import('./pages/landingpage/landingpage.module').then(
        m => m.LandingpagePageModule
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

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
