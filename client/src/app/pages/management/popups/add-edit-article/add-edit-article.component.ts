import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/models/article';
import { ArticlesService } from 'src/app/services/articles-service';

@Component({
  selector: 'app-add-edit-article',
  templateUrl: './add-edit-article.component.html',
  styleUrls: ['./add-edit-article.component.scss']
})
export class AddEditArticleComponent implements OnInit {
  formGroup: FormGroup;
  isUpdate: boolean;
  inProgress:boolean = false;
  article: Article;

  constructor(private dialogRef: MatDialogRef<AddEditArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Article, private articlesService: ArticlesService, datePipe: DatePipe) {
    this.formGroup = new FormGroup({
      _id: new FormControl({ value: '', disabled: true }, Validators.required),
      title: new FormControl('', Validators.required),
      subTitle: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      createDate: new FormControl({ value: datePipe.transform(new Date(), 'dd/MM/yyyy H:mm'), disabled: true }, Validators.required),
      updateDate: new FormControl({ value: '', disabled: true }, Validators.required),
      content: new FormControl('', Validators.required),
      promotion: new FormControl(1, Validators.required),
    });
    this.isUpdate = data ? true : false;
    if (this.isUpdate) {
      this.articlesService.getArticle(data._id).subscribe((article: Article) => {
        this.article = article;
        this.formGroup = new FormGroup({
          _id: new FormControl({ value: article._id, disabled: true }, Validators.required),
          title: new FormControl(article.title ?? '', Validators.required),
          subTitle: new FormControl(article.subTitle ?? '', Validators.required),
          author: new FormControl(article.author ?? '', Validators.required),
          createDate: new FormControl({ value: datePipe.transform(article.createDate, 'dd/MM/yyyy H:mm'), disabled: true }, Validators.required),
          updateDate: new FormControl({ value: datePipe.transform(new Date(), 'dd/MM/yyyy H:mm'), disabled: true }, Validators.required),
          content: new FormControl(article.content ?? '', Validators.required),
          promotion: new FormControl(article.promotion ?? 1, Validators.required),
        });
      });
    }
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.formGroup.valid) {
      this.inProgress = true;
      var article = this.formGroup.getRawValue();
      if(this.isUpdate) {
        this.articlesService.editArticle(article).subscribe(response => this.afterSubmit(response, article));
      }
      else{
        this.articlesService.addArticle(article).subscribe(response => this.afterSubmit(response, article));
      }
    }
  }

  cancel(){
    this.dialogRef.close(null);
  }
  private afterSubmit(response:any,article:Article) {
    if(response) {
      if(!this.isUpdate){  
        article._id = response;
        article.createDate = new Date();
      }
      else {
        article.createDate = this.article.createDate;
        article.updateDate = new Date();
      }
      this.dialogRef.close(article);
    }
    else {
      this.inProgress = false;
    }
  }
}
