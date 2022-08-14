import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  formGroup: FormGroup;

  @Output() addComment: EventEmitter<FormGroup> = new EventEmitter<FormGroup>(); 
  constructor() {
    this.formGroup = new FormGroup({
      title: new FormControl('',[Validators.required, Validators.pattern('^[1-9א-תa-zA-Z .,!@#$%^&*:/\n)(_+-]{2,50}$')]),
      author: new FormControl('',[Validators.required, Validators.pattern('^[1-9א-תa-zA-Z .,!@#$%^&*:\n)(_+-]{2,50}$')]),
      contentText: new FormControl('',[Validators.required, Validators.pattern('^[1-9א-תa-zA-Z .,!@#$%^&*:\n)(_+-]{5,5000}$')])
      });
  }

  ngOnInit(): void {
  }

  add(){
    if(this.formGroup.valid) {
      this.addComment.emit(this.formGroup);
    }
  }

}
