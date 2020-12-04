import { createSelector } from "@ngrx/store";
import { Tarefa } from '../reducers/tarefas.reducers';

export const obterTarefas = (state: { tarefas: Tarefa[] }) => state.tarefas;

export const obterTarefa = createSelector(
  obterTarefas,
  (tarefas: Tarefa[], id: number) => tarefas[id - 1]
);
