import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Post} from "../models/Post";
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  module:string="posts";
  url:string="http://localhost:3000";

  getUrl(){
    return `${this.url}/${this.module}`;
  }

  getUrlWithId(id:string){
    return `${this.url}/${this.module}/${id}`
  }

  getAll(): Observable<Post[]> {
    return this.http.get(this.getUrl()).pipe(
      map((response: any) => response as Post[])
    );
  }

  getOne(id:string):Observable<Post>{
    return this.http.get(this.getUrlWithId(id)).pipe(
      map((response:any)=>response as Post)
    )
  }

  update(post:Post){
    return this.http.put(this.getUrlWithId(post.id),post)
  }

  delete(id:string){
    return this.http.delete(this.getUrlWithId(id))
  }

  create(post:Post){
    return this.http.post(this.getUrl(),post)
  }








}
