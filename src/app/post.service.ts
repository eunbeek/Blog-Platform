import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from './BlogPost';

const perPage = 6;
const temp1 = Number.MAX_SAFE_INTEGER;
@Injectable({
  providedIn: 'root'
})
export class PostService {
  temp : BlogPost;
  constructor(private http: HttpClient) { }

  getPosts(page, tag, category): Observable<BlogPost[]> {
    let params = {
      page: page,
      perPage: perPage.toString()
    }

    if (tag != null) {
      params["tag"] = tag;
    }

    if (category != null) {
      params["category"] = category;
    }

    return this.http.get<BlogPost[]>(`https://lab5web422.herokuapp.com/api/posts`,{ params });
  }

  getPostbyId(id): Observable<BlogPost>{
    return this.http.get<BlogPost>(`https://lab5web422.herokuapp.com/api/posts/${id}`);
  }

  getCategories(): Observable<any>{

    return this.http.get<any>(`https://lab5web422.herokuapp.com/api/categories`);
  }

  getTags(): Observable<string[]>{

    return this.http.get<string[]>(`https://lab5web422.herokuapp.com/api/tags`);
  }

  getAllPosts(): Observable<BlogPost[]>{

    return this.http.get<BlogPost[]>(`https://lab5web422.herokuapp.com/api/posts?page=1&perPage=${temp1}`);
  }

  newPost(data:BlogPost): Observable<any>{
    console.log(data);
    return this.http.post<any>(`https://lab5web422.herokuapp.com/api/posts`,data);
  }

  updatePostById(id:string, data:BlogPost): Observable<any>{
    return this.http.put<any>(`https://lab5web422.herokuapp.com/api/posts/${id}`,data);
  }

  deletePostById(id: string): Observable<any>{
    return this.http.delete<any>(`https://lab5web422.herokuapp.com/api/posts/${id}`);
  }


}
