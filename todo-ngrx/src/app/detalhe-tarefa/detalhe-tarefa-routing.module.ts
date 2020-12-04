import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalheTarefaPage } from './detalhe-tarefa.page';

const routes: Routes = [
  {
    path: '',
    component: DetalheTarefaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalheTarefaPageRoutingModule {}
