import { Component } from '@angular/core';
import { TarefaService, Tarefa } from '../services/tarefa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private tarefaService: TarefaService) {}

  obterTarefas(): Tarefa[] {
    return this.tarefaService.obterTarefas();
  }

}
