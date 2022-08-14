import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ArticleViewerRoutingModule } from './article-viewer-routing.module';
import { ArticleViewerComponent } from './article-viewer.component';
import { CommentsComponent } from './features/comments/comments.component';
import { BasicShareModule } from 'src/app/share-modules/basic';
import { AddCommentComponent } from './features/add-comment/add-comment.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ShareButtonsConfig, ShareModule } from 'ngx-sharebuttons';


const customConfig: ShareButtonsConfig = {
  include: ['facebook', 'twitter', 'linkedin', 'reddit', 'whatsapp', 'telegram', 'print', 'email'],
  theme: 'circles-dark',
  autoSetMeta: true,
  twitterAccount: 'ankitsharma_007'
};
@NgModule({
  declarations: [
    ArticleViewerComponent,
    CommentsComponent,
    AddCommentComponent,   
  ],
  imports: [
    CommonModule,
    ArticleViewerRoutingModule,
    BasicShareModule,
    ShareModule,
    MatFormFieldModule,
    MatExpansionModule,
    ShareIconsModule,
    ShareButtonsModule.withConfig(customConfig),
  ]
})
export class ArticleViewerModule { }
