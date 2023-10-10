import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../models/Post";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{

  constructor(private postService:PostService) {
  }

  posts:Post[]=[]

  ngOnInit() {
    this.getPosts()
    console.log(this.posts)
  }

  getPosts(){
    this.postService.getAll().subscribe(result=>this.posts =result)


  }
  onDelete(id:string){
    this.postService.delete(id).subscribe(result=>this.getPosts())
  }


}
