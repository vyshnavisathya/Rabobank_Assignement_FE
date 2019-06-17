import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportcsvfileComponent } from './importcsvfile/importcsvfile.component';

const routes: Routes = [
  {path:'' , component: ImportcsvfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
