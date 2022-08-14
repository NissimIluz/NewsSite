import { Injectable } from "@angular/core";
import { ArticleComment } from "../models/article-comment";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: 'root'
  })
  export class CommentsService {

  
    constructor(private apiService: ApiService) {}
  
    get(articleId:string| null = null) {
      return this.apiService.get("comments" + (articleId? "?articleId="+articleId : ""));
    }
    add(comment:ArticleComment) {
        return this.apiService.put("comments/add", comment);
    }
    reportComment(commentId: string) {
        return this.apiService.put("comments/reportComment?commentId=" + commentId, null);
    } 

    edit(comment: ArticleComment | undefined) {
      return this.apiService.post("comments/edit", comment);
    }
  }