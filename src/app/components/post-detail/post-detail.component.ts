import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {PostService} from "../../services/post.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit{

  constructor(private postService:PostService,private route:ActivatedRoute) {
  }

  post:Post={
    id:"",
    title:"",
    content:""
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(
        params =>{
          const postID:string = params['id'];
          return this.getPost(postID);
        }
      )
    ).subscribe(post => this.post=post)

  }

  getPost(id:string){
    return this.postService.getOne(id)
  }

}
