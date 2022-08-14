import { Injectable } from "@angular/core";
import { Article } from "../models/article";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: 'root'
  })
  export class ArticlesService {
    
    constructor(private apiService: ApiService) {}
  
    getAll() {
      return this.apiService.get("news");
    }

    search(searchPhrase: any) {
      return this.apiService.get("news/search?searchPhrase="+searchPhrase);
    }

    getArticle(articleId: string | null) {
      return this.apiService.get("news/getArticleById?articleId="+articleId);
    }

    addArticle(article: Article) {
      return this.apiService.post('news/addArticle', article);
    }
    editArticle(article: Article) {
      return this.apiService.post('news/editArticle', article);
    }   
  }