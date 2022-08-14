import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { ManagementComponent } from './management.component';
import { CommentsManagementComponent } from './features/comments-management/comments-management.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ShowCommentComponent } from './popups/show-comment/show-comment.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { ArticleManagementComponent } from './features/article-management/article-management.component';
import { AddEditArticleComponent } from './popups/add-edit-article/add-edit-article.component'
import { SearchArticlesModule } from 'src/app/share-modules/search_articles';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    ManagementComponent,
    CommentsManagementComponent,
    ShowCommentComponent,
    ArticleManagementComponent,
    AddEditArticleComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    SearchArticlesModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    DatePipe
  ]
  
})
export class ManagementModule { }
