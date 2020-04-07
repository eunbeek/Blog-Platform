import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags: Array<string>;
   

  constructor(private data: PostService) { }

  ngOnInit(): void {

    this.data.getTags().subscribe(data=> this.tags = data);
  }

}
