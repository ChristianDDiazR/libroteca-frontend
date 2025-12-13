import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyListsComponent } from './pages/my-lists/my-lists.component';

const routes: Routes = [
  { path: '', component: MyListsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule { }
