import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { SearchArticlesComponent } from '../share-comments/search-articles/search-articles.component';
import { BasicShareModule } from './basic';

@NgModule({
  declarations: [
    SearchArticlesComponent
  ],
  imports: [
    MatSelectModule,
    MatAutocompleteModule,
    BasicShareModule,    
  ],
  exports:[
    SearchArticlesComponent,
    
  ]

})
export class SearchArticlesModule { }
