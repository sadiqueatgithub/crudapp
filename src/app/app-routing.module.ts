import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSamplesComponent } from './add-samples/add-samples.component';
import { EditSamplesComponent } from './edit-samples/edit-samples.component';
import { ListSamplesComponent } from './list-samples/list-samples.component';


export const routes: Routes = [
    
    { path: '', component: ListSamplesComponent, pathMatch: 'full' },
    { path: 'add-sample', component: AddSamplesComponent },
    { path: 'edit/:id', component: EditSamplesComponent },

];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    declarations: []
  })

  export class AppRoutingModule { }

