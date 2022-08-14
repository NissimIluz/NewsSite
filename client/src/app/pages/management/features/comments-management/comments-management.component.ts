import { CommentStatus } from './../../../../enums/comment-status';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArticleComment } from 'src/app/models/article-comment';
import { CommentsService } from 'src/app/services/comments-service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ShowCommentComponent } from '../../popups/show-comment/show-comment.component';

@Component({
  selector: 'app-comments-management',
  templateUrl: './comments-management.component.html',
  styleUrls: ['./comments-management.component.scss']
})
export class CommentsManagementComponent implements OnInit {

  dataSource: MatTableDataSource<ArticleComment> = new MatTableDataSource<ArticleComment>([]);
  displayedColumns = ['id', 'articleId', 'commentFatherId', 'title', 'createDate', 'updateDate', 'author', 'status', 'numberOfReported'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  commentStatus = CommentStatus;
  constructor(private commentsService: CommentsService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.commentsService.get().subscribe(data => {
      this.dataSource = new MatTableDataSource<ArticleComment>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.translatePaginator()
  }
  openComment(comment:ArticleComment) {
    const dialogRef = this.dialog.open(ShowCommentComponent, {
      width: '90%',
      data: comment,
    });
  }
  
  setStatus($event:any) {
    var comment:ArticleComment | null =  this.dataSource.data.find(x => x._id == $event.source.id) ?? null;
    if(comment) {
      this.commentsService.edit(comment).subscribe(data => {
        if(data===true && comment) {
          comment.updateDate = new Date();
        }
      });
    }
  }
  
  private translatePaginator() {
    const paginatorIntl = this.paginator._intl
    paginatorIntl.itemsPerPageLabel = 'מספר פרטים בעמוד';
    paginatorIntl.firstPageLabel = 'העמוד הראשון';
    paginatorIntl.previousPageLabel = 'הבא';
    paginatorIntl.nextPageLabel = 'הקודם';
    paginatorIntl.lastPageLabel = 'העמוד האחרון';
    paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) { return `0 van ${length}`; }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} מתוך ${length}`;
    };
  }
}
