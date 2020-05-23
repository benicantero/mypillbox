import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path:'listM',
    loadChildren:'./listM/list.module#ListMPageModule'
  },
  {
    path: 'createM',
   loadChildren: './createM/create.module#CreateMPageModule' 
  },
  {
    path: 'create',
   loadChildren: './create/create.module#CreatePageModule' 
  },
  { 
    path: 'update/:id', 
    loadChildren: './update/update.module#UpdatePageModule' 
  },
  {
    path: 'updateM/:id', 
    loadChildren: './updateM/update.module#UpdateMPageModule'
  }  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
