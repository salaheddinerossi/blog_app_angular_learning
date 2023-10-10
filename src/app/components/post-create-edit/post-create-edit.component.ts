import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../models/Post";
import {ActivatedRoute, Router} from "@angular/router";
import {of, switchMap} from "rxjs";

@Component({
  selector: 'app-post-create-edit',
  templateUrl: './post-create-edit.component.html',
  styleUrls: ['./post-create-edit.component.css']
})
export class PostCreateEditComponent implements OnInit{

  post:Post={
    id:"",
    title:"",
    content:""
  }

  constructor(private postService:PostService,private  route:ActivatedRoute,private router:Router) {
  }


  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        const postId = params['id'];
        if (postId) {
          return this.postService.getOne(postId);
        } else {
          return of(this.post as Post);
        }
      })
    ).subscribe(post => this.post = post);
  }
  onSubmit(){
    if(this.post.id){
      this.postService.update(this.post).subscribe(()=>{
        this.router.navigate(['/'])
      })

    }else{
      this.postService.create(this.post).subscribe(()=>{
        this.router.navigate(['/'])
      })
    }
  }



}
