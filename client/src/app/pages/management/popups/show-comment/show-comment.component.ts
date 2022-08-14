import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleComment } from 'src/app/models/article-comment';

@Component({
  selector: 'app-show-comment',
  templateUrl: './show-comment.component.html',
  styleUrls: ['./show-comment.component.scss']
})
export class ShowCommentComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ShowCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ArticleComment) { }

  ngOnInit(): void {
  }

}
