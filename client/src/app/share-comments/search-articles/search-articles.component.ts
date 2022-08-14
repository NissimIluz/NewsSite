import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-search-articles',
  templateUrl: './search-articles.component.html',
  styleUrls: ['./search-articles.component.scss']
})
export class SearchArticlesComponent implements OnInit {

  @Input() articles:Article[];

  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  filteredArticles:Article[];
  searchControl: FormControl = new FormControl();
  constructor() { }

  ngOnInit(): void {
    this.filteredArticles = this.articles;
    this.searchControl.valueChanges.subscribe(() => this.filter());
  }

  filter() {
    var searchPhrase = this.searchControl.value;
    debugger
    if (searchPhrase) {
      this.filteredArticles = this.articles.filter(article => 
        article.title.includes(searchPhrase) || 
        article.subTitle.includes(searchPhrase) || 
        article.author.includes(searchPhrase) 
        );
      }
    else {
      this.filteredArticles = this.articles;
    }
  }

  search() {
    var searchPhrase = this.searchControl.value;
    this.onSearch.emit(searchPhrase);
  }

}
