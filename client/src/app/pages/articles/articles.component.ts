import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticlesService } from 'src/app/services/articles-service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  allArticles: Article[] = [];

  sortArticles = ((a:Article, b:Article) => {
    if (a.promotion == b.promotion) {
      if(a.createDate == b.createDate)  {
        if(a.updateDate == b.updateDate) return 0;
        if(a.updateDate > b.updateDate) return -1;
        return 1;
      }
      if(a.createDate > b.createDate) return -1;
      return 1;
    } 
    if (a.promotion > b.promotion) return -1;
    return 1;
  });

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.articlesService.getAll().subscribe((data: Article[]) => {
      if (data && data.length > 0) {
        this.allArticles = data.sort(this.sortArticles);
        this.articles = this.allArticles;
      }
    });
  }
 
  search(searchPhrase:string) {
    if (searchPhrase) {
      this.articlesService.search(searchPhrase).subscribe((data: Article[]) => {
        if (data && data.length > 0) {
          this.articles = data.sort(this.sortArticles);
        }
        else {
          this.articles = [];
        }
      }
      );
    }
    else {
      this.articles = this.allArticles;
    }
  }
}
