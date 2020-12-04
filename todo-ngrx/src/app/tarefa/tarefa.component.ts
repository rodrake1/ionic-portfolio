import { Component, Input } from '@angular/core';
import { Tarefa } from '../services/tarefa.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.scss'],
})
export class TarefaComponent {
  @Input() tarefa: Tarefa;
}
