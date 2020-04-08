import { Component, OnInit, OnDestroy  } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { Comment } from '../Comment';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommentStmt } from '@angular/compiler';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit {
  
  post: BlogPost;
  private querySub: any;
  newComment: Comment;
  commentName: string;
  commentText: string;

  constructor(private data: PostService, private route: ActivatedRoute) { }

  submitComment(): void 
  {
    this.newComment = new Comment();
    this.newComment.author = this.commentName;
    this.newComment.comment = this.commentText;
    this.newComment.date = new Date().toLocaleDateString();

    this.post.comments.push(this.newComment);
    this.data.updatePostById(this.post._id, this.post).subscribe(data => {
      this.commentName = data.commentName;
      this.commentText = data.commentText;
      });

  }

  ngOnInit(): void {
    
     this.route.params.subscribe(params =>{

        this.data.getPostbyId(params['id']).subscribe(data => {
          this.post = data;
          this.post.views++;
      });
      
    });

    this.data.updatePostById(this.post._id, this.post).subscribe();
  
  }

  ngOnDestroy(){
    if(this.querySub)
    {
      this.querySub.unsubscribe();
    }
 
  }
}
