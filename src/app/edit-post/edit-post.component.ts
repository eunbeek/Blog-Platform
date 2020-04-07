import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { NgForm } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  blogPost: BlogPost;
  tags: string;

  constructor(private data: PostService, private router: Router, private route: ActivatedRoute) { }
  

  ngOnInit(): void {
   this.route.params.subscribe(params =>{

      this.data.getPostbyId(params['id']).subscribe(data => {
        this.blogPost = data;
        this.tags = this.blogPost.tags.toString();
      });
      
  });

  
  }
  
  deletePost(): void{
    this.data.deletePostById(this.blogPost._id).subscribe();
    console.log("Delete Success");
    this.router.navigate(['/admin']);
  }

  formSubmit() : void
  {
    this.tags.split(",").map(tag=>tag.trim());
    this.data.updatePostById(this.blogPost._id, this.blogPost).subscribe(data => this.blogPost = data);
    console.log("Update Completed");
    this.router.navigate(['/admin']);
  }
}
