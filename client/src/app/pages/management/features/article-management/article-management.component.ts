import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommentStatus } from 'src/app/enums/comment-status';
import { Article } from 'src/app/models/article';
import { ArticlesService } from 'src/app/services/articles-service';
import { AddEditArticleComponent } from '../../popups/add-edit-article/add-edit-article.component';

@Component({
  selector: 'app-article-management',
  templateUrl: './article-management.component.html',
  styleUrls: ['./article-management.component.scss']
})
export class ArticleManagementComponent implements OnInit {

  dataSource: MatTableDataSource<Article> = new MatTableDataSource<Article>([]);
  articles:Article[] = [];
  displayedColumns = ['id','title', 'author','createDate','updateDate', 'promotion'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  commentStatus = CommentStatus;
  constructor(private articlesService: ArticlesService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.articlesService.getAll().subscribe(data => {
      this.articles =data;
      this.dataSource = new MatTableDataSource<Article>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.translatePaginator()
  }

  search(searchPhrase:string) {
    this.articlesService.search(searchPhrase).subscribe((data: Article[]) => {
        this.dataSource = new MatTableDataSource<Article>(data);;
    });
  }

  openArticle(article:Article) {
    const dialogRef = this.dialog.open(AddEditArticleComponent, {
      width: '90%',
      height: '95%',
      data: article,
    });
    dialogRef.afterClosed().subscribe((data:Article) => {
      if(data) {
        this.articles[this.articles.findIndex(x=>x._id == data._id)] = data;
        var filteredData = this.dataSource.data;
        filteredData[filteredData.findIndex(x=>x._id == data._id)] = data
        this.dataSource = new MatTableDataSource<Article>(filteredData);
      }
    });
  }

  addArticle() {
    const dialogRef = this.dialog.open(AddEditArticleComponent, {
      width: '90%',
      height: '95%',
      data: null,
    });
    dialogRef.afterClosed().subscribe((data:Article) => {
      if(data) {
        this.articles = [...this.articles, data];
        var filteredData = this.dataSource.data;
        filteredData.push(data);
        this.dataSource = new MatTableDataSource<Article>(filteredData);
      }
    });
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
