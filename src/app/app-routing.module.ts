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
      import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then(m => m.RegisterPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'team',
    loadChildren: () =>
      import('./team/team.module').then(m => m.TeamPageModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then(m => m.AboutPageModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then(m => m.SearchPageModule),
  },
  {
    path: 'landingpage',
    loadChildren: () =>
      import('./landingpage/landingpage.module').then(m => m.LandingpagePageModule),
  },
  {
    path: 'register-store',
    loadChildren: () =>
      import('./register-store/register-store.module').then(m => m.RegisterStorePageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
