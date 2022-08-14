import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommentStatus } from 'src/app/enums/comment-status';
import { ArticleComment } from 'src/app/models/article-comment';
import { CommentsService } from 'src/app/services/comments-service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges {

  @Input() articleId: string= "";
  @Input() branchDeep: number = 0;
  @Input() fatherId: string| null = null;
  @Input() comments: ArticleComment [] = [];
  @Input() fatherIndex: string| null = null;

  filteredComments: ArticleComment [] = [];
  constructor(private commentsService:CommentsService) { }

  ngOnInit(): void {
    if(!this.fatherId && this.comments.length == 0) {
      this.commentsService.get(this.articleId).subscribe(data => {
        this.comments = data;
        this.filteredComments = this.comments.filter(comment => !comment.commentFatherId);
      }); }
  }
  ngOnChanges(): void {
    if(!this.fatherId){
      this.filteredComments = this.comments.filter(comment => !comment.commentFatherId);
    }
    else {
      this.filteredComments = this.comments.filter(comment => comment.commentFatherId==this.fatherId);
    }
  }
  addComment(form:FormGroup, commentFatherId: string | null =null) {
    const value = form.value;
    var newComment: ArticleComment = {
      articleId: this.articleId,
      title: value.title,
      author: value.author,
      contentText: value.contentText,
      status: CommentStatus.create,
      commentFatherId: commentFatherId,
      createDate: new Date(),
      updateDate: null,
      _id: '',  
      numberOfReported: 0
    }
    this.commentsService.add(newComment).subscribe((response:string) => {
      if(response) {
        newComment._id = response;
        this.comments  = [...this.comments,newComment];
        if(!newComment.commentFatherId) {
          this.filteredComments  = [...this.filteredComments,newComment];
        }
  
        form.reset();
        form.markAsUntouched
        
      }
      else {

      }
    });
  }

  reportComment(commentId:string) {
    this.commentsService.reportComment(commentId).subscribe((response:Boolean) => {
      if(response===true) {
        var commentIndex = this.comments.findIndex(x=> x._id == commentId);
        var filterCommentIndex = this.filteredComments.findIndex(x=> x._id == commentId);
        this.comments.splice(commentIndex,1);
        this.filteredComments.splice(filterCommentIndex,1);
      }
      else {

      }
    });
  }
}
