import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { BookFormComponent } from './pages/book-form/book-form.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'create', component: BookFormComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: BookFormComponent, canActivate: [AuthGuard] },
  { path: ':id', component: BookDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
