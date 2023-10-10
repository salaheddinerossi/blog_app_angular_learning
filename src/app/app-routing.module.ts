import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostListComponent} from "./components/post-list/post-list.component";
import {PostDetailComponent} from "./components/post-detail/post-detail.component";
import {PostCreateEditComponent} from "./components/post-create-edit/post-create-edit.component";
import {UserLoginComponent} from "./components/user-login/user-login.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts', component: PostListComponent,canActivate:[AuthGuard] },
  { path: 'post/:id', component: PostDetailComponent ,canActivate: [AuthGuard]},
  { path: 'create', component: PostCreateEditComponent,canActivate: [AuthGuard] },
  { path: 'edit/:id', component: PostCreateEditComponent ,canActivate: [AuthGuard]},
  { path: 'login', component: UserLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
