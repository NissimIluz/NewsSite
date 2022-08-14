import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticlesService } from 'src/app/services/articles-service';

@Component({
  selector: 'app-article-viewer',
  templateUrl: './article-viewer.component.html',
  styleUrls: ['./article-viewer.component.scss']
})
export class ArticleViewerComponent implements OnInit {
  article:Article | null = null;

  constructor(private route: ActivatedRoute, private articlesService: ArticlesService) { 
    this.route.queryParams.subscribe(params => {
        var articleId = params['articleId'];
        this.articlesService.getArticle(articleId).subscribe(data => {
          if(data) this.article = data;
        });
    });
  }

  ngOnInit(): void {
  }

}
