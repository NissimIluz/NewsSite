import { NgModule } from '@angular/core';
import { ArticlesRoutingModule } from './articles-routing.module';
import { BasicShareModule } from 'src/app/share-modules/basic';
import { ArticlesComponent } from './articles.component';
import {MatExpansionModule} from '@angular/material/expansion'
import { SearchArticlesModule } from 'src/app/share-modules/search_articles';

@NgModule({
  declarations: [
    ArticlesComponent,
  ],
  imports: [
    ArticlesRoutingModule,
    BasicShareModule,
    MatExpansionModule,
    SearchArticlesModule
  ]
})
export class ArticlesModule { }
