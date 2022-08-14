import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleManagementComponent } from './features/article-management/article-management.component';
import { CommentsManagementComponent } from './features/comments-management/comments-management.component';
import { ManagementComponent } from './management.component';

const routes: Routes = [
  { path: '',  component: ManagementComponent},
  { path: 'commentsManagement',    component: CommentsManagementComponent },
  { path: 'articleManagement',    component: ArticleManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
