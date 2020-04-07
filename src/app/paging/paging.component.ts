import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  @Input() page: number;
  @Output() newPage = new EventEmitter();

  constructor() { }

  btnLeftClicked(){
    if(this.page > 1)
    {
      this.newPage.emit(this.page-1);
    }
  }

  btnRightClicked(){
    this.newPage.emit(this.page+1);
  }
  ngOnInit(): void {
  }

}
