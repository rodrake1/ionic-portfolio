import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DetalheTarefaPage } from "./detalhe-tarefa.page";

import { IonicModule } from "@ionic/angular";

import { DetalheTarefaPageRoutingModule } from "./detalhe-tarefa-routing.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    DetalheTarefaPageRoutingModule,
  ],
  declarations: [DetalheTarefaPage],
})
export class DetalheTarefaPageModule {}
