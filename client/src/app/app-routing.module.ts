import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',   loadChildren: () => import('../app/pages/articles/articles.module').then(m => m.ArticlesModule) },
  { path: 'articleViewer',   loadChildren: () => import('../app/pages/article-viewer/article-viewer.module').then(m => m.ArticleViewerModule) },
  { path: 'management',   loadChildren: () => import('../app/pages/management/management.module').then(m => m.ManagementModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
